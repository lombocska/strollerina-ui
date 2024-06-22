import React from "react";
import { Input } from "@nextui-org/input";
import { maxHeaderSize } from "http";
import useTranslation from 'next-translate/useTranslation'
import { Chip } from "@nextui-org/chip";

export default function CounterChip({title, number} : {title:any, number:any}) {

  const { t } = useTranslation('common');
  const text = t(title, { count: number });

  return (
    
    <Chip color="warning" variant="dot" className="">
      {text}
    </Chip>
  );
}
