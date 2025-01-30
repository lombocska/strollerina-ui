'use client';

import { Badge } from '@/components/shadcn/badge';
import Image from './Image';
import Link from './Link';
import { useTheme } from 'next-themes';
import { ChevronsRightLeft } from 'lucide-react';
// import { CheckIcon } from '@heroicons/react/solid'; // Assuming you use Heroicons for icons

type CardProps = {
    title: string;
    description: string;
    imgSrc: string;
    href: string;
    tags?: string[];
    type?: 'comparable';
    isSelected: boolean;
    onSelect: (title: string) => void;
    notHidden: boolean;
};

export default function Card({
    title,
    description,
    imgSrc,
    href,
    tags = [],
    type,
    isSelected,
    onSelect,
    notHidden = true
}: CardProps) {
    const { theme } = useTheme();

    return (
        <div className="p-4 w-full relative">
            {/* Make the entire card clickable by wrapping it in a Link component */}
            <Link href={href} aria-label={`Link to ${title}`} passHref>
                <div
                    className={`${
                        imgSrc && 'h-full'
                    } overflow-hidden 
                    rounded-md border 
                    border-border flex flex-col h-full cursor-pointer 
                    hover:shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out
                    bg-gray-100 bg-opacity-50`}
                >
                    {imgSrc && (
                        <Image
                            alt={title}
                            src={imgSrc}
                            className="object-cover object-center w-full"
                            width={544}
                            height={286}
                        />
                    )}

                    <div className="p-6 flex flex-col justify-between flex-grow">
                        <div>
                            <h2 className="mb-2 text-2xl font-bold leading-8 tracking-tight text-foreground">
                                {title}
                            </h2>

                            <div className="mb-3 flex flex-wrap">
                                {tags.map((tag, index) => (
                                    <Badge
                                        key={tag}
                                        className="mb-2 mr-2"
                                        variant={index === 0 ? 'default' : 'outline'}
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                            <div className="mb-3 max-w-none text-muted-foreground">
                                {description}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>

            {/* Small Comparison Icon in the top-right corner */}
            {type === 'comparable' && href && notHidden && (
                <div
                    className={`absolute top-2 right-2 p-1 rounded-full shadow-md cursor-pointer hover:bg-primary hover:text-white transition duration-200 ease-in-out
                        ${isSelected ? 'bg-primary' : 'bg-white'} 
                    `}
                    onClick={() => onSelect(href.split('/').pop())} // Toggle the selection on click
                >
                    {/* Display a comparison icon */}
                    <ChevronsRightLeft
                        className={`h-6 w-6`}
                    />
                </div>
            )}
        </div>
    );
}
