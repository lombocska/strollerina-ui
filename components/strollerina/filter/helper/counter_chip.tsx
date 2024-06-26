import React from "react";
import { Input } from "@nextui-org/input";
import { maxHeaderSize } from "http";
// import useTranslation from 'next-translate/useTranslation'
import { Chip } from "@nextui-org/chip";
import { Locale, i18n } from "i18n-config";
import { getDictionary } from "get-dictionary";


export default function CounterChip({title, number, dictionary} : 
  {
    title:string, 
    number:any, 
    dictionary: Awaited<ReturnType<typeof getDictionary>>[{title}]}) {
  

  return (
    
    <Chip color="warning" variant="dot" className="">
        {dictionary["common"]["count"]} : {number}
    </Chip>
  );
}
