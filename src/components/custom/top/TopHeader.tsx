import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

const listOptions = [5, 10, 15, 20];

type Props = {
  listSize: number;
  setListSize: Dispatch<SetStateAction<number>>;
  handleShare: () => Promise<void>;
}

export const TopHeader = ({ listSize, setListSize, handleShare }: Props) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-2 gap-4">

      <div className="flex items-center gap-3 p-2 rounded-lg border border-border/50 bg-card">
        <span className="text-sm font-medium px-2">
          Size:
        </span>

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
        <Button
          onClick={handleShare}
          variant="default"
          className="gap-2"
        >
          <Share2 className="w-4 h-4" />
          Share Top
        </Button>
      </div>

    </div>
  )
}
