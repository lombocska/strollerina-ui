'use client';

interface ProductSidePanelProps {
    info: ReactNode;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["strollers"];
}

import { ReactNode } from 'react';

const ProductSidePanel: React.FC<ProductSidePanelProps> = ({ info, dictionary }) => {
    return (
        <>
            {/* Desktop Layout: Fixed sidebar */}
            <aside className="hidden md:block md:w-1/3 p-4 fixed right-0 top-16 h-full max-h-[1000px] bg-transparent overflow-y-auto">
                {info}
            </aside>
        </>
    );
};

export default ProductSidePanel;
