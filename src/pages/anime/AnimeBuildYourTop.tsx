import { use } from 'react';

import animeBanner from "@/assets/anime_banner.webp";
import { TopGeneric } from '@/components/custom/top/TopGeneric';
import { BuildYourTopContext } from '@/context/BuildYourTopContext';


export const AnimeBuildYourTop = () => {
  const { animeTopList } = use(BuildYourTopContext);

  return (
    <TopGeneric
      title='Build Your Top Anime'
      description='Create a top list with the size you want and share it in social media'
      image={animeBanner}
      mediaTopList={animeTopList}
      mediaType='anime'
    />
  );
}

