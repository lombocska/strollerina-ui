// components/SidePanel.js
'use client';

import { getCarseatManualLink } from '@/lib/data';
import { BrandItem, CarseatCardDTO, ManualDTO } from '@/types';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip';
import { Divider } from '@nextui-org/divider';
import { Image } from "@nextui-org/image";
import { Link } from '@nextui-org/link';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Chips from '../chips';

const CarseatInfo = ({ data, brand }: { data: CarseatCardDTO; brand: BrandItem }) => {
    const { t } = useTranslation('carseats');
    const router = useRouter()

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
                            {t('manual-link')}
                        </Link>
                    }
                </CardHeader>

                <Divider/>
                <CardBody>
                <Accordion className='m-1 mb-10' variant="bordered" selectionMode="multiple" defaultExpandedKeys={["carseat-info-accordion-5"]}>
                    <AccordionItem key="carseat-info-accordion-1" aria-label={t('table.titles.default-info')} title={t('table.titles.default-info')} >

                        <p>
                            {t('table.titles.weight')}: {data.weight} [kg]
                        </p>

                        <p>
                            {t('table.titles.age')}: {data.minAge} - {data.maxAge} [month]
                        </p>

                        <p>
                            {t('table.titles.product-weight')}: {data.minWeight} - {data.maxWeight} [kg]
                        </p>

                        <p>
                            {t('table.titles.kid-height')}: {data.minHeight} - {data.maxHeight} [cm]
                        </p>


                        {data.rearFacing &&
                            <Chip key={'data.rearFacing'} className="m-1" variant="bordered">
                                 {t('tags:main-card.chip.rearFacing')}
                            </Chip>
                        }

                        {data.forwardFacing &&
                            <Chip key={'data.forwardFacing'} className="m-1" variant="bordered">
                                 {t('tags:main-card.chip.forwardFacing')}
                            </Chip>
                        }

                        {data.sideProtection &&
                            <Chip key={'data.sideProtection'} className="m-1" variant="bordered">
                                 {t('tags:main-card.chip.sideProtection')}
                            </Chip>
                        }   

                        {data.rotating &&
                            <Chip key={'data.rotating'} className="m-1" variant="bordered">
                                 {t('tags:main-card.chip.rotating')}
                            </Chip>
                        }       
                    </AccordionItem>

                    <AccordionItem key="carseat-info-accordion-2" aria-label={t('table.titles.adac')} title={t('table.titles.adac')} >
                        {data.adacInfo && data.adacInfo.length > 0 &&  data.adacInfo[0].adacLink !== "0" && data.adacInfo.map((adac, index) => (
                                <div key={"adac-" + index}>
                                    {/* <Chip key={'adac.installation' + "-"  + index} className="m-1" variant="bordered"> */}
                                    <p className='uppercase mb-3'>
                                        {t('filters.adac.title')} {index+1}
                                        </p>
                                    <p>
                                        {t('filters.adac.installation')} {adac.installation}
                                    </p>
                                    {/* </Chip> */}
                                    {/* <Chip key={'adac.adacTestedYear' + "-"  + index} className="m-1" variant="bordered"> */}
                                    <p>
                                        {t('filters.adac.verdict')}: {adac.adac} [{adac.adacTestedYear}]
                                    </p>
                                    {/* </Chip> */}
                                    {/* <Chip key={'adac.priceFrom' + "-"  + index} className="m-1" variant="bordered"> */}
                                    {/* {t('comparing-grid.price-from')}: {adac.priceFrom * currency.value} [{currency.name}] */}
                                    <p>
                                        {t('table.titles.price-from')}: {adac.priceFrom} EUR
                                    </p>
                                    {/* </Chip> */}
                                    {/* <Chip key={'adac.link' + "-"  + index} className="m-1" variant="bordered"> */}
                                        <Link

                                           target="_blank" rel="noopener"
                                            isExternal
                                            showAnchorIcon
                                            className="flex items-center gap-1 text-current"
                                            href={adac.adacLink}
                                            title="ADAC Link"
                                        >   
                                            {t('filters.adac.link')}
                                        </Link>
                                    {/* </Chip> */}
                                    <Divider className='mb-3'/>
                                </div>
                        ))}
                        {!data.adacInfo  &&
                                <p>
                                    {t('adac.not-adac-tested')}
                                </p>
                        } 
                        
                        
                    </AccordionItem>

                    <AccordionItem key="carseat-info-accordion-5" aria-label={t('table.titles.seat')} title={t('table.titles.tags')} >
                        <Chips json={data.tags} translationNS="tags:main-card." tPrefix="chip."/>
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
