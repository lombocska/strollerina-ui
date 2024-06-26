// components/SidePanel.js
'use client';

import { getCarseatManualLink } from 'lib/data';
import { BrandItem, CarseatCardDTO, ManualDTO } from 'types';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip';
import { Divider } from '@nextui-org/divider';
import { Image } from "@nextui-org/image";
import { Link } from '@nextui-org/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Chips from '../chips';
import { getDictionary } from 'get-dictionary';

const CarseatInfo = ({ data, brand, dictionary }: 
    { 
        data: CarseatCardDTO; 
        brand: BrandItem;
        dictionary: Awaited<ReturnType<typeof getDictionary>>["carseats"]
    }) => {
    

    const [manual, setManual] = useState<ManualDTO | null>(null);

    useEffect(() => {
        getCarseatManualLink(data.id).then(setManual);        
    }, []); 

    return (
        <>
            {/* <h2 className="text-xl font-bold mb-4">{t('common:info')}</h2> */}
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
                            {/* <p className="text-small text-default-500">nextui.org</p> */}
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
                <Accordion className='m-1 mb-10' variant="bordered" selectionMode="multiple" defaultExpandedKeys={["carseat-info-accordion-5"]}>
                    <AccordionItem key="carseat-info-accordion-1" 
                            aria-label={dictionary["table"].titles['default-info']}
                            title={dictionary["table"].titles['default-info']} >

                        <p>
                            {dictionary.table.titles.weight}: {data.weight} [kg]
                        </p>

                        <p>
                            {dictionary.table.titles.age}: {data.minAge} - {data.maxAge} [month]
                        </p>

                        <p>
                            {dictionary.table.titles['product-weight']}: {data.minWeight} - {data.maxWeight} [kg]
                        </p>

                        <p>
                            {dictionary.table.titles['kid-height']}: {data.minHeight} - {data.maxHeight} [cm]
                        </p>


                        {data.rearFacing &&
                            <Chip key={'data.rearFacing'} className="m-1" variant="bordered">
                                 {dictionary.tags['main-card'].chip.rearFacing}
                            </Chip>
                        }

                        {data.forwardFacing &&
                            <Chip key={'data.forwardFacing'} className="m-1" variant="bordered">
                                 {dictionary.tags['main-card'].chip.forwardFacing}
                            </Chip>
                        }

                        {data.sideProtection &&
                            <Chip key={'data.sideProtection'} className="m-1" variant="bordered">
                                 {dictionary.tags['main-card'].chip.sideProtection}
                            </Chip>
                        }   

                        {data.rotating &&
                            <Chip key={'data.rotating'} className="m-1" variant="bordered">
                                 {dictionary.tags['main-card'].chip.rotating}
                            </Chip>
                        }       
                    </AccordionItem>

                    <AccordionItem key="carseat-info-accordion-2" 
                            aria-label={dictionary["table"].titles.adac}
                            title={dictionary["table"].titles.adac} >
                        {data.adacInfo && data.adacInfo.length > 0 &&  data.adacInfo[0].adacLink !== "0" && data.adacInfo.map((adac, index) => (
                                <div key={"adac-" + index}>
                                    <p className='uppercase mb-3'>
                                        {dictionary.filters.adac.title} {index+1}
                                        </p>
                                    <p>
                                        {dictionary.filters.adac.installation} {adac.installation}
                                    </p>
                                    <p>
                                        {dictionary.filters.adac.verdict}: {adac.adac} [{adac.adacTestedYear}]
                                    </p>
                                    <p>
                                        {dictionary["table"].titles['price-from']}: {adac.priceFrom} EUR
                                    </p>
                                        <Link

                                           target="_blank" rel="noopener"
                                            isExternal
                                            showAnchorIcon
                                            className="flex items-center gap-1 text-current"
                                            href={adac.adacLink}
                                            title="ADAC Link"
                                        >   
                                            {dictionary.filters.adac.link}
                                        </Link>
                                    <Divider className='mb-3'/>
                                </div>
                        ))}
                        {!data.adacInfo  &&
                                <p>
                                    {dictionary.filters.adac['not-adac-tested']}
                                </p>
                        } 
                        
                        
                    </AccordionItem>

                    <AccordionItem key="carseat-info-accordion-5" 
                            aria-label={dictionary["table"].titles.seat}
                            title={dictionary["table"].titles.seat} >
                        <Chips json={data.tags} dictionary={dictionary["tags"]['main-card'].chip}/>
                    </AccordionItem>
                </Accordion>

                   
                </CardBody>
                <Divider/>
                {/* <CardFooter>
                    <Link
                    isExternal
                    showAnchorIcon
                    href={data.link}
                    >
                        {t('producer-link')}
                    </Link>
                </CardFooter> */}
            </Card>
            
        </>
    );
};

export default CarseatInfo;
