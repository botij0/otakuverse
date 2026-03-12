
import { use, type RefObject } from "react";

import { BuildYourTopContext } from "@/context/BuildYourTopContext";


type Props = {
  listSize: number;
  imageDataUrls: Record<number, string>
  shareGridRef: RefObject<HTMLDivElement | null>
}

export const TopExportLayout = ({ listSize, imageDataUrls, shareGridRef }: Props) => {

  const { topList } = use(BuildYourTopContext);

  const getPodiumCardStyles = (pos: number) => {
    if (pos === 1) return 'border-yellow-500 shadow-yellow-500/20';
    if (pos === 2) return 'border-slate-400 shadow-slate-400/20';
    if (pos === 3) return 'border-amber-600 shadow-amber-600/20';
    if (pos >= 4 && pos <= 10) return 'border-stone-500 shadow-stone-500/20';
    if (pos >= 11 && pos <= 15) return 'border-stone-600 shadow-stone-600/20';
    return 'border-white/5';
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
    <div className="fixed -left-[9999px] top-0">
      <div
        ref={shareGridRef}
        className="w-[1200px] max-w-none bg-[#050816] text-white rounded-2xl p-4 shadow-2xl border border-white/5"
      >
        <div className="flex items-center justify-between mb-6 px-2">
          <h1 className="text-3xl font-title bg-linear-to-r from-primary to-accent bg-clip-text text-transparent mt-1">
            My Anime Top {listSize}
          </h1>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: listSize }, (_, i) => i + 1).map((position) => {
            const anime = topList[position];
            return (
              <div
                key={position}
                className={`relative flex flex-col rounded-xl overflow-hidden bg-linear-to-br
                  from-zinc-900/80 to-zinc-800/80 border min-h-[350px] shadow-sm ${getPodiumCardStyles(position)}`}
              >
                {anime && imageDataUrls[position] && (
                  <img
                    src={imageDataUrls[position]}
                    alt={anime.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="relative z-10 flex items-center justify-between p-3">
                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold shadow-md z-10 ${getPodiumBadgeStyles(position)}`}>
                    {position}
                  </span>
                </div>
                <div className="relative z-10 flex-1 flex items-end p-3">
                  {anime ? (
                    <div className={`absolute bottom-0 left-0 ${getPodiumBadgeStyles(position)} right-0 backdrop-blur-md py-2 h-12 flex justify-center items-center `}>
                      <span className="text-white text-sm sm:text-md font-semibold text-center line-clamp-2 block text-pretty">
                        {anime.title}
                      </span>
                    </div>
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

        <p className="mt-6 text-[10px] text-white/50 text-right px-2">
          Built with otakuverse.botij0tech.com
        </p>
      </div>
    </div>
  )
}
