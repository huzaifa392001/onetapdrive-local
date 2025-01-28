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

function AddCar({ edit }) {
    const [carImages, setCarImages] = useState([]); // Store uploaded images
    const [imageError, setImageError] = useState(''); // Store image upload errors
    const [oldImages, setOldImages] = useState([])

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
        setValue,
        watch,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        defaultValues, // Passing default values
    });

    // Update images from child component
    const handleCarImages = (images) => {
        // Ensure that images passed in are valid File objects and set them to state
        const validImages = images.filter(image => image instanceof File); // Filter only valid File objects
        setCarImages(validImages); // Set valid images to state
    };
    // Form submission handler
    const onSubmit = (data) => {
        console.log('data=> ', data);

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

        // // Append car images to FormData (make sure these are actual file objects)
        // carImages.forEach((image, index) => {
        //     formData.append(`carImages[${index}]`, image); // Append the actual file object
        // });

        console.log('FormData prepared for submission');
    };

    return (
        <div className="fleetWrapper">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="carRow">
                    <CarImages
                        oldImages={oldImages}
                        carImages={handleCarImages}
                        register={register}
                        setError={setError}
                        clearErrors={clearErrors}
                        errors={errors}
                        edit={edit}
                    />
                    <CarDetails
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        watch={watch}
                        edit={edit}
                    />
                    <CarPricing
                        register={register}
                        errors={errors}
                        edit={edit}
                    />
                    <CarColors
                        register={register}
                        errors={errors}
                        edit={edit}
                    />
                    <RentalTerms
                        register={register}
                        errors={errors}
                        edit={edit}
                    />
                    <MulkiyaDetails
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        edit={edit}
                    />
                    <CarSpecs
                        register={register}
                        errors={errors}
                        edit={edit}
                    />
                    <CarFeatures
                        register={register}
                        errors={errors}
                        edit={edit}
                    />
                </div>

                {imageError && <p className="errorText">{imageError}</p>} {/* Show image validation error */}

                <div className="btnCont">
                    <button type="submit" className="themeBtn">
                        {edit ? "Update" : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddCar;
