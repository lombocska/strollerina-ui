'use client';

import React from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
// import {Button} from "@nextui-org/button";
import {Image} from "@nextui-org/image";
import { useRouter } from 'next/navigation'

// import useTranslation from 'next-translate/useTranslation'
// import Link from "next/link";

export default function FeatureCard({title, title2, href, img, className} : {title:any, title2:any, href:any,  img:any, className:any}) {
  const router = useRouter()

  return (
      <Card key={title} isPressable onPress={() => router.push(href)} className={className} isFooterBlurred>

        {/* <CardBody> */}
          <Image
            alt="Card background"
            height={300}
            width={300}
            className="z-0 w-full h-full object-cover "
            src={img}
          />
        {/* </CardBody> */}
          <CardFooter className="absolute z-10 bottom-1 flex-col !items-start">
            <p className="text-tiny uppercase font-bold text-left">{title}</p>
            <h4 className=" font-medium text-large text-left" >{title2}</h4>
        </CardFooter>
      </Card>
  );
}
