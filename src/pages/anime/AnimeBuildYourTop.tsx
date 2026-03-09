import { Share2 } from 'lucide-react';
import { flushSync } from 'react-dom';
import * as htmlToImage from 'html-to-image';
import { useState, useRef, use } from 'react';

import Hero from '@/components/custom/Hero'
import { Button } from '@/components/ui/button';
import animeBanner from "@/assets/anime_banner.webp";
import { TopCard } from '@/components/custom/top/TopCard';
import { TopExportLayout } from '@/components/custom/top/TopExportLayout';
import { TopExportDialog } from '@/components/custom/top/TopExportDialog';
import { BuildYourTopContext } from '@/context/BuildYourTopContext';

const listOptions = [5, 10, 15, 20];

function getProxiedImageUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === 'myanimelist.net')
      return `/mal-image${parsed.pathname}`;
    if (parsed.hostname === 'cdn.myanimelist.net')
      return `/mal-cdn-image${parsed.pathname}`;
  } catch { /* return original url */ }
  return url;
}

async function fetchImageAsDataUrl(url: string): Promise<string> {
  const response = await fetch(getProxiedImageUrl(url));
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export const AnimeBuildYourTop = () => {
  const [listSize, setListSize] = useState<number>(10);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [shareImage, setShareImage] = useState<string | null>(null);
  const [imageDataUrls, setImageDataUrls] = useState<Record<number, string>>({});
  const gridRef = useRef<HTMLDivElement>(null);
  const shareGridRef = useRef<HTMLDivElement>(null);
  const { topList } = use(BuildYourTopContext);

  const handleShare = async () => {
    if (!shareGridRef.current) return;
    try {
      const dataUrlMap: Record<number, string> = {};
      await Promise.all(
        Object.entries(topList).map(async ([pos, anime]) => {
          try {
            dataUrlMap[Number(pos)] = await fetchImageAsDataUrl(anime.images.webp.image_url);
          } catch {
            // Skip images that fail to fetch (CORS or network error)
          }
        })
      );

      flushSync(() => {
        setImageDataUrls(dataUrlMap);
      });

      // Wait for all images in the share grid to finish decoding
      const images = shareGridRef.current.querySelectorAll('img');
      await Promise.all(
        Array.from(images).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise<void>(resolve => {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          });
        })
      );

      const dataUrl = await htmlToImage.toPng(shareGridRef.current, {
        quality: 0.95,
        backgroundColor: '#050816',
        style: { padding: '1rem', margin: '0' },
      });
      setShareImage(dataUrl);
      setIsShareDialogOpen(true);
    } catch (error) {
      console.error('Error generating image', error);
    }
  };

  return (<>
    <Hero
      title="Build Your Top Anime"
      description="Build your custom top anime list"
      img={animeBanner}
    />

    <main className="container mx-auto px-4 py-5">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-2 gap-4">

        <div className="flex items-center gap-3 p-2 rounded-lg border border-border/50 bg-card">
          <span className="text-sm font-medium px-2">Size:</span>

          <div className="flex gap-2">
            {listOptions.map((size) => (
              <Button
                key={size}
                variant={listSize === size ? "default" : "outline"}
                size="sm"
                onClick={() => setListSize(size)}
                className={`min-w-10 transition-all ${listSize === size ? 'shadow-md scale-105' : 'hover:bg-background'}`}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 rounded-lg border border-border/50 bg-card">
          <Button onClick={handleShare} variant="default" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share Top
          </Button>
        </div>

      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4 rounded-xl relative"
      >
        {Array.from({ length: listSize }, (_, i) => i + 1).map((position) => (
          <TopCard key={position} position={position} />
        ))}
      </div>

    </main>

    {/* Off-screen share layout used only for image generation */}
    <TopExportLayout
      shareGridRef={shareGridRef}
      listSize={listSize}
      imageDataUrls={imageDataUrls}
    />

    <TopExportDialog
      listSize={listSize}
      shareImage={shareImage}
      isShareDialogOpen={isShareDialogOpen}
      setIsShareDialogOpen={setIsShareDialogOpen}
    />

  </>);
}

