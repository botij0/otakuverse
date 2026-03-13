import { flushSync } from 'react-dom';
import * as htmlToImage from 'html-to-image';
import { useState, useRef, use } from 'react';

import Hero from '@/components/custom/Hero'
import animeBanner from "@/assets/anime_banner.webp";
import { TopCard } from '@/components/custom/top/TopCard';
import { TopHeader } from '@/components/custom/top/TopHeader';
import { TopExportLayout } from '@/components/custom/top/TopExportLayout';
import { TopExportDialog } from '@/components/custom/top/TopExportDialog';
import { BuildYourTopContext } from '@/context/BuildYourTopContext';
import { fetchImageAsDataUrl, getInitialListSize } from '@/lib/utils';


export const AnimeBuildYourTop = () => {
  const { animeTopList } = use(BuildYourTopContext);
  const [listSize, setListSize] = useState<number>(getInitialListSize(animeTopList));
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [shareImage, setShareImage] = useState<string | null>(null);
  const [imageDataUrls, setImageDataUrls] = useState<Record<number, string>>({});
  const gridRef = useRef<HTMLDivElement>(null);
  const shareGridRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (!shareGridRef.current) return;
    try {
      const dataUrlMap: Record<number, string> = {};
      await Promise.all(
        Object.entries(animeTopList).map(async ([pos, anime]) => {
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
      description="Create a top list with the size you want and share it in social media"
      img={animeBanner}
    />

    <main className="container mx-auto px-4 py-5">
      <TopHeader
        listSize={listSize}
        setListSize={setListSize}
        handleShare={handleShare}
      />

      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4 rounded-xl relative"
      >
        {Array.from({ length: listSize }, (_, i) => i + 1).map((position) => (
          <TopCard key={position} position={position} />
        ))}
      </div>

    </main>

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

