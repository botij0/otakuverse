import { useState, useRef, use } from 'react';
import * as htmlToImage from 'html-to-image';
import { Download, Share2, Twitter } from 'lucide-react';

import Hero from '@/components/custom/Hero'
import { Button } from '@/components/ui/button';
import animeBanner from "@/assets/anime_banner.webp";
import { TopCard } from '@/components/custom/TopCard';
import { BuildYourTopContext } from '@/context/BuildYourTopContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const listOptions = [5, 10, 15, 20];

export const AnimeBuildYourTop = () => {
  const [listSize, setListSize] = useState<number>(10);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [shareImage, setShareImage] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const shareGridRef = useRef<HTMLDivElement>(null);
  const { topList } = use(BuildYourTopContext);

  const handleShare = async () => {
    if (!shareGridRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(shareGridRef.current, {
        quality: 0.95,
        backgroundColor: '#050816',
        style: { padding: '1rem', margin: '0' },
        cacheBust: true,
      });
      setShareImage(dataUrl);
      setIsShareDialogOpen(true);
    } catch (error) {
      console.error('Error generating image', error);
    }
  };

  const downloadImage = () => {
    if (!shareImage) return;
    const link = document.createElement('a');
    link.download = `my-anime-top-${listSize}.png`;
    link.href = shareImage;
    link.click();
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=Check out my custom anime Top ${listSize}!&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareToReddit = () => {
    window.open(`https://www.reddit.com/submit?title=Check out my custom anime Top ${listSize}!&url=${encodeURIComponent(window.location.href)}`, '_blank');
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
    <div className="fixed -left-[9999px] top-0">
      <div
        ref={shareGridRef}
        className="w-[1200px] max-w-none bg-[#050816] text-white rounded-2xl p-8 shadow-2xl border border-white/5"
      >
        <div className="flex items-center justify-between mb-6 gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-white/60">
              Otakuverse
            </p>
            <h1 className="text-3xl font-extrabold mt-1">
              My Anime Top {listSize}
            </h1>
          </div>
          <img
            src={animeBanner}
            alt="Otakuverse"
            className="h-16 w-32 object-cover rounded-lg border border-white/10"
          />
        </div>

        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: listSize }, (_, i) => i + 1).map((position) => {
            const anime = topList[position];
            return (
              <div
                key={position}
                className="relative flex flex-col justify-between rounded-xl bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 border border-white/5 p-3 min-h-[140px]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-extrabold text-black shadow-md">
                    {position}
                  </span>
                  {anime ? (
                    <span className="text-[10px] uppercase tracking-wide text-emerald-300/90 font-semibold">
                      Picked
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase tracking-wide text-white/30">
                      Empty
                    </span>
                  )}
                </div>
                <div className="flex-1 flex items-center">
                  {anime ? (
                    <p className="text-xs font-semibold leading-snug line-clamp-3">
                      {anime.title}
                    </p>
                  ) : (
                    <p className="text-[11px] text-white/40 italic">
                      Choose an anime in the app to fill this slot.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-[10px] text-white/40 text-right">
          Built with otakuverse.app
        </p>
      </div>
    </div>

    <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Share Your Top {listSize}</DialogTitle>
          <DialogDescription>
            Download or share your generated top anime list image!
          </DialogDescription>
        </DialogHeader>
        <div className="relative w-full overflow-hidden rounded-lg border bg-muted/20 flex items-center justify-center p-4">
          {shareImage ? (
            <img src={shareImage} alt={`Your Top ${listSize} Anime`} className="w-full h-auto object-contain max-h-[60vh] rounded-md shadow-lg" />
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">Generating image...</div>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <Button onClick={downloadImage} className="gap-2">
            <Download className="w-4 h-4" />
            Download Image
          </Button>
          <Button variant="outline" onClick={shareToTwitter} className="gap-2 text-[#1DA1F2] hover:text-[#1DA1F2]/90 border-[#1DA1F2]/30 hover:bg-[#1DA1F2]/10 transition-colors">
            <Twitter className="w-4 h-4 text-[#1DA1F2]" />
            Share on X
          </Button>
          <Button variant="outline" onClick={shareToReddit} className="gap-2 text-[#FF4500] hover:text-[#FF4500]/90 border-[#FF4500]/30 hover:bg-[#FF4500]/10 transition-colors">
            <span className="font-bold text-lg leading-none mr-1 text-[#FF4500]">R</span>
            Share on Reddit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </>);
}

