import { useState } from 'react';
import { Plus } from 'lucide-react';

import type { Anime } from '@/interfaces/anime';
import type { Manga } from '@/interfaces/manga';
import { TopCardSearch } from './TopCardSearch';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
  position: number;
  mediaItem?: Anime | Manga;
}

export const TopCard = ({ position, mediaItem }: Props) => {
  const [activeSearchPosition, setActiveSearchPosition] = useState<number | null>(null);

  const [searchQuery, setSearchQuery] = useState('');

  const handleCardClick = () => {
    if (activeSearchPosition !== position) {
      setActiveSearchPosition(position);
      setSearchQuery('');
    }
  }

  const getPodiumCardStyles = (pos: number) => {
    if (pos === 1) return 'border-yellow-500 shadow-yellow-500/20';
    if (pos === 2) return 'border-slate-400 shadow-slate-400/20';
    if (pos === 3) return 'border-amber-600 shadow-amber-600/20';
    if (pos >= 4 && pos <= 10) return 'border-stone-500 shadow-stone-500/20';
    if (pos >= 11 && pos <= 15) return 'border-stone-600 shadow-stone-600/20';
  };

  const getPodiumBadgeStyles = (pos: number) => {
    if (pos === 1) return 'bg-gradient-to-br from-yellow-500 to-yellow-700 text-white shadow-yellow-500/50 ring-2 ring-yellow-400';
    if (pos === 2) return 'bg-gradient-to-br from-slate-400 to-slate-600 text-white shadow-slate-400/50 ring-2 ring-slate-300';
    if (pos === 3) return 'bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-amber-700/50 ring-2 ring-amber-500';
    if (pos >= 4 && pos <= 10) return 'bg-gradient-to-br from-stone-400 to-stone-600 text-stone-200 shadow-stone-500/50 ring-2 ring-stone-400';
    if (pos >= 11 && pos <= 15) return 'bg-gradient-to-br from-stone-500 to-stone-700 text-stone-200 shadow-stone-600/50 ring-2 ring-stone-500';
    return 'bg-gradient-to-br from-stone-600 to-stone-800 text-stone-300 shadow-stone-700/50 ring-2 ring-stone-600';
  };

  return (
    <Card
      key={position}
      onClick={handleCardClick}
      className={
        `group relative overflow-hidden cursor-pointer transition-all
        hover:scale-105 hover:shadow-lg dark:hover:shadow-primary/20 border shadow-md
        ${getPodiumCardStyles(position)}
        ${activeSearchPosition === position ? 'ring-2 ring-accent scale-105 overflow-visible z-20' : ''}`
      }
    >
      <div
        className={
          `absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full font-bold text-primary-foreground
            shadow-sm z-10 transition-all duration-300
            ${getPodiumBadgeStyles(position)}`
        }
      >
        {position}
      </div>

      <CardContent className="flex flex-col items-center justify-center p-4 min-h-[250px] sm:min-h-[350px]">
        {activeSearchPosition === position ? (
          <TopCardSearch
            position={position}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setActiveSearchPosition={setActiveSearchPosition}
          />
        ) : mediaItem ? (
          <div className="absolute inset-0 z-0">
            <img
              src={mediaItem.images.webp.image_url}
              alt={mediaItem.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <div className={`absolute bottom-0 left-0 ${getPodiumBadgeStyles(position)} right-0 backdrop-blur-md py-2 h-12 flex justify-center items-center `}>
              <span className="text-white text-sm sm:text-md font-semibold text-center line-clamp-2 block text-pretty">
                {mediaItem.title}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:text-accent transition-all duration-300">
            <Plus className="h-10 w-10 mb-3" />
            <span className="font-medium">
              Add
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
