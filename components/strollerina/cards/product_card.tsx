import { useCurrency } from "lib/context/currency_context";
import { ProductCardProps } from "types";
import Card from "@/components/Card";

export default function ProductCard({name, brand, img, price, generatedId, brandValue, infoLinkPrefix} : ProductCardProps) { 

  const infoLink = decodeURI(infoLinkPrefix + brandValue.toLowerCase() + "/" + generatedId);
  const { state } = useCurrency();
  const { currency, multiplicator } = state;
  const priceFrom   = Math.round(price * multiplicator) + "+ " + currency;

  return (
          <Card title={name} description={brand} imgSrc={img}  href={infoLink} tags={price != null ? [priceFrom] : []}/>
  );
}
