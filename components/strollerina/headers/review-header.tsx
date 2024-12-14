'use client';

import React from 'react';
import { Link, Button } from '@nextui-org/react';

export default function ReviewHeaderContent({ dictionary, headerLabelKey, buttonLabelKeys }) {
    return (
        <>
        <header className="relative mb-6 h-60 sm:h-80 xl:h-96 rounded-3xl overflow-hidden">
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat register-setup-header rounded-3xl"
                aria-hidden="true"
            />
            <div className="relative z-10 flex h-full flex-col items-center justify-center p-4 text-center text-white">
                <h1 className="text-2xl font-bold sm:text-4xl xl:text-5xl mb-4">
                    
                    {dictionary.reviews[headerLabelKey]}
                </h1>

                
            </div>
            <div className="absolute inset-0 bg-yellow-800/30" aria-hidden="true"></div>
        </header>
        {/* Button Container with adjusted spacing */}
        <div className="mt-10 flex flex-wrap justify-center gap-4 mb-20">
            {buttonLabelKeys?.map((key, index) => (
                <Link
                    key={index}
                    href={key.href}
                    className="inline-block rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-dark sm:px-4 sm:py-2 sm:text-base"
                >
                    {dictionary.reviews[key.labelKey]}
                </Link>
            ))}
        </div>
        </>
    );
}
