import { use } from 'react'

import mangaBanner from "@/assets/manga_banner.webp";

import { TopGeneric } from '@/components/custom/top/TopGeneric';
import { BuildYourTopContext } from '@/context/BuildYourTopContext';

export const MangaBuildYourTop = () => {
  const { mangaTopList } = use(BuildYourTopContext);

  return (
    <TopGeneric
      title='Build Your Top Manga'
      description='Create a top list with the size you want and share it in social media'
      image={mangaBanner}
      mediaTopList={mangaTopList}
      mediaType='manga'
    />
  );
}
