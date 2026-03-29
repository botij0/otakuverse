
import { type RefObject } from "react";

import type { Anime } from "@/interfaces/anime";
import type { Manga } from "@/interfaces/manga";
import type { MediaTypeSimple } from "@/interfaces/media";
import { getPodiumBadgeStyles, getPodiumCardStyles } from "@/lib/utils";


type Props = {
  listSize: number;
  imageDataUrls: Record<number, string>
  shareGridRef: RefObject<HTMLDivElement | null>;
  mediaTopList: Record<number, Anime | Manga>;
  mediaType: MediaTypeSimple;
}

export const TopExportLayout = (
  {
    listSize,
    imageDataUrls,
    shareGridRef,
    mediaTopList,
    mediaType
  }: Props) => {

  const title = `My ${mediaType[0].toUpperCase() + mediaType.slice(1)} Top ${listSize}`

  const getGridCols = () => {
    // For size 5, we use 4 columns to allow perfect centering of the 5th item
    if (listSize <= 5) return "grid-cols-4";
    if (listSize <= 10) return "grid-cols-3";
    if (listSize <= 15) return "grid-cols-3";
    return "grid-cols-4";
  };

  const getItemGridClasses = (position: number) => {
    if (listSize <= 5) {
      if (position === 5) return "col-span-2 col-start-2";
      return "col-span-2";
    }
    
    if (listSize > 5 && listSize <= 10) {
      if (position === 10) return "col-start-2";
    }
    
    return "";
  };

  return (
    <div className="fixed -left-[9999px] top-0">
      <div
        ref={shareGridRef}
        className="w-[1080px] max-w-none bg-[#050816] text-white p-8 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/3"></div>

        <div className="relative z-10 flex items-center justify-between mb-8 px-4 mt-4">
          <h1 className="text-5xl font-title font-black bg-linear-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-sm">
            {title}
          </h1>
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-5 py-2 rounded-full border border-white/10">
            <span className="text-2xl font-bold text-white/90 tracking-widest">OTAKU</span>
            <span className="text-2xl font-light text-primary tracking-widest">VERSE</span>
          </div>
        </div>

        <div className={`relative z-10 grid ${getGridCols()} gap-5 md:gap-6`}>
          {Array.from({ length: listSize }, (_, i) => i + 1).map((position) => {
            const media = mediaTopList[position];
            return (
              <div
                key={position}
                className={`relative flex flex-col rounded-[1.5rem] overflow-hidden bg-linear-to-br
                  from-zinc-900/90 to-zinc-950/90 border border-white/10 shadow-xl aspect-[2/3] ${getPodiumCardStyles(position)} ${getItemGridClasses(position)}`}
              >
                {media && imageDataUrls[position] && (
                  <img
                    src={imageDataUrls[position]}
                    alt={media.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity"
                  />
                )}
                {media && imageDataUrls[position] && (
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>
                )}
                
                <div className="relative z-10 flex items-center justify-between p-4 mix-blend-normal">
                  <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full text-xl font-extrabold shadow-2xl z-10 ring-4 ring-black/20 ${getPodiumBadgeStyles(position)}`}>
                    {position}
                  </span>
                </div>
                
                <div className="relative z-10 flex-1 flex items-end p-0">
                  {media ? (
                    <div className="w-full pb-6 px-4 pt-12 flex justify-center items-center">
                      <span className="text-white text-xl sm:text-2xl font-extrabold text-center line-clamp-3 block text-pretty drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                        {media.title}
                      </span>
                    </div>
                  ) : (
                    <div className="w-full h-full flex justify-center items-center pb-6">
                      <p className="text-2xl text-white/30 italic font-bold">
                        Empty
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative z-10 mt-10 flex justify-between items-center px-6 mb-2 pt-6 border-t border-white/10">
          <p className="text-2xl text-white/50 font-medium">
            Create your own top at
          </p>
          <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/5">
            <p className="text-2xl font-bold bg-linear-to-r from-white to-white/70 bg-clip-text text-transparent tracking-wide">
              otakuverse.botij0tech.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
