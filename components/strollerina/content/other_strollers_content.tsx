'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/strollerina/cards/product_card';
import { getDictionary } from 'get-dictionary';
import { useCurrency } from 'lib/context/currency_context';
import { getStrollersByBrand } from 'lib/data';
import { StrollerInfoDTO } from 'types';

export default function OtherStrollersContent({ stroller, dictionary }:
    {
        stroller: StrollerInfoDTO,
        dictionary: Awaited<ReturnType<typeof getDictionary>>["strollers"],
    }) {

    const [strollersByBrand, setStrollersByBrand] = useState<StrollerInfoDTO[]>([]);
    const { state } = useCurrency();
    const { currency, multiplicator } = state;

    useEffect(() => {
        async function fetchStrollers() {
            const data = await getStrollersByBrand(stroller.brandValue);
            setStrollersByBrand(data);
        }
        fetchStrollers();
    }, [stroller.brandValue]);

    return (
        <section className="mt-10">
            <h2 className="text-2xl from-black to-stone-500 bg-clip-text text-strollerina_green-100 mt-10">
                {dictionary.common['other']} {stroller.brand} {dictionary.common['strollers']}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {strollersByBrand.map((item) => (
                    <ProductCard
                        notHidden={false}
                        key={'stroller-' + item.id}
                        name={item.name}
                        brand={item.brand}
                        brandValue={item.brandValue}
                        img={item.img}
                        tags={item.priceFrom != null ? [Math.round(item.priceFrom * multiplicator) + "+ " + currency] : []}
                        generatedId={item.generatedId}
                        infoLinkPrefix={'/strollers/'}
                    />
                ))}
            </div>
        </section>
    );
}
