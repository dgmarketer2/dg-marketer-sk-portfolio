import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function formatGeminiError(err: unknown): { status: number; message: string; code: string } {
  const rawMessage = err instanceof Error ? err.message : String(err);
  const statusMatch =
    (typeof err === 'object' && err !== null && 'status' in err && Number((err as { status?: unknown }).status)) ||
    0;

  if (/PERMISSION_DENIED|403|API_KEY_INVALID|API key not valid/i.test(rawMessage) || statusMatch === 403) {
    return {
      status: 403,
      code: 'PAID_KEY_REQUIRED',
      message:
        'This model requires a valid billing-enabled Gemini API key. Please check or select a paid API key in Settings > Secrets.',
    };
  }

  if (/RESOURCE_EXHAUSTED|429|quota/i.test(rawMessage) || statusMatch === 429) {
    return {
      status: 429,
      code: 'QUOTA_OR_PAID_REQUIRED',
      message:
        'Rate limit or quota reached. Paid-tier models (gemini-nano-banana-2.1 and gemini-omni-1.2-flash) require a billing-enabled API key in Settings > Secrets.',
    };
  }

  if (/NOT_FOUND|404/i.test(rawMessage) || statusMatch === 404) {
    return {
      status: 404,
      code: 'MODEL_NOT_FOUND',
      message: `Requested model endpoint was not found: ${rawMessage}`,
    };
  }

  return {
    status: statusMatch >= 400 && statusMatch < 600 ? statusMatch : 500,
    code: 'GEMINI_API_ERROR',
    message: rawMessage || 'Unexpected error communicating with Gemini API.',
  };
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '25mb' }));

  // Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true });
  });

  // Create & Edit Images using gemini-nano-banana-2.1
  app.post('/api/studio/image', async (req: Request, res: Response) => {
    const ai = getAiClient();
    if (!ai) {
      res.status(401).json({
        code: 'MISSING_API_KEY',
        error:
          'GEMINI_API_KEY is not configured. Please add a billing-enabled Gemini API key in Settings > Secrets to use gemini-nano-banana-2.1.',
      });
      return;
    }

    try {
      const { prompt, aspectRatio, imageSize, sourceImage } = req.body as {
        prompt?: string;
        aspectRatio?: string;
        imageSize?: string;
        sourceImage?: { data: string; mimeType: string };
      };

      if (!prompt || !prompt.trim()) {
        res.status(400).json({ code: 'INVALID_INPUT', error: 'Please provide an image prompt.' });
        return;
      }

      const allowedRatios = new Set(['1:1', '3:4', '4:3', '9:16', '16:9', '1:4', '1:8', '4:1', '8:1']);
      const safeRatio = aspectRatio && allowedRatios.has(aspectRatio) ? aspectRatio : '1:1';
      const allowedSizes = new Set(['1K', '2K', '4K']);
      const safeSize = imageSize && allowedSizes.has(imageSize) ? imageSize : '1K';

      const parts: Array<
        | { text: string }
        | { inlineData: { data: string; mimeType: string } }
      > = [];

      if (sourceImage?.data && sourceImage?.mimeType) {
        parts.push({
          inlineData: {
            data: sourceImage.data,
            mimeType: sourceImage.mimeType,
          },
        });
      }

      parts.push({ text: prompt.trim() });

      const response = await ai.models.generateContent({
        model: 'gemini-nano-banana-2.1',
        contents: { parts },
        config: {
          imageConfig: {
            aspectRatio: safeRatio,
            imageSize: safeSize,
          },
        },
      });

      let imageUrl: string | null = null;
      let textOutput = '';

      for (const part of response.candidates?.[0]?.content?.parts ?? []) {
        if (part.inlineData?.data && !imageUrl) {
          const mime = part.inlineData.mimeType ?? 'image/png';
          imageUrl = `data:${mime};base64,${part.inlineData.data}`;
        } else if (part.text) {
          textOutput += part.text;
        }
      }

      if (!imageUrl) {
        res.status(502).json({
          code: 'NO_IMAGE_RETURNED',
          error:
            textOutput ||
            'The model completed without returning an image. Try adjusting your prompt.',
        });
        return;
      }

      res.json({ imageUrl, text: textOutput.trim() });
    } catch (err) {
      const formatted = formatGeminiError(err);
      res.status(formatted.status).json({
        code: formatted.code,
        error: formatted.message,
      });
    }
  });

  // Animate Image into Video using gemini-omni-1.2-flash via Interactions API
  app.post('/api/studio/video', async (req: Request, res: Response) => {
    const ai = getAiClient();
    if (!ai) {
      res.status(401).json({
        code: 'MISSING_API_KEY',
        error:
          'GEMINI_API_KEY is not configured. Please add a billing-enabled Gemini API key in Settings > Secrets to use gemini-omni-1.2-flash.',
      });
      return;
    }

    try {
      const { prompt, aspectRatio, duration, image } = req.body as {
        prompt?: string;
        aspectRatio?: string;
        duration?: string;
        image?: { data: string; mimeType: string };
      };

      if (!image?.data || !image?.mimeType) {
        res.status(400).json({
          code: 'INVALID_INPUT',
          error: 'Please upload a source photo to animate into a video.',
        });
        return;
      }

      const safeAspectRatio = aspectRatio === '9:16' ? '9:16' : '16:9';
      const allowedDurations = new Set(['3s', '4s', '5s', '6s', '7s', '8s', '9s', '10s']);
      const safeDuration = duration && allowedDurations.has(duration) ? duration : '6s';
      const motionPrompt =
        prompt && prompt.trim()
          ? prompt.trim()
          : 'Smooth cinematic camera motion bringing the scene to life with subtle natural lighting and depth.';

      const interaction = await ai.interactions.create(
        {
          model: 'gemini-omni-1.2-flash',
          input: [
            {
              type: 'image',
              mime_type: image.mimeType,
              data: image.data,
            },
            {
              type: 'text',
              text: motionPrompt,
            },
          ],
          background: false,
          store: false,
          stream: false,
          response_format: {
            type: 'video',
            aspect_ratio: safeAspectRatio,
            duration: safeDuration,
            resolution: '720p',
          },
        },
        { timeout: 300000 }
      );

      const videoPart = interaction.output_video;
      if (videoPart?.data) {
        const mimeType = videoPart.mime_type || 'video/mp4';
        res.json({
          videoUrl: `data:${mimeType};base64,${videoPart.data}`,
          mimeType,
          aspectRatio: safeAspectRatio,
        });
        return;
      }

      if (videoPart?.uri) {
        res.json({
          videoUrl: videoPart.uri,
          mimeType: videoPart.mime_type || 'video/mp4',
          aspectRatio: safeAspectRatio,
        });
        return;
      }

      res.status(502).json({
        code: 'NO_VIDEO_RETURNED',
        error: 'The Interactions API completed without returning a video output.',
      });
    } catch (err) {
      const formatted = formatGeminiError(err);
      res.status(formatted.status).json({
        code: formatted.code,
        error: formatted.message,
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
