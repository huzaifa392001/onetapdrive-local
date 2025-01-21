'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CarImages from './CarImages/CarImages';
import CarDetails from './CarDetails/CarDetails';
import './AddCar.scss';
import CarPricing from './CarPricing/CarPricing';
import SecHeading from '../SecHeading/SecHeading';
import CarColors from './CarColors/CarColors';
import RentalTerms from './RentalTerms/RentalTerms';
import MulkiyaDetails from './MulkiyaDetails/MulkiyaDetails';
import CarSpecs from './CarSpecs/CarSpecs';
import CarFeatures from './CarFeatures/CarFeatures';

function AddCar() {
    const [carImages, setCarImages] = useState([]); // Store uploaded images
    const [imageError, setImageError] = useState(''); // Store image upload errors

    // Default form schema values
    const defaultValues = {
        car_brand: "",
        car_model: "",
        car_year: "",
        car_category: "",
        city: "",
        daily_price: "",
        daily_milleage: "",
        weekly_price: "",
        weekly_milleage: "",
        monthly_price: "",
        monthly_milleage: "",
        colors: {
            exterior: "",
            interior: "",
        },
    };

    // React Hook Form
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        defaultValues, // Passing default values
    });

    // Update images from child component
    const handleCarImages = (images) => {
        setCarImages(images); // Update parent state with images
    };

    // Form submission handler
    const onSubmit = (data) => {
        console.log('data=> ', data)
        if (carImages.length < 5) {
            setImageError('Please upload at least 5 images.');
            return; // Prevent submission if validation fails
        }

        setImageError(''); // Clear any previous image errors

        // Create a FormData object
        const formData = new FormData();

        // Append flat and nested fields from `data` object
        for (const key in data) {
            if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
                // For nested objects, append each key-value pair
                for (const nestedKey in data[key]) {
                    formData.append(`${key}[${nestedKey}]`, data[key][nestedKey]);
                }
            } else {
                formData.append(key, data[key]);
            }
        }

        // Append car images to FormData
        carImages.forEach((image, index) => {
            formData.append(`carImages[${index}]`, image.src); // Use `image.src` for the blob URL
        });

        console.log('FormData prepared for submission');
    };


    return (
        <div className="fleetWrapper">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="carRow">
                    <CarImages
                        carImages={handleCarImages}
                        register={register}
                        setError={setError}
                        clearErrors={clearErrors}
                        errors={errors}
                    />
                    <CarDetails
                        register={register}
                        watch={watch}
                        setValue={setValue}
                        errors={errors}
                    />
                    <CarPricing
                        register={register}
                        errors={errors}
                    />
                    <CarColors
                        register={register}
                        errors={errors}
                    />
                    <RentalTerms
                        register={register}
                        errors={errors}
                    />
                    <MulkiyaDetails
                        register={register}
                        setValue={setValue}
                        errors={errors}
                    />
                    <CarSpecs
                        register={register}
                        errors={errors}
                    />
                    <CarFeatures
                        register={register}
                        errors={errors}
                    />
                </div>

                {imageError && <p className="errorText">{imageError}</p>} {/* Show image validation error */}

                <div class="btnCont">
                    <button type="submit" className="themeBtn">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddCar;
