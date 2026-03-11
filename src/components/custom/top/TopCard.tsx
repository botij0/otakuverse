import { useState, use } from 'react';
import { Plus } from 'lucide-react';

import { TopCardSearch } from './TopCardSearch';
import { Card, CardContent } from '@/components/ui/card';
import { BuildYourTopContext } from '@/context/BuildYourTopContext';

type Props = {
  position: number;
}

export const TopCard = ({ position }: Props) => {
  const [activeSearchPosition, setActiveSearchPosition] = useState<number | null>(null);
  const { topList, addAnimeToTopList } = use(BuildYourTopContext);

  const [searchQuery, setSearchQuery] = useState('');

  const handleCardClick = () => {
    if (activeSearchPosition !== position) {
      setActiveSearchPosition(position);
      setSearchQuery('');
    }
  }

  const getPodiumCardStyles = (pos: number) => {
    switch (pos) {
      case 1: return 'border border-yellow-500 shadow-md shadow-yellow-500/20';
      case 2: return 'border border-slate-400 shadow-md shadow-slate-400/20';
      case 3: return 'border border-amber-600 shadow-md shadow-amber-600/20';
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        return 'border border-stone-500 shadow-md shadow-stone-500/20';
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
        return 'border border-stone-600 shadow-md shadow-stone-600/20';
      default:
        return 'border border-stone-700 shadow-md shadow-stone-700/20';
    }
  };

  const getPodiumBadgeStyles = (pos: number) => {
    switch (pos) {
      case 1: return 'bg-gradient-to-br from-yellow-500 to-yellow-700 text-white shadow-yellow-500/50 ring-2 ring-yellow-400';
      case 2: return 'bg-gradient-to-br from-slate-400 to-slate-600 text-white shadow-slate-400/50 ring-2 ring-slate-300';
      case 3: return 'bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-amber-700/50 ring-2 ring-amber-500';
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        return 'bg-gradient-to-br from-stone-400 to-stone-600 text-stone-200 shadow-stone-500/50 ring-2 ring-stone-400';
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
        return 'bg-gradient-to-br from-stone-500 to-stone-700 text-stone-200 shadow-stone-600/50 ring-2 ring-stone-500';
      default:
        return 'bg-gradient-to-br from-stone-600 to-stone-800 text-stone-300 shadow-stone-700/50 ring-2 ring-stone-600';
    }
  };

  return (
    <Card
      key={position}
      onClick={handleCardClick}
      className={
        `group relative overflow-hidden cursor-pointer transition-all
        hover:scale-105 hover:shadow-lg dark:hover:shadow-primary/20
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

      <CardContent className="flex flex-col items-center justify-center p-4 min-h-[220px] sm:min-h-[280px]">
        {activeSearchPosition === position ? (
          <TopCardSearch
            position={position}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setActiveSearchPosition={setActiveSearchPosition}
            addAnimeToTopList={addAnimeToTopList}
          />
        ) : topList[position] ? (
          <div className="absolute inset-0 z-0">
            <img
              src={topList[position].images.webp.image_url}
              alt={topList[position].title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <div className={`absolute bottom-0 left-0 ${getPodiumBadgeStyles(position)} right-0 backdrop-blur-md py-2 h-12 flex justify-center items-center `}>
              <span className="text-white text-sm sm:text-md font-semibold text-center line-clamp-2 block text-pretty">
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
