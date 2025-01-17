'use client';

import { getDictionary } from 'get-dictionary';
import { getCarseatByGeneratedId, getStrollerByGeneratedId } from 'lib/data';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CarseatCardDTO, StrollerInfoDTO } from 'types';
import StrollerInfo from './stroller_info';
import Image from 'next/image';
import CarseatInfo from './carseat_info';
import { Button } from '@nextui-org/button';
import { Trash2Icon } from 'lucide-react';

const InfoComparison = ({ dictionary, lang }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [ids, setIds] = useState<string[]>([]);
    const [type, setType] = useState<string>('stroller');
    const [selectedStrollers, setSelectedStrollers] = useState<StrollerInfoDTO[]>([]);
    const [selectedCarseats, setSelectedCarseats] = useState<CarseatCardDTO[]>([]);

    useEffect(() => {
        const idsParam = searchParams.get('ids')?.split(',') || [];
        const typeParam = searchParams.get('type') || 'stroller';
        setIds(idsParam);
        setType(typeParam);
    }, [searchParams]);

    useEffect(() => {
        const fetchStrollers = async () => {
            if (ids.length > 0) {
                const strollers = await Promise.all(ids.map(id => getStrollerByGeneratedId(id)));
                setSelectedStrollers(strollers);
            } else {
                setSelectedStrollers([]);
            }
        };

        const fetchCarseats = async () => {
            if (ids.length > 0) {
                const carseats = await Promise.all(ids.map(id => getCarseatByGeneratedId(id)));
                setSelectedCarseats(carseats);
            } else {
                setSelectedCarseats([]);
            }
        };

        if (type === 'stroller') {
            fetchStrollers();
        } else if (type === 'carseat') {
            fetchCarseats();
        }
    }, [ids, type]);

    const handleRemove = (generatedId: string) => {
        if (type === 'stroller') {
            const updatedStrollers = selectedStrollers.filter(stroller => stroller.generatedId !== generatedId);
            setSelectedStrollers(updatedStrollers);
            localStorage.setItem('strollers/compare', JSON.stringify(updatedStrollers.map(stroller => stroller.generatedId)));
            router.push(`/${lang}/compare?ids=${encodeURIComponent(updatedStrollers.map(stroller => stroller.generatedId).join(','))}&type=stroller`);
        } else {
            const updatedCarseats = selectedCarseats.filter(carseat => carseat.generatedId !== generatedId);
            setSelectedCarseats(updatedCarseats);
            localStorage.setItem('carseats/compare', JSON.stringify(updatedCarseats.map(carseat => carseat.generatedId)));
            router.push(`/${lang}/compare?ids=${encodeURIComponent(updatedCarseats.map(carseat => carseat.generatedId).join(','))}&type=carseat`);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {type === 'stroller' ?
                selectedStrollers.map((stroller, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <Image
                            loading="lazy"
                            alt="stroller manual brand image"
                            src={stroller.img}
                            width={200} height={200} />
                        <Button onClick={() => handleRemove(stroller.generatedId)} className="my-4">
                            <Trash2Icon />
                        </Button>
                        <StrollerInfo data={stroller} dictionary={dictionary.strollers} />
                    </div>
                ))
                :
                selectedCarseats.map((carseat, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <Image
                            loading="lazy"
                            alt="carseat manual brand image"
                            src={carseat.img}
                            width={300} height={200} />
                        <Button onClick={() => handleRemove(carseat.generatedId)} className="my-4">
                            <Trash2Icon />
                        </Button>
                        <CarseatInfo data={carseat} dictionary={dictionary.carseats} />
                    </div>
                ))
            }
        </div>
    );
};

export default InfoComparison;
