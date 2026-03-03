import { useState } from 'react';

import Hero from '@/components/custom/Hero'
import { Button } from '@/components/ui/button';
import animeBanner from "@/assets/anime_banner.webp";
import { TopCard } from '@/components/custom/TopCard';

const listOptions = [5, 10, 15, 20];

export const AnimeBuildYourTop = () => {
  const [listSize, setListSize] = useState<number>(10);

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
          <span className="text-sm font-medium px-2">Share</span>
        </div>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {Array.from({ length: listSize }, (_, i) => i + 1).map((position) => (
          <TopCard position={position} />
        ))}
      </div>

    </main>
  </>);
}

