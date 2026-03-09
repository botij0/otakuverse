import { Download, Twitter } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type Props = {
  listSize: number;
  shareImage: string | null;
  isShareDialogOpen: boolean;
  setIsShareDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export const TopExportDialog = ({ listSize, shareImage, isShareDialogOpen, setIsShareDialogOpen }: Props) => {

  const downloadImage = () => {
    if (!shareImage) return;
    const link = document.createElement('a');
    link.download = `my-anime-top-${listSize}.png`;
    link.href = shareImage;
    link.click();
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=Check out my custom anime Top ${listSize}!&url=${encodeURIComponent(window.location.href)}`,
      '_blank'
    );
  };

  const shareToReddit = () => {
    window.open(
      `https://www.reddit.com/submit?title=Check out my custom anime Top ${listSize}!&url=${encodeURIComponent(window.location.href)}`,
      '_blank'
    );
  };

  return (
    <Dialog
      open={isShareDialogOpen}
      onOpenChange={setIsShareDialogOpen}
    >
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Share Your Top {listSize}
          </DialogTitle>
          <DialogDescription>
            Download or share your generated top anime list image!
          </DialogDescription>
        </DialogHeader>
        <div className="relative w-full overflow-hidden rounded-lg border bg-muted/20 flex items-center justify-center p-4">
          {shareImage ? (
            <img
              src={shareImage}
              alt={`Your Top ${listSize} Anime`}
              className="w-full h-auto object-contain max-h-[60vh] rounded-md shadow-lg"
            />
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              Generating image...
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">

          <Button
            className="gap-2"
            onClick={downloadImage}
          >
            <Download className="w-4 h-4" />
            Download Image
          </Button>

          <Button
            variant="outline"
            onClick={shareToTwitter}
            className="gap-2 text-[#1DA1F2] hover:text-[#1DA1F2]/90 border-[#1DA1F2]/30 hover:bg-[#1DA1F2]/10 transition-colors"
          >
            <Twitter className="w-4 h-4 text-[#1DA1F2]" />
            Share on X
          </Button>

          <Button
            variant="outline"
            onClick={shareToReddit}
            className="gap-2 text-[#FF4500] hover:text-[#FF4500]/90 border-[#FF4500]/30 hover:bg-[#FF4500]/10 transition-colors"
          >
            <span className="font-bold text-lg leading-none mr-1 text-[#FF4500]">
              R
            </span>
            Share on Reddit
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  )
}
