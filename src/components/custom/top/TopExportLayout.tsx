
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

  return (
    <div className="fixed -left-[9999px] top-0">
      <div
        ref={shareGridRef}
        className="w-[1200px] max-w-none bg-[#050816] text-white rounded-2xl p-4 shadow-2xl border border-white/5"
      >
        <div className="flex items-center justify-between mb-6 px-2">
          <h1 className="text-3xl font-title bg-linear-to-r from-primary to-accent bg-clip-text text-transparent mt-1">
            {title}
          </h1>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: listSize }, (_, i) => i + 1).map((position) => {
            const media = mediaTopList[position];
            return (
              <div
                key={position}
                className={`relative flex flex-col rounded-xl overflow-hidden bg-linear-to-br
                  from-zinc-900/80 to-zinc-800/80 border min-h-[350px] shadow-sm ${getPodiumCardStyles(position)}`}
              >
                {media && imageDataUrls[position] && (
                  <img
                    src={imageDataUrls[position]}
                    alt={media.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="relative z-10 flex items-center justify-between p-3">
                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold shadow-md z-10 ${getPodiumBadgeStyles(position)}`}>
                    {position}
                  </span>
                </div>
                <div className="relative z-10 flex-1 flex items-end p-3">
                  {media ? (
                    <div className={`absolute bottom-0 left-0 ${getPodiumBadgeStyles(position)} right-0 backdrop-blur-md py-2 h-12 flex justify-center items-center `}>
                      <span className="text-white text-sm sm:text-md font-semibold text-center line-clamp-2 block text-pretty">
                        {media.title}
                      </span>
                    </div>
                  ) : (
                    <p className="text-[11px] text-white/40 italic">
                      Empty
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
