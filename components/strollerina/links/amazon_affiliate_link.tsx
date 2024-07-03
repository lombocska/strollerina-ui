'use client';

import { Link } from '@nextui-org/link';
import { getDictionary } from 'get-dictionary';
import { getCarseatAmazonAffiliateLink, getStrollerAmazonAffiliateLink } from 'lib/data';
import { useEffect, useState } from 'react';
import { AffiliateDTO } from 'types';

const AmazonLink = ({ dictionary, type, id }: { 
    dictionary: Awaited<ReturnType<typeof getDictionary>>["strollers"];
    type: string;
    id: number;
}) => {
    
    const [amazonLink, setAmazonLink] = useState<AffiliateDTO | null>(null);

    useEffect(() => {
        if (type === "stroller") {
            getStrollerAmazonAffiliateLink(id).then(setAmazonLink);       
        } else {
            getCarseatAmazonAffiliateLink(id).then(setAmazonLink);
        }
    }, []); 

    return (
        <>
            {amazonLink &&
                <Link
                    target="_blank" rel="noopener"
                    isExternal
                    showAnchorIcon
                    href={amazonLink.link}
                >
                    {dictionary["common"].buy}
                </Link>
            }
        </>
    );
};

export default AmazonLink;
