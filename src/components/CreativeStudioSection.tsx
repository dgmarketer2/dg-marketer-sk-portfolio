import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  AlertCircle,
  Download,
  Film,
  ImagePlus,
  Loader2,
  Sparkles,
  Upload,
  Wand2,
  X,
} from 'lucide-react';
import { Language } from '../types/portfolio';

interface CreativeStudioSectionProps {
  language: Language;
  incomingImageDataUrl: string | null;
  onClearIncomingImage: () => void;
}

type StudioTab = 'image' | 'video';
type ImageMode = 'create' | 'edit';
type ImageAspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
type ImageResolution = '1K' | '2K' | '4K';
type VideoAspectRatio = '16:9' | '9:16';

interface UploadedImage {
  dataUrl: string;
  base64: string;
  mimeType: string;
  name: string;
}

function parseDataUrl(dataUrl: string, fallbackName: string): UploadedImage | null {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!match) return null;
  return {
    dataUrl,
    mimeType: match[1],
    base64: match[2],
    name: fallbackName,
  };
}

export function CreativeStudioSection({
  language,
  incomingImageDataUrl,
  onClearIncomingImage,
}: CreativeStudioSectionProps) {
  const [activeTab, setActiveTab] = useState<StudioTab>('image');

  // Image Studio state (gemini-nano-banana-2.1)
  const [imageMode, setImageMode] = useState<ImageMode>('create');
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageAspectRatio, setImageAspectRatio] = useState<ImageAspectRatio>('1:1');
  const [imageSize, setImageSize] = useState<ImageResolution>('1K');
  const [editSourceImage, setEditSourceImage] = useState<UploadedImage | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [generatedImageNote, setGeneratedImageNote] = useState<string>('');
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  // Video Studio state (gemini-omni-1.2-flash via Interactions API)
  const [videoSourceImage, setVideoSourceImage] = useState<UploadedImage | null>(null);
  const [videoPrompt, setVideoPrompt] = useState('');
  const [videoAspectRatio, setVideoAspectRatio] = useState<VideoAspectRatio>('16:9');
  const [videoDuration, setVideoDuration] = useState<'4s' | '6s' | '8s' | '10s'>('6s');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  useEffect(() => {
    if (!incomingImageDataUrl) return;
    const parsed = parseDataUrl(incomingImageDataUrl, '3d-stage-capture.png');
    if (parsed) {
      setEditSourceImage(parsed);
      setImageMode('edit');
      setVideoSourceImage(parsed);
      onClearIncomingImage();
    }
  }, [incomingImageDataUrl, onClearIncomingImage]);

  const handleFileRead = (
    event: ChangeEvent<HTMLInputElement>,
    onLoaded: (img: UploadedImage) => void,
    onError: (msg: string) => void
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      onError(
        language === 'en'
          ? 'Please select a valid PNG, JPEG, or WebP image file.'
          : 'অনুগ্রহ করে একটি সঠিক PNG, JPEG বা WebP ছবি নির্বাচন করুন।'
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') return;
      const parsed = parseDataUrl(reader.result, file.name);
      if (parsed) {
        onLoaded(parsed);
      }
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const handleImageSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setImageError(null);

    if (!imagePrompt.trim()) {
      setImageError(
        language === 'en'
          ? 'Please describe the image you want to create or edit.'
          : 'আপনি যে ছবি তৈরি বা এডিট করতে চান তা বর্ণনা করুন।'
      );
      return;
    }

    if (imageMode === 'edit' && !editSourceImage) {
      setImageError(
        language === 'en'
          ? 'Please upload a source image to edit, or switch to Create mode.'
          : 'এডিট করার জন্য একটি ছবি আপলোড করুন অথবা Create মোডে যান।'
      );
      return;
    }

    setImageLoading(true);
    try {
      const response = await fetch('/api/studio/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: imagePrompt.trim(),
          aspectRatio: imageAspectRatio,
          imageSize,
          sourceImage:
            imageMode === 'edit' && editSourceImage
              ? {
                  data: editSourceImage.base64,
                  mimeType: editSourceImage.mimeType,
                }
              : undefined,
        }),
      });

      const payload = (await response.json()) as {
        imageUrl?: string;
        text?: string;
        error?: string;
      };

      if (!response.ok || !payload.imageUrl) {
        throw new Error(
          payload.error ||
            (language === 'en'
              ? 'Unable to generate image right now.'
              : 'এই মুহূর্তে ছবি তৈরি করা সম্ভব হয়নি।')
        );
      }

      setGeneratedImageUrl(payload.imageUrl);
      setGeneratedImageNote(payload.text || '');
    } catch (err) {
      setImageError(err instanceof Error ? err.message : String(err));
    } finally {
      setImageLoading(false);
    }
  };

  const handleVideoSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setVideoError(null);

    if (!videoSourceImage) {
      setVideoError(
        language === 'en'
          ? 'Please upload a source photo to animate into a video.'
          : 'ভিডিওতে রূপান্তর করার জন্য একটি ছবি আপলোড করুন।'
      );
      return;
    }

    setVideoLoading(true);
    try {
      const response = await fetch('/api/studio/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: videoPrompt.trim(),
          aspectRatio: videoAspectRatio,
          duration: videoDuration,
          image: {
            data: videoSourceImage.base64,
            mimeType: videoSourceImage.mimeType,
          },
        }),
      });

      const payload = (await response.json()) as {
        videoUrl?: string;
        error?: string;
      };

      if (!response.ok || !payload.videoUrl) {
        throw new Error(
          payload.error ||
            (language === 'en'
              ? 'Unable to generate video right now.'
              : 'এই মুহূর্তে ভিডিও তৈরি করা সম্ভব হয়নি।')
        );
      }

      setGeneratedVideoUrl(payload.videoUrl);
    } catch (err) {
      setVideoError(err instanceof Error ? err.message : String(err));
    } finally {
      setVideoLoading(false);
    }
  };

  const handleSendGeneratedToVideo = () => {
    if (!generatedImageUrl) return;
    const parsed = parseDataUrl(generatedImageUrl, 'generated-creative.png');
    if (parsed) {
      setVideoSourceImage(parsed);
      setActiveTab('video');
    }
  };

  const t = {
    eyebrow: language === 'en' ? 'AI Creative Studio' : 'এআই ক্রিয়েটিভ স্টুডিও',
    heading:
      language === 'en'
        ? 'Campaign Visual & Video Studio'
        : 'ক্যাম্পেইন ভিজ্যুয়াল ও ভিডিও স্টুডিও',
    subheading:
      language === 'en'
        ? 'Create or edit marketing visuals with Nano Banana 2.1, or animate any uploaded photo into 16:9 or 9:16 video using Omni 1.2 Flash.'
        : 'Nano Banana 2.1 দিয়ে মার্কেটিং ভিজ্যুয়াল তৈরি বা এডিট করুন, অথবা Omni 1.2 Flash দিয়ে যেকোনো ছবিকে ১৬:৯ বা ৯:১৬ ভিডিওতে রূপান্তর করুন।',
    tabImage: language === 'en' ? 'Create & Edit Images' : 'ছবি তৈরি ও এডিট',
    tabVideo: language === 'en' ? 'Animate Photo to Video' : 'ছবি থেকে ভিডিও',
    createMode: language === 'en' ? 'Create New' : 'নতুন তৈরি',
    editMode: language === 'en' ? 'Edit Photo' : 'ছবি এডিট',
    promptLabel: language === 'en' ? 'Creative Prompt' : 'ক্রিয়েটিভ প্রম্পট',
    promptPlaceholder:
      imageMode === 'create'
        ? language === 'en'
          ? 'Minimalist e-commerce product visual on dark slate stone with soft cyan rim lighting...'
          : 'ডার্ক ব্যাকগ্রাউন্ডে আধুনিক প্রোডাক্ট বিজ্ঞাপনের ভিজ্যুয়াল বর্ণনা লিখুন...'
        : language === 'en'
          ? 'Add studio rim lighting, refine background contrast, and make it campaign-ready...'
          : 'ছবিটিতে কী পরিবর্তন বা এডিট করতে চান তা লিখুন...',
    aspectRatio: language === 'en' ? 'Aspect Ratio' : 'অ্যাস্পেক্ট রেশিও',
    resolution: language === 'en' ? 'Resolution' : 'রেজল্যুশন',
    uploadLabel: language === 'en' ? 'Upload Source Image' : 'ছবি আপলোড করুন',
    generateImageBtn:
      imageMode === 'create'
        ? language === 'en'
          ? 'Generate Visual'
          : 'ছবি তৈরি করুন'
        : language === 'en'
          ? 'Apply Edits'
          : 'এডিট প্রয়োগ করুন',
    generatingImage: language === 'en' ? 'Generating visual...' : 'ছবি তৈরি হচ্ছে...',
    motionPromptLabel: language === 'en' ? 'Motion Direction' : 'ভিডিও মোশন নির্দেশনা',
    motionPromptPlaceholder:
      language === 'en'
        ? 'Smooth slow push-in camera movement with gentle ambient light shifts...'
        : 'ক্যামেরার ধীরগতির মুভমেন্ট ও আলোর পরিবর্তন বর্ণনা করুন...',
    videoDurationLabel: language === 'en' ? 'Duration' : 'সময়কাল',
    generateVideoBtn: language === 'en' ? 'Animate to Video' : 'ভিডিও তৈরি করুন',
    generatingVideo:
      language === 'en'
        ? 'Generating video via Interactions API (may take ~1-2 min)...'
        : 'ভিডিও তৈরি হচ্ছে (১–২ মিনিট সময় লাগতে পারে)...',
    sendToVideo: language === 'en' ? 'Animate This Image' : 'এই ছবি দিয়ে ভিডিও বানান',
    download: language === 'en' ? 'Download' : 'ডাউনলোড',
  };

  return (
    <section
      id="ai-studio"
      className="border-b border-[rgba(148,163,184,0.18)] bg-[#0D1B2A]/60 py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1160px] px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#22D3EE]">{t.eyebrow}</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#F5F8FC] sm:text-4xl">
              {t.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#A9B8C9]">
              {t.subheading}
            </p>
          </div>

          {/* Studio Mode Switcher */}
          <div
            role="tablist"
            aria-label={t.heading}
            className="inline-flex rounded-xl border border-[rgba(148,163,184,0.18)] bg-[#07111F] p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'image'}
              onClick={() => setActiveTab('image')}
              className={`inline-flex min-h-[42px] items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors sm:text-sm ${
                activeTab === 'image'
                  ? 'bg-[#3B82F6] text-white'
                  : 'text-[#A9B8C9] hover:text-[#F5F8FC]'
              }`}
            >
              <Wand2 className="h-4 w-4" aria-hidden="true" />
              <span>{t.tabImage}</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'video'}
              onClick={() => setActiveTab('video')}
              className={`inline-flex min-h-[42px] items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors sm:text-sm ${
                activeTab === 'video'
                  ? 'bg-[#3B82F6] text-white'
                  : 'text-[#A9B8C9] hover:text-[#F5F8FC]'
              }`}
            >
              <Film className="h-4 w-4" aria-hidden="true" />
              <span>{t.tabVideo}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Create & Edit Images (gemini-nano-banana-2.1) */}
        {activeTab === 'image' && (
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="rounded-2xl border border-[rgba(148,163,184,0.18)] bg-[#102238] p-6 sm:p-7 lg:col-span-6">
              <div className="flex items-center justify-between gap-3 border-b border-[rgba(148,163,184,0.14)] pb-4">
                <div className="inline-flex rounded-lg border border-[rgba(148,163,184,0.18)] bg-[#07111F] p-0.5">
                  <button
                    type="button"
                    onClick={() => setImageMode('create')}
                    className={`min-h-[36px] rounded-md px-3 text-xs font-semibold transition-colors ${
                      imageMode === 'create'
                        ? 'bg-[#22D3EE] text-[#07111F]'
                        : 'text-[#A9B8C9] hover:text-[#F5F8FC]'
                    }`}
                  >
                    {t.createMode}
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageMode('edit')}
                    className={`min-h-[36px] rounded-md px-3 text-xs font-semibold transition-colors ${
                      imageMode === 'edit'
                        ? 'bg-[#22D3EE] text-[#07111F]'
                        : 'text-[#A9B8C9] hover:text-[#F5F8FC]'
                    }`}
                  >
                    {t.editMode}
                  </button>
                </div>

                <span className="text-xs font-medium text-[#7C91A7]">
                  gemini-nano-banana-2.1
                </span>
              </div>

              <form onSubmit={handleImageSubmit} className="mt-5 space-y-5">
                {imageMode === 'edit' && (
                  <div>
                    <span className="block text-sm font-medium text-[#F5F8FC]">
                      {t.uploadLabel}
                    </span>

                    {!editSourceImage ? (
                      <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[rgba(148,163,184,0.3)] bg-[#0D1B2A] px-4 py-6 text-center transition-colors hover:border-[#22D3EE]">
                        <Upload className="h-6 w-6 text-[#22D3EE]" aria-hidden="true" />
                        <span className="mt-2 text-xs font-medium text-[#A9B8C9]">
                          {language === 'en'
                            ? 'Click to select PNG, JPEG, or WebP'
                            : 'PNG, JPEG বা WebP ছবি নির্বাচন করুন'}
                        </span>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          className="sr-only"
                          onChange={(e) =>
                            handleFileRead(e, setEditSourceImage, (msg) => setImageError(msg))
                          }
                        />
                      </label>
                    ) : (
                      <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-[rgba(148,163,184,0.2)] bg-[#0D1B2A] p-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={editSourceImage.dataUrl}
                            alt={editSourceImage.name}
                            className="h-14 w-14 shrink-0 rounded-lg object-cover"
                          />
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-[#F5F8FC]">
                              {editSourceImage.name}
                            </p>
                            <p className="text-xs text-[#7C91A7]">
                              {editSourceImage.mimeType}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditSourceImage(null)}
                          aria-label="Remove source image"
                          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#A9B8C9] hover:bg-[#142A40] hover:text-[#F5F8FC]"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="studio-image-prompt"
                    className="block text-sm font-medium text-[#F5F8FC]"
                  >
                    {t.promptLabel}
                  </label>
                  <textarea
                    id="studio-image-prompt"
                    rows={4}
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder={t.promptPlaceholder}
                    className="mt-2 block w-full rounded-xl border border-[rgba(148,163,184,0.22)] bg-[#0D1B2A] px-4 py-3 text-sm text-[#F5F8FC] placeholder:text-[#7C91A7] focus:border-[#22D3EE]"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="studio-image-ratio"
                      className="block text-xs font-medium text-[#A9B8C9]"
                    >
                      {t.aspectRatio}
                    </label>
                    <select
                      id="studio-image-ratio"
                      value={imageAspectRatio}
                      onChange={(e) => setImageAspectRatio(e.target.value as ImageAspectRatio)}
                      className="mt-1.5 block w-full min-h-[42px] rounded-xl border border-[rgba(148,163,184,0.22)] bg-[#0D1B2A] px-3 py-2 text-sm text-[#F5F8FC]"
                    >
                      <option value="1:1">1:1 (Square)</option>
                      <option value="16:9">16:9 (Landscape)</option>
                      <option value="9:16">9:16 (Vertical)</option>
                      <option value="4:3">4:3 (Standard)</option>
                      <option value="3:4">3:4 (Portrait)</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="studio-image-size"
                      className="block text-xs font-medium text-[#A9B8C9]"
                    >
                      {t.resolution}
                    </label>
                    <select
                      id="studio-image-size"
                      value={imageSize}
                      onChange={(e) => setImageSize(e.target.value as ImageResolution)}
                      className="mt-1.5 block w-full min-h-[42px] rounded-xl border border-[rgba(148,163,184,0.22)] bg-[#0D1B2A] px-3 py-2 text-sm text-[#F5F8FC]"
                    >
                      <option value="1K">1K</option>
                      <option value="2K">2K</option>
                      <option value="4K">4K</option>
                    </select>
                  </div>
                </div>

                {imageError && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 rounded-xl border border-rose-400/40 bg-rose-950/35 p-3.5 text-xs leading-relaxed text-rose-200"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" aria-hidden="true" />
                    <span>{imageError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={imageLoading}
                  className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2563EB] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {imageLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>{t.generatingImage}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                      <span>{t.generateImageBtn}</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Image Output Preview */}
            <div className="flex flex-col justify-between rounded-2xl border border-[rgba(148,163,184,0.18)] bg-[#102238] p-6 sm:p-7 lg:col-span-6">
              {generatedImageUrl ? (
                <>
                  <div className="overflow-hidden rounded-xl border border-[rgba(148,163,184,0.18)] bg-[#07111F]">
                    <img
                      src={generatedImageUrl}
                      alt={imagePrompt || 'Generated campaign visual'}
                      className="max-h-[420px] w-full object-contain"
                    />
                  </div>
                  {generatedImageNote && (
                    <p className="mt-3 text-xs leading-relaxed text-[#A9B8C9]">
                      {generatedImageNote}
                    </p>
                  )}
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <a
                      href={generatedImageUrl}
                      download="dg-marketer-sk-visual.png"
                      className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-[rgba(148,163,184,0.24)] bg-[#0D1B2A] px-4 py-2 text-xs font-semibold text-[#F5F8FC] hover:border-[#22D3EE]"
                    >
                      <Download className="h-4 w-4" aria-hidden="true" />
                      <span>{t.download}</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleSendGeneratedToVideo}
                      className="inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-[#22D3EE] px-4 py-2 text-xs font-semibold text-[#07111F] hover:bg-[#38BDF8]"
                    >
                      <Film className="h-4 w-4" aria-hidden="true" />
                      <span>{t.sendToVideo}</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-[rgba(148,163,184,0.2)] bg-[#0D1B2A]/60 p-8 text-center">
                  <ImagePlus className="h-9 w-9 text-[#22D3EE]" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold text-[#F5F8FC]">
                    {language === 'en'
                      ? 'Visual Output Canvas'
                      : 'ভিজ্যুয়াল আউটপুট প্রিভিউ'}
                  </p>
                  <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-[#7C91A7]">
                    {language === 'en'
                      ? 'Your generated or edited campaign visual will appear here ready for download or animation.'
                      : 'তৈরি বা এডিট করা ক্যাম্পেইন ভিজ্যুয়াল এখানে দেখা যাবে এবং সরাসরি ডাউনলোড বা ভিডিওতে রূপান্তর করা যাবে।'}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Animate Photo into Video (gemini-omni-1.2-flash via Interactions API) */}
        {activeTab === 'video' && (
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="rounded-2xl border border-[rgba(148,163,184,0.18)] bg-[#102238] p-6 sm:p-7 lg:col-span-6">
              <div className="flex items-center justify-between gap-3 border-b border-[rgba(148,163,184,0.14)] pb-4">
                <h3 className="font-display text-base font-bold text-[#F5F8FC]">
                  {t.tabVideo}
                </h3>
                <span className="text-xs font-medium text-[#7C91A7]">
                  gemini-omni-1.2-flash
                </span>
              </div>

              <form onSubmit={handleVideoSubmit} className="mt-5 space-y-5">
                <div>
                  <span className="block text-sm font-medium text-[#F5F8FC]">
                    {t.uploadLabel}{' '}
                    <span className="text-[#22D3EE]" aria-hidden="true">
                      *
                    </span>
                  </span>

                  {!videoSourceImage ? (
                    <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[rgba(148,163,184,0.3)] bg-[#0D1B2A] px-4 py-6 text-center transition-colors hover:border-[#22D3EE]">
                      <Upload className="h-6 w-6 text-[#22D3EE]" aria-hidden="true" />
                      <span className="mt-2 text-xs font-medium text-[#A9B8C9]">
                        {language === 'en'
                          ? 'Upload a photo (PNG, JPEG, WebP) to animate'
                          : 'অ্যানিমেট করার জন্য একটি ছবি (PNG, JPEG, WebP) আপলোড করুন'}
                      </span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="sr-only"
                        onChange={(e) =>
                          handleFileRead(e, setVideoSourceImage, (msg) => setVideoError(msg))
                        }
                      />
                    </label>
                  ) : (
                    <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-[rgba(148,163,184,0.2)] bg-[#0D1B2A] p-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={videoSourceImage.dataUrl}
                          alt={videoSourceImage.name}
                          className="h-14 w-14 shrink-0 rounded-lg object-cover"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-[#F5F8FC]">
                            {videoSourceImage.name}
                          </p>
                          <p className="text-xs text-[#7C91A7]">
                            {videoSourceImage.mimeType}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setVideoSourceImage(null)}
                        aria-label="Remove video source photo"
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#A9B8C9] hover:bg-[#142A40] hover:text-[#F5F8FC]"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="studio-video-prompt"
                    className="block text-sm font-medium text-[#F5F8FC]"
                  >
                    {t.motionPromptLabel}
                  </label>
                  <textarea
                    id="studio-video-prompt"
                    rows={3}
                    value={videoPrompt}
                    onChange={(e) => setVideoPrompt(e.target.value)}
                    placeholder={t.motionPromptPlaceholder}
                    className="mt-2 block w-full rounded-xl border border-[rgba(148,163,184,0.22)] bg-[#0D1B2A] px-4 py-3 text-sm text-[#F5F8FC] placeholder:text-[#7C91A7] focus:border-[#22D3EE]"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <span className="block text-xs font-medium text-[#A9B8C9]">
                      {t.aspectRatio}
                    </span>
                    <div className="mt-1.5 grid grid-cols-2 gap-2">
                      {(['16:9', '9:16'] as VideoAspectRatio[]).map((ratio) => (
                        <button
                          key={ratio}
                          type="button"
                          onClick={() => setVideoAspectRatio(ratio)}
                          aria-pressed={videoAspectRatio === ratio}
                          className={`min-h-[42px] rounded-xl border px-3 text-xs font-semibold transition-colors ${
                            videoAspectRatio === ratio
                              ? 'border-[#22D3EE] bg-[#142A40] text-[#22D3EE]'
                              : 'border-[rgba(148,163,184,0.22)] bg-[#0D1B2A] text-[#A9B8C9] hover:text-[#F5F8FC]'
                          }`}
                        >
                          {ratio === '16:9'
                            ? language === 'en'
                              ? '16:9 Landscape'
                              : '১৬:৯ ল্যান্ডস্কেপ'
                            : language === 'en'
                              ? '9:16 Portrait'
                              : '৯:১৬ পোর্ট্রেট'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="studio-video-duration"
                      className="block text-xs font-medium text-[#A9B8C9]"
                    >
                      {t.videoDurationLabel}
                    </label>
                    <select
                      id="studio-video-duration"
                      value={videoDuration}
                      onChange={(e) =>
                        setVideoDuration(e.target.value as '4s' | '6s' | '8s' | '10s')
                      }
                      className="mt-1.5 block w-full min-h-[42px] rounded-xl border border-[rgba(148,163,184,0.22)] bg-[#0D1B2A] px-3 py-2 text-sm text-[#F5F8FC]"
                    >
                      <option value="4s">4s</option>
                      <option value="6s">6s</option>
                      <option value="8s">8s</option>
                      <option value="10s">10s</option>
                    </select>
                  </div>
                </div>

                {videoError && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 rounded-xl border border-rose-400/40 bg-rose-950/35 p-3.5 text-xs leading-relaxed text-rose-200"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" aria-hidden="true" />
                    <span>{videoError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={videoLoading}
                  className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2563EB] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {videoLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>{t.generatingVideo}</span>
                    </>
                  ) : (
                    <>
                      <Film className="h-4 w-4" aria-hidden="true" />
                      <span>{t.generateVideoBtn}</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Video Output Preview */}
            <div className="flex flex-col justify-between rounded-2xl border border-[rgba(148,163,184,0.18)] bg-[#102238] p-6 sm:p-7 lg:col-span-6">
              {generatedVideoUrl ? (
                <>
                  <div className="overflow-hidden rounded-xl border border-[rgba(148,163,184,0.18)] bg-[#07111F]">
                    <video
                      src={generatedVideoUrl}
                      controls
                      playsInline
                      loop
                      className="max-h-[420px] w-full object-contain"
                    />
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <a
                      href={generatedVideoUrl}
                      download={`dg-marketer-sk-${videoAspectRatio.replace(':', 'x')}.mp4`}
                      className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-[rgba(148,163,184,0.24)] bg-[#0D1B2A] px-4 py-2 text-xs font-semibold text-[#F5F8FC] hover:border-[#22D3EE]"
                    >
                      <Download className="h-4 w-4" aria-hidden="true" />
                      <span>{t.download}</span>
                    </a>
                  </div>
                </>
              ) : (
                <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-[rgba(148,163,184,0.2)] bg-[#0D1B2A]/60 p-8 text-center">
                  <Film className="h-9 w-9 text-[#22D3EE]" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold text-[#F5F8FC]">
                    {language === 'en'
                      ? 'Video Output Player'
                      : 'ভিডিও আউটপুট প্লেয়ার'}
                  </p>
                  <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-[#7C91A7]">
                    {language === 'en'
                      ? 'Upload a photo, choose 16:9 landscape or 9:16 portrait, and animate it via Gemini Interactions API.'
                      : 'একটি ছবি আপলোড করুন, ১৬:৯ বা ৯:১৬ অনুপাত বেছে নিন এবং Gemini Interactions API-এর মাধ্যমে ভিডিও তৈরি করুন।'}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
