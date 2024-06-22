'use client';

import { Select, SelectItem } from '@nextui-org/select';
import useTranslation from 'next-translate/useTranslation';

export default function SelectWithMultipleChip({ items, values, handleSelectionChange, label, plHolder, shouldTranslate}) {
    const { t } = useTranslation('common');

    return (
        <div className="flex flex-col gap-2 m-3">
            <Select
                label={t(label)}
                labelPlacement='outside'
                selectionMode="multiple"
                placeholder={t(plHolder)}
                selectedKeys={values}
                className="max-w-xs"
                onSelectionChange={handleSelectionChange}
            >
                {items?.map((item) => (
                    <SelectItem key={item.value}>
                        {shouldTranslate ? t(item.name) : item.name}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
}
