// components/SidePanel.js
'use client';

interface ProductSidePanelProps {
    info: ReactNode;
}

import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import useTranslation from 'next-translate/useTranslation';
import { ReactNode } from 'react';

const ProductSidePanel: React.FC<ProductSidePanelProps> = ({ info }) => {
    const { t } = useTranslation('common');
    const {isOpen, onOpen, onOpenChange} = useDisclosure();


    return (
        <>
            <aside className="hidden md:block md:w-1/3 p-4  fixed right-0 top-16 h-full max-h-[1000px] bg-transparent overflow-y-auto ">
                {info}
            </aside>

            <div className="md:hidden fixed bottom-4 right-4">
                <Button onPress={onOpen}>{t('info')}</Button>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="overflow-y-auto max-h-screen">
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">{t('info')}</ModalHeader>
                        <ModalBody className="overflow-y-auto">
                            {info}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                {t('close')}
                            </Button>
                        </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ProductSidePanel;
