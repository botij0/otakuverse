import { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import { Download, Share2, Twitter } from 'lucide-react';

import Hero from '@/components/custom/Hero'
import { Button } from '@/components/ui/button';
import animeBanner from "@/assets/anime_banner.webp";
import { TopCard } from '@/components/custom/TopCard';
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

  const handleShare = async () => {
    if (!gridRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(gridRef.current, {
        quality: 0.95,
        backgroundColor: '#0a0a0a',
        style: { padding: '1rem', margin: '0' },
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

