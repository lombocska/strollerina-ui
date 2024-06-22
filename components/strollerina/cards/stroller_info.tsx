'use client';

import { siteConfig } from 'config/site';
import { getStrollerManualLink } from 'lib/data';
import { BrandItem, ManualDTO, StrollerInfoDTO } from 'types';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Image } from "@nextui-org/image";
import { Link } from '@nextui-org/link';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Chips from '../chips';
import { InfoTable } from '../table';

const StrollerInfo = ({ data, brand }: { data: StrollerInfoDTO; brand: BrandItem }) => {
    const { t, lang } = useTranslation('strollers');
    const router = useRouter()

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
                <Accordion className='m-1 mb-10' variant="bordered" selectionMode="multiple" defaultExpandedKeys={["stroller-info-accordion-5"]}>
                    <AccordionItem key="stroller-info-accordion-1" aria-label={t('table.titles.heigh-width-length')} title={t('table.titles.heigh-width-length')} >
                        <InfoTable columns={weight_columns} json={data}/>
                        <InfoTable columns={open_dimension_columns} json={data}/>
                        <InfoTable columns={closed_dimension_columns} json={data}/>
                    </AccordionItem>

                    <AccordionItem key="stroller-info-accordion-2" aria-label={t('table.titles.capacity')} title={t('table.titles.capacity')} >
                        <InfoTable columns={capacity_columns} json={data}/>
                    </AccordionItem>

                    <AccordionItem key="stroller-info-accordion-3" aria-label={t('table.titles.wheel')} title={t('table.titles.wheel')} >
                        <InfoTable columns={wheel_columns} json={data}/>
                    </AccordionItem>

                    <AccordionItem key="stroller-info-accordion-4" aria-label={t('table.titles.seat')} title={t('table.titles.seat')} >
                        <InfoTable columns={seat_columns} json={data}/>
                    </AccordionItem>

                    <AccordionItem key="stroller-info-accordion-5" aria-label={t('table.titles.seat')} title={t('table.titles.tags')} >
                        <Chips json={data.tags} translationNS="tags:main-card." tPrefix="chip."/>
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
                        {t('producer-link')}
                    </Link>
                </CardFooter>
            </Card>
            
        </>
    );
};

export default StrollerInfo;
