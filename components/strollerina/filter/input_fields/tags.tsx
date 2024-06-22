'use client';

import { CheckIcon } from '@/components/icons';
import { clearLocalStorage, useLocalStorage } from 'lib/LocalStorageAPI';
import { Tag, TagsProps } from 'types';
import { Chip } from '@nextui-org/chip';
import { Tooltip } from '@nextui-org/tooltip';
import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';

export default function Tags({tags, section, lsName, isCleared, setFilters} : TagsProps) {
    const { t } = useTranslation('tags');

    const [selectedTags, setSelectedTags] = useLocalStorage(lsName, []);

    useEffect(() => {
        if (isCleared) {
            console.log(lsName + " filter clearing")
            setSelectedTags([]);
            clearLocalStorage(lsName)
        }
    }, [isCleared]); 

    useEffect(() => {
        console.log("carseat kid dimension filters changing")
        if (setFilters) {
            setFilters((filters : any) => {
                const existingTags = filters.tags || [];
                const newTags = [...new Set([...existingTags, ...selectedTags])];
                return {
                    ...filters,
                    tags: newTags
                };
            });
        }
        }, [selectedTags]); 

    const handleTagClick = (tag : Tag) => {
        if (selectedTags.includes(tag) && selectedTags.length === 1) {
            setSelectedTags(selectedTags.filter((selectedTag : Tag) => selectedTag !== tag));
        } else if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((selectedTag : Tag) => selectedTag !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    return (
        <>
        {tags.map((tag : Tag) => {
            let label = tag.label;
            let tooltip = tag.tooltip;
            return (
                <div key={tag.name}>
                    {tag.section === section &&
                    
                        <Tooltip 
                            key={tag.name}
                            placement={'top-start'}
                            content={t(tooltip)}
                            className="bg-stone-100">
                            <Chip
                                key={tag.name}
                                // classNames={{
                                //     base: "bg-gradient-to-br from-strollerina_green-100 to-strollerina_green-300 border-small ",
                                //     content: "drop-shadow shadow-black text-white",
                                // }}
                                className='mb-5'
                                variant={selectedTags.includes(tag.name) ? 'solid' : 'bordered'}
                                onClick={() => handleTagClick(tag.name)}
                                startContent={selectedTags.includes(tag.name) ? <CheckIcon size={18}/>  : <></>}
                            >
                                {t(label)}
                            </Chip>
                        </Tooltip>
                    }
                </div>
            );
            })}
        </>
    );
}
