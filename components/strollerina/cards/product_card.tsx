import { useCurrency } from "lib/context/currency_context";
import { ProductCardProps } from "types";
// import { Button } from "@nextui-org/button";
// import { Button } from '../shadcn/button'
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { useRouter } from "next/navigation";
// import { Button } from "@nextui-org/button";
// import { Button } from "@nextui-org/react";
import { Button } from "@/components/shadcn/button";

export default function ProductCard({name, brand, img, price, generatedId, brandValue, infoLinkPrefix} : ProductCardProps) { 
  const router = useRouter();

  const infoLink = decodeURI(infoLinkPrefix + brandValue.toLowerCase() + "/" + generatedId);
  const { state } = useCurrency();
  const convertedPrice = price ? price * state.multiplicator : "";

  return (
    <Card isFooterBlurred className="" key={generatedId}>
      {price && convertedPrice !== 0 &&
        <CardHeader className="absolute z-10 top-1 flex-col items-end">
          <h4 className="font-medium  text-tiny  uppercase">{convertedPrice}</h4>
        </CardHeader>
      }
      <CardBody>
        <Image
          key={'img-'+ generatedId}
          alt="Card example background"
          className="z-0 w-full h-full scale-110 -translate-y-6 object-cover"
          src={img}
          loading="lazy" 
        />
      </CardBody>
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between" key={'footer-' + generatedId}>
        <div>
          <p className="text-black text-tiny uppercase font-bold">{brand}</p>
          <p className="ttext-black font-medium text-2xl">{name}</p>
        </div>
        <Button className="uppercase  " color="primary" key={'button-' + generatedId} 
                onClick={() => router.push(infoLink)}>
          Info
        </Button>
      </CardFooter>
    </Card>
  );
}
