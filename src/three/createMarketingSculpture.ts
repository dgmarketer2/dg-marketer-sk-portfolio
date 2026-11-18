import * as THREE from 'three';
import {
  createBrushedMetalRoughnessTexture,
  createContactShadowTexture,
  createDialRingTexture,
} from './proceduralTextures';

export type FinishPresetId = 'midnight' | 'cobalt' | 'champagne';

export interface SculptureRig {
  root: THREE.Group;
  orbiterGroup: THREE.Group;
  coreCrystal: THREE.Mesh;
  gimbalRing: THREE.Mesh;
  orbitalNodes: THREE.InstancedMesh;
  orbitalBaseAngles: Float32Array;
  orbitalRadii: Float32Array;
  orbitalHeights: Float32Array;
  layers: {
    collar: THREE.Object3D;
    pylon: THREE.Object3D;
    pillars: THREE.Object3D;
    ribbon: THREE.Object3D;
    gimbal: THREE.Object3D;
    core: THREE.Object3D;
  };
  applyFinish: (preset: FinishPresetId) => void;
  dispose: () => void;
}

const FINISH_PALETTES: Record<
  FinishPresetId,
  {
    plinth: number;
    collar: number;
    pylon: number;
    pillars: number;
    ribbon: number;
    core: number;
  }
> = {
  midnight: {
    plinth: 0x0f1d32,
    collar: 0x22d3ee,
    pylon: 0x1e3554,
    pillars: 0x3b82f6,
    ribbon: 0x38bdf8,
    core: 0x67e8f9,
  },
  cobalt: {
    plinth: 0x0b162a,
    collar: 0x60a5fa,
    pylon: 0x1e40af,
    pillars: 0x2563eb,
    ribbon: 0x22d3ee,
    core: 0x93c5fd,
  },
  champagne: {
    plinth: 0x121824,
    collar: 0xd4af37,
    pylon: 0x222938,
    pillars: 0xb5913a,
    ribbon: 0xe6c875,
    core: 0x22d3ee,
  },
};

export function createMarketingSculpture(
  isSoftwareGl: boolean,
  maxAnisotropy: number
): SculptureRig {
  const root = new THREE.Group();
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const textures: THREE.Texture[] = [];

  const metalRoughMap = createBrushedMetalRoughnessTexture(maxAnisotropy);
  const dialTexture = createDialRingTexture(maxAnisotropy);
  const shadowTexture = createContactShadowTexture();
  textures.push(metalRoughMap, dialTexture, shadowTexture);

  // Materials (varied roughness >= 0.25 across adjacent parts)
  const plinthMat = new THREE.MeshStandardMaterial({
    color: FINISH_PALETTES.midnight.plinth,
    roughness: 0.78,
    metalness: 0.18,
  });

  const collarMat = new THREE.MeshPhysicalMaterial({
    color: FINISH_PALETTES.midnight.collar,
    roughness: 0.22,
    metalness: 0.92,
    anisotropy: 0.75,
    roughnessMap: metalRoughMap,
  });

  const pylonMat = new THREE.MeshPhysicalMaterial({
    color: FINISH_PALETTES.midnight.pylon,
    roughness: 0.36,
    metalness: 0.85,
    anisotropy: 0.6,
    roughnessMap: metalRoughMap,
  });

  const pillarsMat = new THREE.MeshStandardMaterial({
    color: FINISH_PALETTES.midnight.pillars,
    roughness: 0.48,
    metalness: 0.55,
  });

  const ribbonMat = new THREE.MeshPhysicalMaterial({
    color: FINISH_PALETTES.midnight.ribbon,
    roughness: 0.16,
    metalness: 0.94,
    clearcoat: 0.85,
    clearcoatRoughness: 0.12,
  });

  const coreMat = new THREE.MeshPhysicalMaterial({
    color: FINISH_PALETTES.midnight.core,
    roughness: 0.06,
    metalness: 0.05,
    transmission: isSoftwareGl ? 0 : 0.9,
    transparent: true,
    opacity: isSoftwareGl ? 0.55 : 1.0,
    ior: 1.76,
    thickness: 1.4,
    attenuationColor: new THREE.Color(0x22d3ee),
    attenuationDistance: 1.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
  });

  const dialMat = new THREE.MeshBasicMaterial({
    map: dialTexture,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });

  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTexture,
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
  });

  const nodeMat = new THREE.MeshStandardMaterial({
    color: 0x22d3ee,
    emissive: 0x0ea5e9,
    emissiveIntensity: 0.55,
    roughness: 0.28,
    metalness: 0.75,
  });

  materials.push(
    plinthMat,
    collarMat,
    pylonMat,
    pillarsMat,
    ribbonMat,
    coreMat,
    dialMat,
    shadowMat,
    nodeMat
  );

  // Soft radial contact shadow flush under plinth
  const shadowGeo = new THREE.PlaneGeometry(7.2, 7.2);
  shadowGeo.rotateX(-Math.PI / 2);
  geometries.push(shadowGeo);
  const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
  shadowPlane.position.y = 0.005;
  root.add(shadowPlane);

  // 1. Primary Silhouette: Stepped Lathe Plinth grounded at y = 0
  const plinthProfile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(2.35, 0.0),
    new THREE.Vector2(2.35, 0.12),
    new THREE.Vector2(2.15, 0.22),
    new THREE.Vector2(1.98, 0.22),
    new THREE.Vector2(1.92, 0.36),
    new THREE.Vector2(0.0, 0.36),
  ];
  const plinthGeo = new THREE.LatheGeometry(plinthProfile, 64);
  geometries.push(plinthGeo);
  const plinthMesh = new THREE.Mesh(plinthGeo, plinthMat);
  plinthMesh.castShadow = true;
  plinthMesh.receiveShadow = true;
  root.add(plinthMesh);

  // Azimuth compass dial ring atop plinth deck
  const dialGeo = new THREE.RingGeometry(0.75, 1.85, 64);
  dialGeo.rotateX(-Math.PI / 2);
  geometries.push(dialGeo);
  const dialMesh = new THREE.Mesh(dialGeo, dialMat);
  dialMesh.position.y = 0.366;
  root.add(dialMesh);

  // 2. Machined Bezel Collar
  const collarGroup = new THREE.Group();
  const collarProfile = [
    new THREE.Vector2(0.66, 0.36),
    new THREE.Vector2(1.16, 0.36),
    new THREE.Vector2(1.12, 0.48),
    new THREE.Vector2(0.72, 0.52),
    new THREE.Vector2(0.66, 0.36),
  ];
  const collarGeo = new THREE.LatheGeometry(collarProfile, 48);
  geometries.push(collarGeo);
  const collarMesh = new THREE.Mesh(collarGeo, collarMat);
  collarMesh.castShadow = true;
  collarMesh.receiveShadow = true;
  collarGroup.add(collarMesh);
  root.add(collarGroup);

  // 3. Central Sculpted Pylon (ExtrudeGeometry with bevels)
  const pylonGroup = new THREE.Group();
  const pylonShape = new THREE.Shape();
  pylonShape.moveTo(-0.34, -0.22);
  pylonShape.lineTo(0.34, -0.22);
  pylonShape.lineTo(0.24, 0.22);
  pylonShape.lineTo(-0.24, 0.22);
  pylonShape.closePath();

  const pylonGeo = new THREE.ExtrudeGeometry(pylonShape, {
    depth: 1.95,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.04,
    bevelSegments: 3,
  });
  pylonGeo.rotateX(-Math.PI / 2);
  geometries.push(pylonGeo);
  const pylonMesh = new THREE.Mesh(pylonGeo, pylonMat);
  pylonMesh.position.y = 0.48;
  pylonMesh.castShadow = true;
  pylonMesh.receiveShadow = true;
  pylonGroup.add(pylonMesh);
  root.add(pylonGroup);

  // 4-6. Secondary Read: 3 Stepped Growth Bar Pillars (ExtrudeGeometry)
  const pillarsGroup = new THREE.Group();
  const barSpecs = [
    { x: -1.18, z: 0.38, height: 0.95, rotY: 0.28 },
    { x: 0.0, z: 1.24, height: 1.42, rotY: 0.0 },
    { x: 1.18, z: 0.38, height: 1.88, rotY: -0.28 },
  ];

  const barProfile = new THREE.Shape();
  barProfile.moveTo(-0.18, -0.14);
  barProfile.lineTo(0.18, -0.14);
  barProfile.lineTo(0.18, 0.14);
  barProfile.lineTo(-0.18, 0.14);
  barProfile.closePath();

  barSpecs.forEach((spec) => {
    const barGeo = new THREE.ExtrudeGeometry(barProfile, {
      depth: spec.height,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.035,
      bevelSegments: 3,
    });
    barGeo.rotateX(-Math.PI / 2);
    geometries.push(barGeo);
    const barMesh = new THREE.Mesh(barGeo, pillarsMat);
    barMesh.position.set(spec.x, 0.36, spec.z);
    barMesh.rotation.y = spec.rotY;
    barMesh.castShadow = true;
    barMesh.receiveShadow = true;
    pillarsGroup.add(barMesh);
  });
  root.add(pillarsGroup);

  // 7. Sweeping Growth Trajectory Ribbon (TubeGeometry along CatmullRomCurve3)
  const ribbonGroup = new THREE.Group();
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.45, 0.56, 0.55),
    new THREE.Vector3(-0.75, 1.35, 1.15),
    new THREE.Vector3(0.25, 2.05, 0.85),
    new THREE.Vector3(1.18, 2.65, 0.15),
    new THREE.Vector3(0.45, 3.25, -0.45),
  ]);
  const ribbonGeo = new THREE.TubeGeometry(curve, 72, 0.055, 16, false);
  geometries.push(ribbonGeo);
  const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
  ribbonMesh.castShadow = true;
  ribbonGroup.add(ribbonMesh);
  root.add(ribbonGroup);

  // 8. Precision Gimbal Ring + Machined Mount Yokes
  const gimbalGroup = new THREE.Group();
  gimbalGroup.position.set(0, 2.92, 0);
  const gimbalGeo = new THREE.TorusGeometry(0.86, 0.038, 20, 96);
  geometries.push(gimbalGeo);
  const gimbalRing = new THREE.Mesh(gimbalGeo, collarMat);
  gimbalRing.rotation.x = Math.PI * 0.36;
  gimbalRing.rotation.y = Math.PI * 0.16;
  gimbalRing.castShadow = true;
  gimbalGroup.add(gimbalRing);

  const outerRingGeo = new THREE.TorusGeometry(1.06, 0.022, 16, 96);
  geometries.push(outerRingGeo);
  const outerRing = new THREE.Mesh(outerRingGeo, pylonMat);
  outerRing.rotation.x = -Math.PI * 0.28;
  outerRing.rotation.z = Math.PI * 0.18;
  gimbalGroup.add(outerRing);
  root.add(gimbalGroup);

  // 9. Transmissive Sapphire Crystal Core
  const coreGroup = new THREE.Group();
  coreGroup.position.set(0, 2.92, 0);
  const crystalGeo = new THREE.OctahedronGeometry(0.44, 0);
  geometries.push(crystalGeo);
  const coreCrystal = new THREE.Mesh(crystalGeo, coreMat);
  coreCrystal.scale.set(0.82, 1.25, 0.82);
  coreCrystal.castShadow = !isSoftwareGl;
  coreGroup.add(coreCrystal);
  root.add(coreGroup);

  // 10. InstancedMesh Orbital Data Constellation (42 nodes)
  const orbiterGroup = new THREE.Group();
  const nodeCount = 42;
  const nodeGeo = new THREE.OctahedronGeometry(0.045, 0);
  geometries.push(nodeGeo);
  const orbitalNodes = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);
  const orbitalBaseAngles = new Float32Array(nodeCount);
  const orbitalRadii = new Float32Array(nodeCount);
  const orbitalHeights = new Float32Array(nodeCount);

  const dummy = new THREE.Object3D();
  const tintColor = new THREE.Color();

  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2;
    const radius = 1.65 + (i % 4) * 0.36;
    const height = 0.85 + ((i * 0.618) % 1) * 2.55;
    const scale = 0.72 + (i % 3) * 0.28;

    orbitalBaseAngles[i] = angle;
    orbitalRadii[i] = radius;
    orbitalHeights[i] = height;

    dummy.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();
    orbitalNodes.setMatrixAt(i, dummy.matrix);

    tintColor.setHSL(0.53 + (i % 5) * 0.025, 0.85, 0.58 + (i % 3) * 0.08);
    orbitalNodes.setColorAt(i, tintColor);
  }

  orbitalNodes.instanceMatrix.needsUpdate = true;
  if (orbitalNodes.instanceColor) {
    orbitalNodes.instanceColor.needsUpdate = true;
  }
  orbitalNodes.computeBoundingSphere();
  orbiterGroup.add(orbitalNodes);
  root.add(orbiterGroup);

  const applyFinish = (preset: FinishPresetId) => {
    const p = FINISH_PALETTES[preset];
    plinthMat.color.setHex(p.plinth);
    collarMat.color.setHex(p.collar);
    pylonMat.color.setHex(p.pylon);
    pillarsMat.color.setHex(p.pillars);
    ribbonMat.color.setHex(p.ribbon);
    coreMat.color.setHex(p.core);
  };

  const dispose = () => {
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
    textures.forEach((t) => t.dispose());
  };

  return {
    root,
    orbiterGroup,
    coreCrystal,
    gimbalRing,
    orbitalNodes,
    orbitalBaseAngles,
    orbitalRadii,
    orbitalHeights,
    layers: {
      collar: collarGroup,
      pylon: pylonGroup,
      pillars: pillarsGroup,
      ribbon: ribbonGroup,
      gimbal: gimbalGroup,
      core: coreGroup,
    },
    applyFinish,
    dispose,
  };
}
