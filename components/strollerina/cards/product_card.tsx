import Card from "@/components/Card";
import { ProductCardProps } from "types";

export default function ProductCard({name, brand, img, tags, generatedId, brandValue, infoLinkPrefix, isSelected, onSelect, notHidden} : ProductCardProps) { 

  const infoLink = decodeURI(infoLinkPrefix + brandValue.toLowerCase() + "/" + generatedId);

  return (
          <Card title={name} description={brand} imgSrc={img}  href={infoLink} tags={tags} type="comparable" isSelected={isSelected} onSelect={onSelect} notHidden={notHidden}/>
  );
}
