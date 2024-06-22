import { Image } from "@nextui-org/image";
import useTranslation from 'next-translate/useTranslation';
import FeatureCard from "../cards/feature_card";

export default function FeatureCards() {

  const { t } = useTranslation('home');



  const features = [
    {
      title: t('stroller-title'),
      title2:  t('stroller-title-2'),
      img: "https://imagedelivery.net/Y7hTskBCKV5kRi-34nHOOg/6aa0ce50-61fe-4a36-0b76-d830f549b600/public",
      large: true,
      description: t('stroller-subtitle'),
      demo: (
        <div className="flex items-center justify-center space-x-20">
          <Image alt="stroller image" src="https://imagedelivery.net/Y7hTskBCKV5kRi-34nHOOg/6aa0ce50-61fe-4a36-0b76-d830f549b600/public" width={250} height={250} />
        </div>
      ),
      href: "/strollers"
    },
    {
      title: t('carseat-title'),
      title2:  t('carseat-title-2'),
      img: "https://imagedelivery.net/Y7hTskBCKV5kRi-34nHOOg/b8fb37c2-f6c7-4797-2995-74a5fd79e100/public",
      description: t('carseat-subtitle'),
      demo: (
        <div className="flex items-center justify-center space-x-20">
          <Image alt="stroller image" src="https://imagedelivery.net/Y7hTskBCKV5kRi-34nHOOg/b8fb37c2-f6c7-4797-2995-74a5fd79e100/public" width={250} height={250} />
        </div>
      ),
      href: "/carseats"
    },
    {
      title: t('reviews-title'),
      title2:  t('reviews-title-2'),
      img: "https://imagedelivery.net/Y7hTskBCKV5kRi-34nHOOg/1afe5b73-48ef-4fa8-947b-c45f0c442000/public",
      
      description: t('reviews-subtitle'),
      demo: (
        <div className="flex items-center justify-center space-x-20">
          <Image alt="stroller image" src="https://imagedelivery.net/Y7hTskBCKV5kRi-34nHOOg/1afe5b73-48ef-4fa8-947b-c45f0c442000/public" width={250} height={250} />
        </div>
      ),
      href: "/reviews"
    },
    {
      title: t('manuals-title'),
      title2:  t('manuals-title-2'),
      img: "https://imagedelivery.net/Y7hTskBCKV5kRi-34nHOOg/9557d2af-8469-4e8e-8b78-19bdb67d2e00/public",
      
      description: t('manuals-subtitle'),
      demo: (
        <div className="flex items-center justify-center space-x-20">
          <Image alt="stroller image" src="https://imagedelivery.net/Y7hTskBCKV5kRi-34nHOOg/9557d2af-8469-4e8e-8b78-19bdb67d2e00/public" width={250} height={250} />
        </div>
      ),
      href: "/manuals"
    },
    {
      title: t('about-title'),
      title2:  t('about-title-2'),
      img: "https://imagedelivery.net/Y7hTskBCKV5kRi-34nHOOg/bb4bbc37-dbea-4a40-0bcd-0899b3046d00/public",
      
      description: t('about-subtitle'),
      demo: (
        <div className="flex items-center justify-center space-x-20">
          <Image alt="stroller image" src="https://imagedelivery.net/Y7hTskBCKV5kRi-34nHOOg/bb4bbc37-dbea-4a40-0bcd-0899b3046d00/public" width={250} height={250} />
        </div>
      ),
      href: "/about"
    }
    
  ];

  return (
    <div className=" gap-2 grid grid-cols-12 grid-rows-2 px-8">
      {features.slice(0,3).map(({ title, title2, description, demo, large, href, img }) => (

            <FeatureCard 
              href={href}
              title={title} 
              title2={title2}  
              img={img} 
              className={"col-span-12 sm:col-span-4 h-[300px] items-center justify-center"}/>
            
        ))}
   

      <FeatureCard 
          href={features[3].href}
          title={features[3].title} 
          title2={features[3].title2}  
          img={features[3].img} 
          className={"w-full h-[300px] col-span-12 sm:col-span-5  items-center justify-center"}/>
   

      <FeatureCard 
          href={features[4].href}
          title={features[4].title} 
          title2={features[4].title2}  
          img={features[4].img} 
          className={"w-full h-[300px] col-span-12 sm:col-span-7  items-center justify-center"}/>
  </div>
  );
}
