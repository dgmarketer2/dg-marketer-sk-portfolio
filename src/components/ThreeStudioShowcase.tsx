import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { Camera, ChevronDown, ChevronUp, RotateCw } from 'lucide-react';
import {
  createMarketingSculpture,
  FinishPresetId,
  SculptureRig,
} from '../three/createMarketingSculpture';
import { Language } from '../types/portfolio';

interface ThreeStudioShowcaseProps {
  language: Language;
  onCaptureFrame?: (dataUrl: string) => void;
}

type CameraPresetId = 'hero' | 'top' | 'profile' | 'closeup';

const CAMERA_PRESETS: Record<
  CameraPresetId,
  { pos: [number, number, number]; target: [number, number, number] }
> = {
  hero: { pos: [4.8, 3.1, 6.2], target: [0, 1.7, 0] },
  top: { pos: [0.2, 7.2, 2.2], target: [0, 1.3, 0] },
  profile: { pos: [6.8, 2.2, 0.4], target: [0, 1.75, 0] },
  closeup: { pos: [2.4, 3.25, 2.7], target: [0, 2.75, 0] },
};

// Module-scope reusable scratch objects (zero GC in animation loop)
const _scratchMatrix = new THREE.Matrix4();
const _scratchPos = new THREE.Vector3();
const _scratchQuat = new THREE.Quaternion();
const _scratchScale = new THREE.Vector3(1, 1, 1);
const _scratchEuler = new THREE.Euler();
const _targetCamPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();

function detectSoftwareWebGL(): boolean {
  try {
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl2');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export function ThreeStudioShowcase({
  language,
  onCaptureFrame,
}: ThreeStudioShowcaseProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  const [finish, setFinish] = useState<FinishPresetId>('midnight');
  const [cameraPreset, setCameraPreset] = useState<CameraPresetId>('hero');
  const [explodeAmount, setExplodeAmount] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [controlsCollapsed, setControlsCollapsed] = useState<boolean>(false);
  const [contextLost, setContextLost] = useState<boolean>(false);

  // Mutable refs consumed inside stable rAF loop without tearing down WebGL
  const finishRef = useRef<FinishPresetId>(finish);
  const explodeTargetRef = useRef<number>(explodeAmount);
  const explodeCurrentRef = useRef<number>(explodeAmount);
  const autoRotateRef = useRef<boolean>(autoRotate);
  const activeCameraTransitionRef = useRef<CameraPresetId | null>(null);
  const rigRef = useRef<SculptureRig | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    finishRef.current = finish;
    rigRef.current?.applyFinish(finish);
  }, [finish]);

  useEffect(() => {
    explodeTargetRef.current = explodeAmount;
  }, [explodeAmount]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }
      if (e.key === 'h' || e.key === 'H') {
        setControlsCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07111f);
    scene.fog = new THREE.FogExp2(0x07111f, 0.045);
    sceneRef.current = scene;

    // Procedural Studio Environment Map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(...CAMERA_PRESETS.hero.pos);
    cameraRef.current = camera;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(...CAMERA_PRESETS.hero.target);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.minDistance = 2.4;
    controls.maxDistance = 14;
    controls.maxPolarAngle = Math.PI * 0.49;
    controls.enablePan = false;
    controls.update();

    const onControlStart = () => {
      activeCameraTransitionRef.current = null;
    };
    controls.addEventListener('start', onControlStart);

    // 3-Point Warm/Cool Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0x7dd3fc, 0x07111f, 0.78);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffe9cf, 2.1);
    keyLight.position.set(5.5, 8.5, 4.5);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    const frustum = 5.5;
    keyLight.shadow.camera.left = -frustum;
    keyLight.shadow.camera.right = frustum;
    keyLight.shadow.camera.top = frustum;
    keyLight.shadow.camera.bottom = -frustum;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x22d3ee, 1.35);
    rimLight.position.set(-5.5, 4.0, -5.0);
    scene.add(rimLight);

    let areaLight: THREE.RectAreaLight | null = null;
    if (!isSoftwareGl) {
      RectAreaLightUniformsLib.init();
      areaLight = new THREE.RectAreaLight(0x3b82f6, 3.2, 4.5, 2.2);
      areaLight.position.set(-3.2, 4.2, 3.2);
      areaLight.lookAt(0, 1.6, 0);
      scene.add(areaLight);
    }

    // Ground Stage Disc flush at y = 0
    const floorGeo = new THREE.CircleGeometry(24, 64);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x081426,
      roughness: 0.88,
      metalness: 0.12,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const rig = createMarketingSculpture(isSoftwareGl, maxAnisotropy);
    rig.applyFinish(finishRef.current);
    scene.add(rig.root);
    rigRef.current = rig;

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
    };
    const onContextRestored = () => {
      setContextLost(false);
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);

    const onResize = () => {
      if (!container) return;
      const nextW = container.clientWidth || window.innerWidth;
      const nextH = container.clientHeight || window.innerHeight;
      camera.aspect = nextW / nextH;
      camera.updateProjectionMatrix();
      renderer.setSize(nextW, nextH);
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', onResize);

    const timer = new THREE.Timer();
    timer.connect(document);
    let frameId = 0;
    let disposed = false;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) {
          if (sync) gl.deleteSync(sync);
          return;
        }
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick(timestamp?: number) {
      if (disposed) return;

      timer.update(timestamp);
      const delta = Math.min(timer.getDelta(), 0.05);
      const elapsed = timer.getElapsed();

      // Smoothly damp exploded view separation
      explodeCurrentRef.current = THREE.MathUtils.damp(
        explodeCurrentRef.current,
        explodeTargetRef.current,
        7.5,
        delta
      );
      const exp = explodeCurrentRef.current;
      rig.layers.collar.position.y = exp * 0.28;
      rig.layers.pillars.position.y = exp * 0.55;
      rig.layers.pylon.position.y = exp * 0.85;
      rig.layers.ribbon.position.y = exp * 1.15;
      rig.layers.gimbal.position.y = 2.92 + exp * 1.45;
      rig.layers.core.position.y = 2.92 + exp * 1.85;

      // Damped camera preset transitions
      const targetPreset = activeCameraTransitionRef.current;
      if (targetPreset) {
        const spec = CAMERA_PRESETS[targetPreset];
        _targetCamPos.set(spec.pos[0], spec.pos[1], spec.pos[2]);
        _targetLookAt.set(spec.target[0], spec.target[1], spec.target[2]);

        const alpha = 1 - Math.exp(-5.5 * delta);
        camera.position.lerp(_targetCamPos, alpha);
        controls.target.lerp(_targetLookAt, alpha);

        if (
          camera.position.distanceTo(_targetCamPos) < 0.03 &&
          controls.target.distanceTo(_targetLookAt) < 0.03
        ) {
          activeCameraTransitionRef.current = null;
        }
      }

      // Gentle motion (respecting reducedMotion)
      if (!reducedMotion) {
        if (autoRotateRef.current && !activeCameraTransitionRef.current) {
          rig.root.rotation.y += delta * 0.22;
        }
        rig.coreCrystal.rotation.y = elapsed * 0.55;
        rig.gimbalRing.rotation.z = Math.sin(elapsed * 0.6) * 0.14;

        // Update InstancedMesh orbital constellation with zero heap allocations
        const count = rig.orbitalNodes.count;
        for (let i = 0; i < count; i++) {
          const angle = rig.orbitalBaseAngles[i] + elapsed * (0.14 + (i % 3) * 0.04);
          const radius = rig.orbitalRadii[i] + exp * 0.45;
          const y = rig.orbitalHeights[i] + Math.sin(elapsed * 1.1 + i) * 0.08 + exp * 0.4;
          _scratchPos.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
          _scratchEuler.set(elapsed * 0.4 + i, elapsed * 0.5, 0);
          _scratchQuat.setFromEuler(_scratchEuler);
          const s = 0.72 + (i % 3) * 0.26;
          _scratchScale.set(s, s, s);
          _scratchMatrix.compose(_scratchPos, _scratchQuat, _scratchScale);
          rig.orbitalNodes.setMatrixAt(i, _scratchMatrix);
        }
        rig.orbitalNodes.instanceMatrix.needsUpdate = true;
      }

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      timer.dispose();
      window.removeEventListener('resize', onResize);
      controls.removeEventListener('start', onControlStart);
      controls.dispose();
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);
      rig.dispose();
      floorGeo.dispose();
      floorMat.dispose();
      envTarget.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      rigRef.current = null;
      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
    };
  }, []);

  const handleSelectCameraPreset = (preset: CameraPresetId) => {
    setCameraPreset(preset);
    activeCameraTransitionRef.current = preset;
  };

  const handleCaptureToStudio = () => {
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    if (!renderer || !scene || !camera || !onCaptureFrame) return;

    renderer.render(scene, camera);
    const dataUrl = renderer.domElement.toDataURL('image/png');
    onCaptureFrame(dataUrl);
  };

  const labels = {
    eyebrow:
      language === 'en'
        ? 'Interactive 3D Brand Architecture'
        : 'ইন্টারেক্টিভ থ্রিডি ব্র্যান্ড শোকেস',
    title:
      language === 'en'
        ? 'Signal & Growth Beacon'
        : 'সিগন্যাল ও গ্রোথ থ্রিডি মডেল',
    subtitle:
      language === 'en'
        ? 'Drag to orbit, scroll to zoom, inspect layered growth pillars, or capture a frame directly into the AI Studio.'
        : 'মাউস দিয়ে ঘুরিয়ে দেখুন, এক্সপ্লোডেড ভিউ পরীক্ষা করুন, অথবা একটি ফ্রেম সরাসরি AI স্টুডিওতে পাঠান।',
    finishLabel: language === 'en' ? 'Finish' : 'ফিনিশ',
    finishes: {
      midnight: language === 'en' ? 'Midnight' : 'মিডনাইট',
      cobalt: language === 'en' ? 'Cobalt' : 'কোবাল্ট',
      champagne: language === 'en' ? 'Brass' : 'ব্রাস',
    },
    cameraLabel: language === 'en' ? 'View' : 'ক্যামেরা',
    cameras: {
      hero: language === 'en' ? 'Hero' : 'হিরো',
      top: language === 'en' ? 'Dial' : 'উপর',
      profile: language === 'en' ? 'Profile' : 'পাশ',
      closeup: language === 'en' ? 'Core' : 'ক্লোজআপ',
    },
    explodeLabel: language === 'en' ? 'Explode' : 'স্তর বিন্যাস',
    orbitLabel: language === 'en' ? 'Orbit' : 'ঘূর্ণন',
    captureLabel: language === 'en' ? 'Send Frame to AI' : 'ফ্রেম পাঠান',
    hideControls: language === 'en' ? 'Hide Controls' : 'কন্ট্রোল লুকান',
    showControls: language === 'en' ? 'Show 3D Controls' : 'থ্রিডি কন্ট্রোল দেখান',
  };

  return (
    <section
      id="studio-3d"
      className="relative h-screen min-h-[680px] w-full overflow-hidden border-b border-[rgba(148,163,184,0.18)] bg-[#07111F]"
    >
      {/* Isolated WebGL Mount Container */}
      <div
        ref={mountRef}
        aria-label={labels.title}
        className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing"
      />

      {contextLost && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#07111F]/90 p-6 text-center">
          <p className="text-sm text-[#A9B8C9]">
            {language === 'en'
              ? '3D WebGL viewport paused while graphics context recovers.'
              : 'গ্রাফিক্স কনটেক্সট পুনরুদ্ধারের জন্য থ্রিডি ভিউপোর্ট সাময়িকভাবে বিরতিতে আছে।'}
          </p>
        </div>
      )}

      {/* Top-Left Minimal Spec Header (No center occlusion, solid rgba surface) */}
      <div className="pointer-events-none absolute left-4 top-5 z-10 max-w-sm sm:left-8 sm:top-7">
        <div
          className="pointer-events-auto rounded-xl border border-[rgba(148,163,184,0.22)] p-4 sm:p-5"
          style={{ backgroundColor: 'rgba(13, 27, 42, 0.88)' }}
        >
          <p className="text-xs font-semibold text-[#22D3EE]">{labels.eyebrow}</p>
          <h2 className="mt-1 font-display text-lg font-bold text-[#F5F8FC] sm:text-xl">
            {labels.title}
          </h2>
          <p className="mt-1.5 text-xs leading-relaxed text-[#A9B8C9]">
            {labels.subtitle}
          </p>
        </div>
      </div>

      {/* Collapsible Compact Floating Bottom Control Dock (<= 15% height, no backdrop-filter) */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 z-30 flex w-[min(920px,94vw)] -translate-x-1/2 flex-col items-center sm:bottom-5">
        <button
          type="button"
          onClick={() => setControlsCollapsed((prev) => !prev)}
          aria-expanded={!controlsCollapsed}
          className="pointer-events-auto mb-1.5 inline-flex min-h-[34px] items-center gap-1.5 rounded-t-lg border border-b-0 border-[rgba(148,163,184,0.24)] px-3.5 py-1 text-xs font-medium text-[#F5F8FC] transition-colors hover:text-[#22D3EE]"
          style={{ backgroundColor: 'rgba(13, 27, 42, 0.94)' }}
        >
          {controlsCollapsed ? (
            <>
              <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{labels.showControls}</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{labels.hideControls}</span>
            </>
          )}
        </button>

        {!controlsCollapsed && (
          <div
            className="pointer-events-auto flex w-full flex-wrap items-center justify-between gap-3 rounded-xl border border-[rgba(148,163,184,0.24)] px-3.5 py-2.5 shadow-xl"
            style={{ backgroundColor: 'rgba(13, 27, 42, 0.94)' }}
          >
            {/* Finish Swatches */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-medium text-[#7C91A7]">
                {labels.finishLabel}
              </span>
              {(['midnight', 'cobalt', 'champagne'] as FinishPresetId[]).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setFinish(preset)}
                  className={`min-h-[32px] rounded-lg px-2.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                    finish === preset
                      ? 'bg-[#3B82F6] text-white'
                      : 'bg-[#102238] text-[#A9B8C9] hover:text-[#F5F8FC]'
                  }`}
                >
                  {labels.finishes[preset]}
                </button>
              ))}
            </div>

            {/* Camera Views */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-medium text-[#7C91A7]">
                {labels.cameraLabel}
              </span>
              {(['hero', 'top', 'profile', 'closeup'] as CameraPresetId[]).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleSelectCameraPreset(preset)}
                  className={`min-h-[32px] rounded-lg px-2.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                    cameraPreset === preset
                      ? 'bg-[#22D3EE] text-[#07111F]'
                      : 'bg-[#102238] text-[#A9B8C9] hover:text-[#F5F8FC]'
                  }`}
                >
                  {labels.cameras[preset]}
                </button>
              ))}
            </div>

            {/* Exploded View Slider */}
            <label className="flex items-center gap-2 text-[11px] font-medium text-[#A9B8C9]">
              <span className="whitespace-nowrap">{labels.explodeLabel}</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.02}
                value={explodeAmount}
                onChange={(e) => setExplodeAmount(Number(e.target.value))}
                className="h-1.5 w-20 cursor-pointer accent-[#22D3EE]"
              />
            </label>

            {/* Orbit & Capture Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAutoRotate((prev) => !prev)}
                aria-pressed={autoRotate}
                className={`inline-flex min-h-[32px] items-center gap-1 rounded-lg px-2.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                  autoRotate
                    ? 'bg-[#142A40] text-[#22D3EE] border border-[#22D3EE]/40'
                    : 'bg-[#102238] text-[#A9B8C9] hover:text-[#F5F8FC]'
                }`}
              >
                <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{labels.orbitLabel}</span>
              </button>

              {onCaptureFrame && (
                <button
                  type="button"
                  onClick={handleCaptureToStudio}
                  className="inline-flex min-h-[32px] items-center gap-1.5 rounded-lg bg-[#3B82F6] px-3 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#2563EB]"
                >
                  <Camera className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{labels.captureLabel}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
