'use client';

import { Select, SelectItem } from '@nextui-org/select';
import { useTheme } from 'next-themes';

export default function SelectWithMultipleChip({ items, values, handleSelectionChange, label, plHolder, shouldTranslate, dictionary}) {
    const { theme } = useTheme(); // Access the current theme using next-themes hook

    return (
        <div className="flex flex-col gap-2 m-3">
            <Select
                label={label}
                labelPlacement='outside'
                selectionMode="multiple"
                placeholder={plHolder}
                selectedKeys={values}
                className="max-w-xs"
                onSelectionChange={handleSelectionChange}
            >
            
                {items?.map((item) => (
                    <SelectItem key={item.value} className={`${theme === 'dark' ? 'dark:text-white' : ' text-black'}`}>
                        {shouldTranslate ?  dictionary[item.name]: item.name }
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
}
