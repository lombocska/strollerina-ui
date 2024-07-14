'use client';

import { Badge } from '@/components/shadcn/badge'
import Image from './Image'
import Link from './Link'
import { useTheme } from 'next-themes';

type CardProps = {
    title: string;
    description: string;
    imgSrc: string;
    href: string;
    tags?: string[];
    type?: 'comparable';
    isSelected: boolean;
    onSelect: (title: string) => void;
};

export default function Card({ title, description, imgSrc, href, tags = [], type, isSelected, onSelect }: CardProps) {
    const { theme } = useTheme(); // Access the current theme using next-themes hook

    return (
        <div className="p-4 w-full relative"> {/* relative osztály hozzáadása a szülő div-hez */}
            <div className={`${imgSrc && 'h-full'} overflow-hidden rounded-md border border-border flex flex-col h-full`}>
                {imgSrc &&
                (href ? (
                    <Link href={href} aria-label={`Link to ${title}`}>
                        <Image
                            alt={title}
                            src={imgSrc}
                            className="object-fit object-center w-full"
                            width={544}
                            height={286}
                        />
                    </Link>
                ) : (
                    <Image
                        alt={title}
                        src={imgSrc}
                        className="object-fit object-center w-full dark:bg-white"
                        width={544}
                        height={286}
                    />
                ))}
                
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
                    {href && (
                        <div className="mt-auto">
                            <Link
                                href={href}
                                className="text-base font-medium leading-6 text-primary hover:brightness-125 dark:hover:brightness-125"
                                aria-label={`Link to ${title}`}
                            >
                                Info &rarr;
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            {/* Checkbox hozzáadása a jobb felső sarokhoz, ha a típus stroller vagy carseat */}
            {(type === 'comparable') &&  href && (
                <div className="absolute top-2 right-2">
                    <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-primary"
                        checked={isSelected}
                        onChange={() => onSelect(href.split('/').pop())}
                    />
                </div>
            )}
        </div>
    );
}
