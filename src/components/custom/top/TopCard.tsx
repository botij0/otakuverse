import { useState } from 'react';
import { Plus } from 'lucide-react';

import type { Anime } from '@/interfaces/anime';
import type { Manga } from '@/interfaces/manga';
import { TopCardSearch } from './TopCardSearch';
import { Card, CardContent } from '@/components/ui/card';
import type { MediaTypeSimple } from '@/interfaces/media';
import { getPodiumBadgeStyles, getPodiumCardStyles } from '@/lib/utils';

type Props = {
  position: number;
  mediaItem?: Anime | Manga;
  mediaType: MediaTypeSimple
}

export const TopCard = ({ position, mediaItem, mediaType }: Props) => {
  const [activeSearchPosition, setActiveSearchPosition] = useState<number | null>(null);

  const [searchQuery, setSearchQuery] = useState('');

  const handleCardClick = () => {
    if (activeSearchPosition !== position) {
      setActiveSearchPosition(position);
      setSearchQuery('');
    }
  }

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
            mediaType={mediaType}
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
