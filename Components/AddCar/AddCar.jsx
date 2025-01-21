'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CarImages from './CarImages/CarImages';
import CarDetails from './CarDetails/CarDetails';
import './AddCar.scss';
import CarPricing from './CarPricing/CarPricing';
import SecHeading from '../SecHeading/SecHeading';
import carColors from "@/DummyData/CarColors.json"

function AddCar() {
    const [carImages, setCarImages] = useState([]);
    const [imageError, setImageError] = useState('');

    // Default form schema values
    const defaultValues = {
        car_brand: "",
        car_model: "",
        car_year: "",
        car_category: "",
        city: "",
        price_per_day: "",
        daily_milleage: "",
        weekly_per_day: "",
        weekly_milleage: "",
        monthly_per_day: "",
        monthly_milleage: "",
        colors: {
            exterior: "",
            interior: "",
        },
    };

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        defaultValues: defaultValues, // Passing default values
    });

    const handleCarImages = (images) => {
        setCarImages(images); // Update parent state with images from CarImages
    };

    const onSubmit = (data) => {
        if (carImages.length < 5) {
            setImageError('Please upload at least 5 images.');
            return; // Prevent submission if validation fails
        }

        setImageError(''); // Clear any previous image errors
        console.log('Form Submitted:', data);
        console.log('Uploaded Images:', carImages);
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
                        watch={watch}
                        setValue={setValue}
                        errors={errors}
                    />
                    <div className="carDetails">
                        <div className="headingCont">
                            <SecHeading heading={"Car Color"} />
                        </div>
                        <div className="inputContainer">
                            <div className={`inputCont ${errors?.colors?.exterior ? "error" : ''}`}>
                                <label htmlFor="colors.exterior">Car Exterior</label>
                                <select
                                    id="colors.exterior"
                                    {...register('colors.exterior', {
                                        required: 'Car exterior color is required',
                                    })}
                                >
                                    <option disabled selected value="">Select Car Exterior Color</option>
                                    {carColors?.map((color, index) => (
                                        <option style={{ backgroundColor: color, color: color === 'Black' || color === "Blue" || color === "Purple" || color === "Green" || color === "Brown" ? "#fff" : "" }} value={color} key={index}>{color}</option>
                                    ))}
                                </select>
                                {errors?.colors?.exterior && (
                                    <p className='errorText'>{errors.colors.exterior.message}</p>
                                )}
                            </div>
                            <div className={`inputCont ${errors?.colors?.interior ? "error" : ''}`}>
                                <label htmlFor="colors.interior">Car Interior</label>
                                <select
                                    id="colors.interior"
                                    {...register('colors.interior', {
                                        required: 'Car interior color is required',
                                    })}
                                >
                                    <option disabled selected value="">Select Car Interior Color</option>
                                    {carColors?.map((color, index) => (
                                        <option style={{ backgroundColor: color, color: color === 'Black' || color === "Blue" || color === "Purple" || color === "Green" || color === "Brown" ? "#fff" : "" }} value={color} key={index}>{color}</option>
                                    ))}
                                </select>
                                {errors?.colors?.interior && (
                                    <p className='errorText'>{errors.colors.interior.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {imageError && <p className="errorText">{imageError}</p>} {/* Show image validation error */}

                <button type="submit" className="themeBtn">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AddCar;
