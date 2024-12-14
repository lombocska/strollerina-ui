import React from 'react';
import { Card, Select, SelectItem, Checkbox, Input, Textarea, Image } from '@nextui-org/react';
import RatingStars from '@/components/strollerina/rating_stars';
import { useForm } from 'react-hook-form';

interface CarSeatCardProps {
    dictionary: any;
    carSeatBrands: any[];
    carSeatModels: any[];
    showMissingCarSeatInput: boolean;
    setShowMissingCarSeatInput: (value: boolean) => void;
    setValue: (fieldName: string, value: any) => void;
    register: ReturnType<typeof useForm>['register'];
    watch: ReturnType<typeof useForm>['watch'];
    selectedStroller?: { id: number; name: string; img?: string }; 
    currencies:string[];
    countries:string[];
}

const CarSeatReviewCard: React.FC<CarSeatCardProps> = ({
    dictionary,
    carSeatBrands,
    carSeatModels,
    showMissingCarSeatInput,
    setShowMissingCarSeatInput,
    setValue,
    register,
    watch,
    selectedStroller,
    currencies,
    countries
}) => {
    const carSeatRatingFields = [
        { label: 'recline-rating', fieldName: 'carSeatReclineStars' },
        { label: 'rotation-rating', fieldName: 'carSeatRotationStars' },
        { label: 'airflow-rating', fieldName: 'carSeatAirFlowStars' },
        { label: 'canopy-rating', fieldName: 'carSeatCanopyStars' },
        { label: 'harness-rating', fieldName: 'carSeatHarnessStars' },
        { label: 'cleaning-rating', fieldName: 'carSeatCleaningStars' },
    ];

    // Get the selected model ID from the watch function
    const selectedCarSeatId = watch('carSeatModel');

    // Find the corresponding car seat object
    const selectedCarSeat = carSeatModels.find((model) => model.id === parseInt(selectedCarSeatId, 10));

    return (
        <Card className="p-6 shadow-lg mx-auto w-full shadow-gray-400 border-t border-gray-300">
            <h2 className="text-xl font-semibold mb-4 text-center">
                {dictionary.reviews['register-setup-carseat-review']}
                {selectedStroller?.name && (
                <span className="">
                    {dictionary.reviews['used-with']} ({selectedStroller.name})
                </span>
            )}
            </h2>

            <div className="flex items-start gap-4 mb-4">
                {/* Brand and Model Selectors */}
                <div className="flex-1">
                    <Select
                        aria-label={dictionary.reviews['carseat-brand-select']}
                        placeholder={dictionary.reviews['carseat-brand-select']}
                        {...register('carSeatBrand')}
                        fullWidth
                        className="mb-4"
                    >
                        {carSeatBrands.map((brand) => (
                            <SelectItem
                                key={brand.value}
                                aria-label={brand.value}
                                value={brand.value}
                            >
                                {brand.name}
                            </SelectItem>
                        ))}
                    </Select>

                    <Select
                        aria-label={dictionary.reviews['carseat-model-select']}
                        placeholder={dictionary.reviews['carseat-model-select']}
                        {...register('carSeatModel')}
                        fullWidth
                        disabled={!carSeatModels.length}
                        className="mb-4"
                    >
                        {carSeatModels.map((model) => (
                            <SelectItem
                                key={model.id}
                                aria-label={model.name}
                                value={model.id.toString()}
                            >
                                {model.name}
                            </SelectItem>
                        ))}
                    </Select>
                </div>

                {/* Car Seat Image */}
                <div className="w-1/3">
                    {selectedCarSeat?.img ? (
                        <Image
                            src={selectedCarSeat.img}
                            alt={selectedCarSeat.name}
                            className="object-cover rounded-lg"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-32 bg-gray-100 text-gray-500 rounded-lg">
                            {dictionary.reviews['no-image-available']}
                        </div>
                    )}
                </div>
            </div>

            <Checkbox
                onChange={(e) => setShowMissingCarSeatInput(e.target.checked)}
                className="mb-4"
            >
                {dictionary.reviews['missing-carseat']}
            </Checkbox>
            {showMissingCarSeatInput && (
                <>
                    <Input
                        placeholder={dictionary.reviews['missing-carseat-brand']}
                        {...register('missingCarSeatBrand')}
                        fullWidth
                        className="mb-4"
                    />
                    <Input
                        placeholder={dictionary.reviews['missing-carseat-model']}
                        {...register('missingCarSeatModel')}
                        fullWidth
                        className="mb-4"
                    />
                </>
            )}

            <Input
                aria-label={dictionary.reviews['year-of-purchase']}
                min={2000}
                max={2030}
                defaultValue={2022}
                type="number" placeholder={dictionary.reviews['year-of-purchase']} {...register('carSeatBuyDate', { valueAsNumber: true })} clearable fullWidth className="mb-4" />
            <Checkbox {...register('carSeatIsSecondHand')} className="block mb-4">{dictionary.reviews['is-second-hand']}</Checkbox>
            <Input
                min={0}
                type="number" placeholder="Original Price" {...register('carSeatOriginalPrice', { valueAsNumber: true })} clearable fullWidth className="mb-4" />
            <Input
                min={0}
                type="number" placeholder="Selling Price" {...register('carSeatSellingPrice', { valueAsNumber: true })} clearable fullWidth className="mb-4" />

            <Select
                aria-label={dictionary.reviews['select-currency']}
                placeholder={dictionary.reviews['select-currency']}
                {...register('currency')}
                fullWidth
                className="mb-4"
            >
                {currencies?.map((currency) => (
                    <SelectItem
                        aria-label={currency}
                        key={currency}   
                        value={currency}
                    >
                        {currency}
                    </SelectItem>
                ))}
            </Select>
            <Select
                aria-label={dictionary.reviews['select-country']}
                placeholder={dictionary.reviews['select-country']}
                {...register('country')}
                fullWidth
                className="mb-4"
            >
                {countries?.map((country) => (
                    <SelectItem
                        aria-label={country}
                        key={country}   
                        value={country}
                    >
                        {country}
                    </SelectItem>
                ))}
            </Select>
            <Input
                min={0}
                type="number" placeholder="Years of Usage" {...register('carSeatYearsOfUsage', { valueAsNumber: true })} clearable fullWidth className="mb-4" />

            <div className="grid grid-cols-2 gap-y-4 mb-4">
                {carSeatRatingFields.map((rating, index) => (
                    <React.Fragment key={index}>
                        <label className="text-right mt-2 pr-4">{dictionary.reviews[rating.label]}</label>
                        <div className="flex items-center">
                            <RatingStars onChange={(value) => setValue(rating.fieldName, value)} />
                        </div>
                    </React.Fragment>
                ))}
            </div>

            <Textarea placeholder={dictionary.reviews['carseat-comment']} {...register('carSeatComment')} fullWidth className="mb-4" />
        </Card>
    );
};

export default CarSeatReviewCard;
