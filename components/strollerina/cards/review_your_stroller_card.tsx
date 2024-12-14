import React from 'react';
import { Card, Select, SelectItem, Checkbox, Input, Textarea, Image } from '@nextui-org/react';
import RatingStars from '@/components/strollerina/rating_stars';
import { useForm } from 'react-hook-form';
import { useCurrency } from 'lib/context/currency_context';

interface StrollerCardProps {
    dictionary: any; // Replace with a more specific type if needed
    strollerBrands: any[];
    strollerModels: any[];
    showMissingStrollerInput: boolean;
    setShowMissingStrollerInput: (value: boolean) => void;
    setValue: (fieldName: string, value: any) => void;
    register: ReturnType<typeof useForm>['register'];
    watch: ReturnType<typeof useForm>['watch'];
    currencies: string[];
    countries: string[];
}

const StrollerReviewCard: React.FC<StrollerCardProps> = ({
    dictionary,
    strollerBrands,
    strollerModels,
    showMissingStrollerInput,
    setShowMissingStrollerInput,
    setValue,
    register,
    watch,
    currencies,
    countries
}) => {
    const strollerRatingFields = [
        { label: 'fold-rating', fieldName: 'strollerFoldStars' },
        { label: 'recline-rating', fieldName: 'strollerReclineStars' },
        { label: 'handlebar-rating', fieldName: 'strollerHandlebarStars' },
        { label: 'canopy-rating', fieldName: 'strollerCanopyStars' },
        { label: 'harness-rating', fieldName: 'strollerHarnessStars' },
        { label: 'carrycot-rating', fieldName: 'strollerCarrycotStars' },
        { label: 'seat-rating', fieldName: 'strollerSeatStars' },
        { label: 'basket-rating', fieldName: 'strollerBasketStars' },
        { label: 'cleaning-rating', fieldName: 'strollerCleaningStars' },
    ];
    

    // Get the selected model ID from the watch function
    const selectedStrollerId = watch('strollerModel');

    // Find the corresponding stroller object
    const selectedStroller = strollerModels.find(
        (model) => model.id === parseInt(selectedStrollerId, 10)
    );

    return (
        <Card className="p-6 shadow-lg mx-auto w-full shadow-gray-400 border-t border-gray-300">
            <h2 className="text-xl font-semibold mb-4 text-center">
                {dictionary.reviews['register-setup-stroller-review']}
            </h2>

            <div className="flex items-start gap-4 mb-4">
                {/* Brand and Model Selectors */}
                <div className="flex-1">
                    <Select
                        aria-label={dictionary.reviews['stroller-brand-select']}
                        placeholder={dictionary.reviews['stroller-brand-select']}
                        {...register('strollerBrand')}
                        fullWidth
                        className="mb-4"
                    >
                        {strollerBrands.map((brand) => (
                            <SelectItem
                                aria-label={brand.value}
                                key={brand.value}   
                                value={brand.value}
                            >
                                {brand.name}
                            </SelectItem>
                        ))}
                    </Select>

                    <Select
                        aria-label={dictionary.reviews['stroller-model-select']}
                        placeholder={dictionary.reviews['stroller-model-select']}
                        {...register('strollerModel')}
                        fullWidth
                        disabled={!strollerModels.length}
                        className="mb-4"
                    >
                        {strollerModels.map((model) => (
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

                {/* Stroller Image */}
                <div className="w-1/3">
                    {selectedStroller?.img ? (
                        <Image
                            src={selectedStroller.img}
                            alt={selectedStroller.name}
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
                onChange={(e) => setShowMissingStrollerInput(e.target.checked)}
                className="mb-4"
            >
                {dictionary.reviews['missing-stroller']}
            </Checkbox>
            {showMissingStrollerInput && (
                <>
                    <Input
                        placeholder={dictionary.reviews['missing-stroller-brand']}
                        {...register('missingStrollerBrand')}
                        fullWidth
                        className="mb-4"
                    />
                    <Input
                        placeholder={dictionary.reviews['missing-stroller-model']}
                        {...register('missingStrollerModel')}
                        fullWidth
                        className="mb-4"
                    />
                </>
            )}

            <Input
                max={2030}
                min={2000}
                type="number"
                aria-label={dictionary.reviews['year-of-purchase']}
                placeholder={dictionary.reviews['year-of-purchase']}
                {...register('strollerBuyDate', {
                    valueAsNumber: true,
                    required: 'Year of Purchase is required',
                })}
                defaultValue={2022}
                clearable
                fullWidth
                className="mb-4"
            />

            <Checkbox
                {...register('strollerIsSecondHand')}
                className="block mb-4"
            >
                {dictionary.reviews['is-second-hand']}
            </Checkbox>
            <Input
                min={0}
                type="number"
                placeholder={dictionary.reviews['original-price']}
                {...register('strollerOriginalPrice', { valueAsNumber: true })}
                clearable
                fullWidth
                className="mb-4"
            />
            <Input
                min={0}
                type="number"
                placeholder={dictionary.reviews['selling-price']}
                {...register('strollerSellingPrice', { valueAsNumber: true })}
                clearable
                fullWidth
                className="mb-4"
            />
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
                max={20}
                type="number"
                placeholder={dictionary.reviews['years-of-usage']}
                {...register('strollerYearsOfUsage', { valueAsNumber: true })}
                clearable
                fullWidth
                className="mb-4"
            />

            <div className="grid grid-cols-2 gap-y-4 mb-4">
                {strollerRatingFields.map((rating, index) => (
                    <React.Fragment key={index}>
                        <label className="text-right mt-2 pr-4">
                            {dictionary.reviews[rating.label]}
                        </label>
                        <div className="flex items-center">
                            <RatingStars
                                onChange={(value) => setValue(rating.fieldName, value)}
                            />
                        </div>
                    </React.Fragment>
                ))}
            </div>

            <Textarea
                placeholder={dictionary.reviews['stroller-comment']}
                {...register('strollerComment')}
                fullWidth
                className="mb-4"
            />
        </Card>
    );
};

export default StrollerReviewCard;
