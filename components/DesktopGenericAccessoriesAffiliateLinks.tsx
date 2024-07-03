'use client'

import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import { getStrollerAmazonAccessoriesAffiliateLink } from 'lib/data'
import { useEffect, useState } from 'react'
import { AffiliateDTO } from 'types'

const GenericAccessoriesAffiliateLinks = () => {

    const [amazonLinks, setAmazonLinks] = useState<AffiliateDTO[] | null>(null);

    useEffect(() => {
            getStrollerAmazonAccessoriesAffiliateLink(0).then(setAmazonLinks);
    }, []);
    
    return (
        <>
            <ul style={{ marginRight: '1.5rem' }} className='mt-10  items-center justify-center space-y-2'>
                {amazonLinks?.slice(0, 3).map((item, index) => (
                    <li key={index} className="w-full md:w-1/3">
                        <a 
                            key={"accessory" + index} 
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block"
                        >
                            <Card 
                                shadow="sm" 
                                isPressable 
                                className="h-full"
                                onPress={() => window.open(item.link, '_blank')}
                            >
                                <CardBody className="p-0 bg-transparent">
                                    <Image
                                        shadow="sm"
                                        radius="lg"
                                        width="100%"
                                        alt={item.name}
                                        className="w-full object-cover h-[140px]"
                                        src={item.img}
                                    />
                                </CardBody>
                                <CardFooter className="text-small justify-between">
                                    <p className="text-default-500 whitespace-normal break-words">{item.name}</p>
                                </CardFooter>
                            </Card>
                        </a>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default GenericAccessoriesAffiliateLinks
