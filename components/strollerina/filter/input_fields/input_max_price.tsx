'use client';

import { useLocalStorage } from 'lib/LocalStorageAPI';
import { FIVE_THOUSAND, ONE_HUNDRED, ZERO } from 'lib/constants';
import { useEffect } from "react";
import NumberInput from './number_input';
import { useCurrency } from 'lib/context/currency_context';

export default function SelectMaxPrice({ setFilters, isCleared, lSPrefix, defaultMaxPrice, title, label }) {

    const { state, setCurrency } = useCurrency();
    const { currency, multiplicator } = state;

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };

    const [selectedMaxPrice, setSelectedMaxPrice] = useLocalStorage(lSPrefix + "selectedMaxPrice", defaultMaxPrice);

    useEffect(() => {
        if (currency === "EUR") {
            setFilters((filters) => ({
                ...filters,
                maxPrice: Math.round(selectedMaxPrice)
            }));
        } else if (currency === "HUF") {
            setFilters((filters) => ({
                ...filters,
                maxPrice: Math.round(selectedMaxPrice / multiplicator) // EUR-ba való konverzió
            }));
        }

    }, [selectedMaxPrice, setFilters]);

    useEffect(() => {
        if (isCleared) {
            setSelectedMaxPrice(defaultMaxPrice);
        }
    }, [isCleared, defaultMaxPrice, setSelectedMaxPrice]);

    return (
        <div className="flex max-w-xs flex-col gap-2 m-3">
            <NumberInput 
                title={title} 
                label={label}
                inputValue={Math.round(selectedMaxPrice)} 
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
                            value={currency}
                            onChange={handleCurrencyChange}
                        >
                            <option value="EUR">EUR</option>
                            <option value="HUF">HUF</option>
                        </select>
                    </div>
                }
                min={ZERO}
                max={Math.round(FIVE_THOUSAND * multiplicator)}
                step={Math.round(ONE_HUNDRED * multiplicator)} 
            />
        </div>

    );
}
