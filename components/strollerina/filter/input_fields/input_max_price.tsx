'use client';

import { useLocalStorage } from 'lib/LocalStorageAPI';
import { ONE_HUNDRED, THIRTY, ZERO } from 'lib/constants';
import { useEffect } from "react";
import NumberInput from './number_input';
import { useCurrency } from 'lib/context/currency_context';
// import { useCurrencyContext } from '@/lib/context/currency_context';

export default function SelectMaxPrice({ setFilters, isCleared, lSPrefix, defaultMaxPrice }) {
    
    const { state, setCurrency } = useCurrency();

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log("im called " + event.target.value)
        setCurrency(event.target.value);
    };

    const [selectedMaxPrice, setSelectedMaxPrice] = useLocalStorage(lSPrefix + "selectedMaxPrice", defaultMaxPrice);

    useEffect(() => {
        console.log("stroller price filter changing")
        setFilters((filters) => ({
            ...filters,
            maxPrice: selectedMaxPrice
        }))
    }, [selectedMaxPrice]); 

    useEffect(() => {
        if (isCleared) {
            console.log("max price filter clearing")
            setSelectedMaxPrice(defaultMaxPrice);
        }
    }, [isCleared]); 

    return (
        <div className="flex max-w-xs flex-col gap-2 m-3">
             <NumberInput 
                    transNM={"strollers"}
                    title={"max-price"} 
                    inputValue={selectedMaxPrice} 
                    setInputValue={setSelectedMaxPrice} 
                    demo={<></>} 
                    endContent={
                        <div className="flex items-center">
                            <label className="sr-only" htmlFor="currency">
                                Currency
                            </label>
                            <select
                                className="outline-none border-0 bg-transparent text-default-400 text-small"
                                id="currency"
                                name="currency"
                                value={state.currency}
                                onChange={handleCurrencyChange}
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="HUF">HUF</option>
                            </select>
                        </div>
                    }
                    min={ZERO}
                    max={THIRTY}
                    step={ONE_HUNDRED} />
        </div>
    );
}
