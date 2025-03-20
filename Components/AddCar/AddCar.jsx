'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import CarImages from './CarImages/CarImages';
import CarDetails from './CarDetails/CarDetails';
import './AddCar.scss';
import CarPricing from './CarPricing/CarPricing';
import CarColors from './CarColors/CarColors';
import RentalTerms from './RentalTerms/RentalTerms';
import MulkiyaDetails from './MulkiyaDetails/MulkiyaDetails';
import CarSpecs from './CarSpecs/CarSpecs';
import CarFeatures from './CarFeatures/CarFeatures';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

function AddCar({ edit }) {
    const [carImages, setCarImages] = useState([]);
    const [imageError, setImageError] = useState('');
    const [oldImages, setOldImages] = useState([]);

    useEffect(() => {
        console.log('carImages=> ', carImages)
    }, [carImages])

    // Form validation schema
    const schema = yup.object().shape({
        car_brand: yup.string().required("Car brand is required"),
        car_model: yup.string().required("Car model is required"),
        car_year: yup.string().required("Car year is required"),
        car_category: yup.string().required("Car category is required"),
        city: yup.string().required("City is required"),
        daily_price: yup.string().required("Daily price is required"),
        daily_milleage: yup.string().required("Daily mileage is required"),
        weekly_price: yup.string().required("Weekly price is required"),
        weekly_milleage: yup.string().required("Weekly mileage is required"),
        monthly_price: yup.string().required("Monthly price is required"),
        monthly_milleage: yup.string().required("Monthly mileage is required"),
        colors: yup.object().shape({
            exterior: yup.string().required("Exterior color is required"),
            interior: yup.string().required("Interior color is required"),
        }),
        features: yup.array().min(1, "At least one feature is required"),
    });

    // Default form values
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
        features: [],
    };

    // React Hook Form initialization
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        setError,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });

    // Handle car images update
    const handleCarImages = (images) => {
        const validImages = images.filter(image => image instanceof File);
        if (validImages.length === 0) {
            setImageError('Please upload at least one valid image');
            return;
        }
        if (validImages.length > 10) {
            setImageError('Maximum 10 images allowed');
            return;
        }
        setImageError('');
        setCarImages(validImages);
    };

    // API mutation
    const addCarMutation = useMutation({
        mutationFn: async (data) => {
            // Your API call here
            // return await addCar(data);
        },
        onSuccess: () => {
            toast.success(edit ? "Car updated successfully" : "Car added successfully");
            reset();
            setCarImages([]);
            setOldImages([]);
        },
        onError: (error) => {
            toast.error(error.message || "Something went wrong");
        }
    });

    // Form submission handler
    const onSubmit = async (data) => {
        console.log("data=> ", data)
        // try {
        //     if (carImages.length === 0 && !edit) {
        //         setImageError('Please upload at least one image');
        //         return;
        //     }

        //     const formData = new FormData();

        //     // Append basic car details
        //     Object.keys(data).forEach(key => {
        //         if (key !== 'colors' && key !== 'mulkiya_details' && key !== 'specifications' && key !== 'features' && key !== 'rental_terms') {
        //             formData.append(key, data[key]);
        //         }
        //     });

        //     // Append nested objects
        //     formData.append('colors', JSON.stringify(data.colors));
        //     formData.append('mulkiya_details', JSON.stringify(data.mulkiya_details));
        //     formData.append('specifications', JSON.stringify(data.specifications));
        //     formData.append('features', JSON.stringify(data.features));
        //     formData.append('rental_terms', JSON.stringify(data.rental_terms));

        //     // Append images
        //     carImages.forEach((image, index) => {
        //         formData.append(`car_images`, image);
        //     });

        //     // If editing, append old images
        //     if (edit) {
        //         formData.append('old_images', JSON.stringify(oldImages));
        //     }

        //     // Submit form
        //     await addCarMutation.mutateAsync(formData);

        // } catch (error) {
        //     console.error('Form submission error:', error);
        //     toast.error(error.message || "Something went wrong during submission");
        // }
    };

    useEffect(() => {
        console.log("errors=> ", errors)
    }, [errors])

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

                <div className="btnCont">
                    <button
                        type="submit"
                        className="themeBtn"
                    // disabled={addCarMutation.isPending}
                    >
                        {addCarMutation.isPending ? "Loading..." : (edit ? "Update" : "Submit")}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddCar;
