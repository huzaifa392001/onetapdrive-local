"use client";
import React, { useEffect } from "react";
import CarImages from "./CarImages/CarImages";
import CarDetails from "./CarDetails/CarDetails";
import "./AddCar.scss";
import CarPricing from "./CarPricing/CarPricing";
import CarColors from "./CarColors/CarColors";
import RentalTerms from "./RentalTerms/RentalTerms";
import MulkiyaDetails from "./MulkiyaDetails/MulkiyaDetails";
import CarSpecs from "./CarSpecs/CarSpecs";
import CarFeatures from "./CarFeatures/CarFeatures";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { createCar } from "@/Services/VendorServices/VendorAddCarServices";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

function AddCar({ edit }) {
    const router = useRouter();
    const validationSchema = Yup.object({
        name: Yup.string().required("Car name is required"),
        cityId: Yup.string().required("City is required"),
        securityDeposit: Yup.boolean().required("Security deposit is required"),
        securityDepositAmount: Yup.number()
            .min(0, "Amount must be positive")
            .required("Security deposit amount is required"),
        specialNoteForCustomer: Yup.string().required("Special note for customer is required"),
        registrationCardFront: Yup.mixed().required("Registration card front is required"),
        registrationCardBack: Yup.mixed().required("Registration card back is required"),
        registrationCardExpiryDate: Yup.date()
            .required("Registration card expiry date is required")
            .min(new Date(), "Expiry date cannot be in the past"),
        interiorColor: Yup.string().required("Interior color is required"),
        description: Yup.string().required("Description is required"),
        isCarWithDriver: Yup.boolean().required("Car with driver status is required"),
        status: Yup.boolean().required("Car status is required"),
        active: Yup.boolean().required("Active status is required"),
        transmissionId: Yup.string().required("Transmission type is required"),
        modelId: Yup.string().required("Car model is required"),
        categoryId: Yup.string().required("Car category is required"),
        featureIds: Yup.array().min(1, "At least one feature is required").required("Features are required"),
        seatingCapacityId: Yup.string().required("Seating capacity is required"),
        deliveryPickupCharge: Yup.string().required("Delivery pickup charge is required"),
        specId: Yup.string().required("Specification ID is required"),
        doorId: Yup.string().required("Door ID is required"),
        bagFitId: Yup.string().required("Bag fit ID is required"),
        colorId: Yup.string().required("Color ID is required"),
        fuelTypeId: Yup.string().required("Fuel type ID is required"),
        makeYearId: Yup.string().required("Make year ID is required"),
        images: Yup.array().min(5, "At least five images are required").required("Images are required"),
        prices: Yup.array()
            .of(
                Yup.object({
                    priceType: Yup.string().required(),
                    price: Yup.number()
                        .min(0, "Price must be positive")
                        .when("priceType", {
                            is: "daily",
                            then: (schema) => schema.required("Daily price is required"),
                            otherwise: (schema) => schema.notRequired()
                        }),
                    kilometers: Yup.number()
                        .min(0, "Kilometers must be positive")
                        .when("priceType", {
                            is: "daily",
                            then: (schema) => schema.required("Daily kilometers are required"),
                            otherwise: (schema) => schema.notRequired()
                        })
                })
            )
            .test("has-daily", "Daily pricing is required", (prices) => {
                return prices.some((item) => item.priceType === "daily" && item.price && item.kilometers);
            })
    }).required();

    const defaultCarFormValues = {
        name: "",
        cityId: "",
        securityDeposit: true,
        securityDepositAmount: 0,
        specialNoteForCustomer: "",
        registrationCardFront: null,
        registrationCardBack: null,
        registrationCardExpiryDate: null, // format as YYYY-MM-DD
        interiorColor: "",
        description: "",
        isCarWithDriver: false,
        status: false,
        active: false,
        transmissionId: "",
        modelId: "",
        categoryId: "",
        featureIds: [],
        seatingCapacityId: "",
        deliveryPickupCharge: "",
        specId: "",
        doorId: "",
        bagFitId: "",
        colorId: "",
        fuelTypeId: "",
        makeYearId: "",
        images: [],
        prices: [
            { priceType: "daily", price: null, kilometers: null },
            { priceType: "weekly", price: null, kilometers: null },
            { priceType: "monthly", price: null, kilometers: null }
        ]
    };

    const {
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors, isValid }
    } = useForm({
        defaultValues: defaultCarFormValues,
        resolver: yupResolver(validationSchema) // Enable the yupResolver
    });

    // API mutation
    const addCarMutation = useMutation({
        mutationFn: createCar,
        onSuccess: () => {
            toast.success(edit ? "Car updated successfully" : "Car added successfully");
            reset();
            router.back();
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    });

    useEffect(() => {
        console.log("errors=> ", errors);
    }, [errors]);

    // Form submission handler
    const onSubmit = (data) => {
        addCarMutation.mutate(data);
    };

    // Update form values when child components change
    const handleCarImagesChange = (images) => {
        setValue("images", images);
    };

    const handleCarDetailsChange = (details) => {
        Object.entries(details).forEach(([key, value]) => {
            setValue(key, value);
        });
    };

    const handleCarPricingChange = (pricing) => {
        setValue("prices", pricing);
    };

    const handleCarColorsChange = (colorId, interiorColor) => {
        setValue("colorId", colorId);
        setValue("interiorColor", interiorColor);
    };

    const handleRentalTermsChange = (terms) => {
        Object.entries(terms).forEach(([key, value]) => {
            setValue(key, value);
        });
    };

    const handleMulkiyaDetailsChange = (details) => {
        Object.entries(details).forEach(([key, value]) => {
            if ((key === "registrationCardFront" || key === "registrationCardBack") && value instanceof File) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setValue(key, e.target.result);
                };
                reader.readAsDataURL(value);
            } else {
                setValue(key, value);
            }
        });
    };

    const handleCarSpecsChange = (specs) => {
        Object.entries(specs).forEach(([key, value]) => {
            setValue(key, value);
        });
    };

    const handleCarFeaturesChange = (features) => {
        setValue("featureIds", features);
    };

    return (
        <div className="fleetWrapper">
            <form onSubmit={handleSubmit(onSubmit)} className="carRow">
                <CarImages carImages={handleCarImagesChange} control={control} errors={errors} />
                <CarDetails setCarDetails={handleCarDetailsChange} control={control} errors={errors} />
                <CarPricing control={control} errors={errors} onChange={handleCarPricingChange} />
                <CarColors control={control} errors={errors} onChange={handleCarColorsChange} />
                <RentalTerms control={control} errors={errors} onChange={handleRentalTermsChange} />
                <MulkiyaDetails control={control} errors={errors} onChange={handleMulkiyaDetailsChange} />
                <CarSpecs control={control} errors={errors} onChange={handleCarSpecsChange} />
                <CarFeatures control={control} errors={errors} onChange={handleCarFeaturesChange} />
                <div className="btnCont">
                    <button
                        type="submit"
                        className={`themeBtn  `}
                        // disabled={addCarMutation.isPending || !isValid}
                    >
                        {addCarMutation.isPending ? "Loading..." : edit ? "Update" : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddCar;
