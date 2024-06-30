'use client';

import { CheckIcon } from '@/components/icons';
import { clearLocalStorage, useLocalStorage } from 'lib/LocalStorageAPI';
import { Tag } from 'types';
import { Chip } from '@nextui-org/chip';
import { Tooltip } from '@nextui-org/tooltip';
import { useEffect } from 'react';
import { getDictionary } from 'get-dictionary';

export default function Tags({ tags, section, lsName, isCleared, setFilters, dictionary } :
    {
        tags: Tag[];
        section: string;
        lsName: string;
        isCleared: boolean;
        setFilters: React.Dispatch<React.SetStateAction<any>>;
        dictionary: Awaited<ReturnType<typeof getDictionary>>["tags"]
    }
) {
    const [selectedTags, setSelectedTags] = useLocalStorage(lsName, new Set());

    useEffect(() => {
        if (isCleared) {
            console.log(lsName + " filter clearing")
            setSelectedTags(new Set());
            clearLocalStorage(lsName)
        }
    }, [isCleared, lsName, setSelectedTags]);

    useEffect(() => {
        if (setFilters) {
            console.log("Selected tags:", Array.from(selectedTags));
            setFilters((prevFilters: any) => {
                console.log("Previous filters:", prevFilters);
                const updatedFilters = {
                    ...prevFilters,
                    tags: Array.from(selectedTags),
                };
                console.log("Updated filters:", updatedFilters);
                return updatedFilters;
            });
        }
    }, [selectedTags, setFilters]);

    const handleTagClick = (tag: Tag) => {
        setSelectedTags((prevSelectedTags) => {
            const newSelectedTags = new Set(prevSelectedTags);
            if (newSelectedTags.has(tag.name)) {
                newSelectedTags.delete(tag.name);
            } else {
                newSelectedTags.add(tag.name);
            }
            return newSelectedTags;
        });
    };

    return (
        <>
            {tags.map((tag: Tag) => {
                const label = tag.label;
                const tooltip = tag.tooltip;
                return (
                    <div key={"div-" + tag.name}>
                        {tag.section === section &&
                            <Chip
                                key={"chip-" + tag.name}
                                className='mb-5'
                                variant={selectedTags.has(tag.name) ? 'solid' : 'bordered'}
                                onClick={() => handleTagClick(tag)}
                                startContent={selectedTags.has(tag.name) ? <CheckIcon size={18}/> : null}
                            >
                                {dictionary["main-card"]["chip"][label.split('.').pop()]}
                            </Chip>
                        }
                    </div>
                );
            })}
        </>
    );
}
