import { useState } from 'react'
import { Card, CardContent } from '../ui/card';
import { Plus } from 'lucide-react';
import type { Anime } from '@/interfaces/anime';
import { TopCardSearch } from './TopCardSearch';

type Props = {
  position: number;
}

export const TopCard = ({ position }: Props) => {
  const [activeSearchPosition, setActiveSearchPosition] = useState<number | null>(null);
  const [topList, setTopList] = useState<Record<number, Anime>>({});
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
        hover:scale-105 hover:shadow-lg dark:hover:shadow-primary/20
        ${activeSearchPosition === position ? 'ring-2 ring-accent scale-105 overflow-visible z-20' : ''}`
      }
    >
      <div
        className={
          `absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full font-bold text-primary-foreground
            shadow-sm z-10 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300
                ${activeSearchPosition === position ? 'bg-accent text-accent-foreground' : 'bg-primary'}`
        }
      >
        {position}
      </div>

      <CardContent className="flex flex-col items-center justify-center p-4 min-h-[220px] sm:min-h-[280px]">
        {activeSearchPosition === position ? (
          <TopCardSearch
            position={position}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setActiveSearchPosition={setActiveSearchPosition}
            setTopList={setTopList}
          />
        ) : topList[position] ? (
          <div className="absolute inset-0 z-0">
            <img
              src={topList[position].images.webp.image_url}
              alt={topList[position].title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-white text-xs sm:text-sm font-semibold text-center line-clamp-2 block">
                {topList[position].title}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:text-accent transition-all duration-300">
            <Plus className="h-10 w-10 mb-3" />
            <span className="font-medium">
              Add Anime
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
