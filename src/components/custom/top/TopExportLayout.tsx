
import animeBanner from "@/assets/anime_banner.webp";
import { BuildYourTopContext } from "@/context/BuildYourTopContext";
import { use, type RefObject } from "react";


type Props = {
  listSize: number;
  imageDataUrls: Record<number, string>
  shareGridRef: RefObject<HTMLDivElement | null>
}


export const TopExportLayout = ({ listSize, imageDataUrls, shareGridRef }: Props) => {

  const { topList } = use(BuildYourTopContext);

  return (
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
                className="relative flex flex-col rounded-xl overflow-hidden bg-linear-to-br from-zinc-900/80 to-zinc-800/80 border border-white/5 min-h-[200px]"
              >
                {anime && imageDataUrls[position] && (
                  <img
                    src={imageDataUrls[position]}
                    alt={anime.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                  />
                )}
                <div className="relative z-10 flex items-center justify-between p-3">
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
                <div className="relative z-10 flex-1 flex items-end p-3">
                  {anime ? (
                    <p className="text-xs font-semibold leading-snug line-clamp-3 bg-black/60 px-2 py-1 rounded">
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
  )
}
