'use client';

import { siteConfig } from 'config/site';
import { getStrollerManualLink } from 'lib/data';
import { BrandItem, ManualDTO, StrollerInfoDTO } from 'types';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Image } from "@nextui-org/image";
import { Link } from '@nextui-org/link';
import { useEffect, useState } from 'react';
import Chips from '../chips';
import { InfoTable } from '../table';
import { getDictionary } from 'get-dictionary';

const StrollerInfo = ({ data, brand, dictionary }: { 
    data: StrollerInfoDTO; 
    brand: BrandItem;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["strollers"]
}) => {
    

    const open_dimension_columns = siteConfig.stroller_info_open_dimensions_columns;
    const closed_dimension_columns = siteConfig.stroller_info_closed_dimensions_columns;
    const capacity_columns = siteConfig.stroller_info_capacity_columns;
    const weight_columns = siteConfig.stroller_info_weight_columns;
    const wheel_columns = siteConfig.stroller_info_wheel_columns;
    const seat_columns = siteConfig.stroller_info_seat_columns;

    const [manual, setManual] = useState<ManualDTO | null>(null);

    useEffect(() => {
        getStrollerManualLink(data.id).then(setManual);        
    }, []); 

    return (
        <>
            <Card className="">
                <CardHeader className="flex gap-3 justify-between">
                    <div className="flex  gap-3">
                        <Image
                            alt="brand logo"
                            height={100}
                            width={100}
                            radius="sm"
                            src={brand.img}

                        />
                        <div className="flex flex-col">
                            <p className="text-md">{data.name}</p>
                        </div>
                    </div>
                    {manual &&
                        <Link
                            target="_blank" rel="noopener"
                            isExternal
                            showAnchorIcon
                            href={manual.manualLink}
                        >
                            {dictionary["manual-link"]}
                        </Link>
                    }
                </CardHeader>

                <Divider/>
                <CardBody>
                <Accordion className='m-1 mb-10' variant="bordered" selectionMode="multiple" defaultExpandedKeys={["stroller-info-accordion-5"]}>
                    <AccordionItem 
                            key="stroller-info-accordion-1" 
                            aria-label={dictionary["table"]["titles"]["heigh-width-length"]} 
                            title={dictionary["table"]["titles"]["heigh-width-length"]} >

                        <InfoTable columns={weight_columns} json={data} dictionary={dictionary["table"]["headers"]}/>
                        <InfoTable columns={open_dimension_columns} json={data} dictionary={dictionary["table"]["headers"]}/>
                        <InfoTable columns={closed_dimension_columns} json={data} dictionary={dictionary["table"]["headers"]}/>
                    </AccordionItem>

                    <AccordionItem 
                            key="stroller-info-accordion-2" 
                            aria-label={dictionary["table"]["titles"]["capacity"]} 
                            title={dictionary["table"]["titles"]["capacity"]} >
                        <InfoTable columns={capacity_columns} json={data} dictionary={dictionary["table"]["headers"]}/>
                    </AccordionItem>

                    <AccordionItem 
                            key="stroller-info-accordion-3" 
                            aria-label={dictionary["table"]["titles"]["wheel"]} 
                            title={dictionary["table"]["titles"]["wheel"]} >
                        <InfoTable columns={wheel_columns} json={data} dictionary={dictionary["table"]["headers"]}/>
                    </AccordionItem>

                    <AccordionItem key="stroller-info-accordion-4"  
                            aria-label={dictionary["table"]["titles"]["seat"]} 
                            title={dictionary["table"]["titles"]["seat"]} >
                        <InfoTable columns={seat_columns} json={data} dictionary={dictionary["table"]["headers"]}/>
                    </AccordionItem>

                    <AccordionItem key="stroller-info-accordion-5"   
                            aria-label={dictionary["table"]["titles"]["tags"]} 
                            title={dictionary["table"]["titles"]["tags"]} >
                        <Chips json={data.tags} dictionary={dictionary["tags"]["main-card"]["chip"]}/>
                    </AccordionItem>
                </Accordion>

                   
                </CardBody>
                <Divider/>
                <CardFooter>
                    <Link
                    isExternal
                    showAnchorIcon
                    href={data.link}
                    >
                        {dictionary["producer-link"]}
                    </Link>
                </CardFooter>
            </Card>
            
        </>
    );
};

export default StrollerInfo;
