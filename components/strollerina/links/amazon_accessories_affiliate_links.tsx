'use client';

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { getStrollerAmazonAccessoriesAffiliateLink } from 'lib/data';
import { useEffect, useState } from 'react';
import { AffiliateDTO } from 'types';

const AmazonAccessoriesLinks = ({type, id }: { 
    text: string;
    type: string;
    id: number;
}) => {
    const [amazonLinks, setAmazonLinks] = useState<AffiliateDTO[] | null>(null);

    useEffect(() => {
            getStrollerAmazonAccessoriesAffiliateLink(id).then(setAmazonLinks);
    }, [id, type]);

    return (
        <div className="flex flex-wrap gap-4">
            {amazonLinks && amazonLinks.length > 0 ? (
                amazonLinks.map((accessory, index) => (
                    <a 
                        key={"accessory" + index} 
                        href={accessory.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-40"
                    >
                        <Card 
                            shadow="sm" 
                            isPressable 
                            onPress={() => window.open(accessory.link, '_blank')}
                        >
                            <CardBody className="overflow-visible p-0 bg-transparent">
                                <Image
                                    shadow="sm"
                                    radius="lg"
                                    width="100%"
                                    alt={accessory.name}
                                    className="w-full object-cover h-[140px]"
                                    src={accessory.img}
                                />
                            </CardBody>
                            <CardFooter className="text-small justify-between">
                                <p className="text-default-500">{accessory.name}</p>
                            </CardFooter>
                        </Card>
                    </a>
                ))
            ) : (
                <p>No accessories available.</p>
            )}
        </div>
    );
};

export default AmazonAccessoriesLinks;
