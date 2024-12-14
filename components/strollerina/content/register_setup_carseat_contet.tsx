'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input,  } from '@nextui-org/react';
import { getStrollerBrands, getCarSeatsByBrand, getCarSeatBrands, submitStrollerCarSeatReview, submitStrollerCarSeatReviewWMissingData } from 'lib/data';
import CarSeatReviewCard from '../cards/review_your_carseat_card';
import { useRouter } from "next/navigation";

export default function RegisterSetupCarSeatContent({ dictionary, currencies, countries }) {
    const router = useRouter();

    const [carSeatBrands, setCarSeatBrands] = useState([]);
    const [carSeatModels, setCarSeatModels] = useState([]);
    const [showMissingCarSeatInput, setShowMissingCarSeatInput] = useState(false);

    const { register, handleSubmit, watch, setValue } = useForm();

    const selectedCarSeatBrand = watch('carSeatBrand');

    useEffect(() => {
        async function fetchData() {
            const brands = await getStrollerBrands();
            const carSeatBrands = await getCarSeatBrands();
            setCarSeatBrands(carSeatBrands);
        }

        fetchData();
    }, []);


    useEffect(() => {
        if (selectedCarSeatBrand) {
            async function fetchModels() {
                const models = await getCarSeatsByBrand(selectedCarSeatBrand);
                setCarSeatModels(models);
            }
            fetchModels();
        }
    }, [selectedCarSeatBrand]);


    const onSubmit = (data) => {
            console.log('Form submitted:', data);
        
            // Check for missing data fields
            const missingData = {};
            if (data.missingStrollerBrand) missingData.missingStrollerBrand = data.missingStrollerBrand;
            if (data.missingStrollerModel) missingData.missingStrollerModel = data.missingStrollerModel;
            if (data.missingCarSeatBrand) missingData.missingCarSeatBrand = data.missingCarSeatBrand;
            if (data.missingCarSeatModel) missingData.missingCarSeatModel = data.missingCarSeatModel;
        
            // If missing data exists, submit it and return early
            if (Object.keys(missingData).length > 0) {
                console.log('Submitting missing data only:', missingData);
                submitStrollerCarSeatReviewWMissingData(data)
                return; // Exit the function, skip the original request
            }
        
            // If no missing data, proceed with the original request
            try {
                submitStrollerCarSeatReview(data);
                console.log('Review data submitted successfully');
            } catch (error) {
                console.error('Error submitting review data:', error);
            }

            router.push("/reviews")
        };
    

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
            
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-8 w-full">

                        <CarSeatReviewCard
                            dictionary={dictionary}
                            carSeatBrands={carSeatBrands}
                            carSeatModels={carSeatModels}
                            currencies={currencies}
                            countries={countries}
                            showMissingCarSeatInput={showMissingCarSeatInput}
                            setShowMissingCarSeatInput={setShowMissingCarSeatInput}
                            setValue={setValue}
                            register={register}
                            watch={watch}
                        />
                    </div>

                    <div className="flex flex-col items-center mb-6 space-y-4 w-full max-w-md mx-auto">
                        <Input
                            placeholder="Email"
                            {...register('email', { required: true })}
                            clearable
                            fullWidth
                            className="text-center"
                        />
                        <Input
                            placeholder="Name"
                            {...register('reviewerName', { required: true })}
                            clearable
                            fullWidth
                            className="text-center"
                        />
                    </div>
                    <Button type="submit" color="primary" className="mt-4 w-full">
                        Save
                    </Button>
                </form>
            </div>
        </>
    );
}
