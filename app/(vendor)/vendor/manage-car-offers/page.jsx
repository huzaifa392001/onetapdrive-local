'use client'
import FormGroup from '@/Components/FormGroup';
import SecHeading from '@/Components/SecHeading/SecHeading'
import VendorTable from '@/Components/VendorComponents/VendorTable/VendorTable';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import "./index.scss"
import { useMutation, useQuery } from '@tanstack/react-query';
import { createDiscountedPrice, getVendorCars } from '@/Services/VendorServices/VendorServices';
import { requiredValidation } from '@/Utils/validation';
import { toast } from 'react-toastify';
import Spinner from '@/Components/Spinner/Spinner';
import { useSelector } from 'react-redux';
import Loading from '@/Components/Loading/Loading';
import Link from 'next/link';

function Page() {
    const [discounterCars, setDiscountedCars] = useState([])
    const [createDiscountModal, setCreateDiscountModal] = useState(false)
    const { data: carsData, isPending, refetch } = useQuery({
        queryKey: ["cars"],
        queryFn: getVendorCars
    })

    const [init, setInit] = useState({
        id: null,
        dailyPrice: null,
        dailyDiscountedPrice: null,
        weeklyPrice: null,
        weeklyDiscountedPrice: null,
        monthlyPrice: null,
        monthlyDiscountedPrice: null,
    })

    const priceSchema = yup
        .number()
        .typeError("Must be a number")
        .positive("Must be a positive number")
        .required(requiredValidation);

    const schema = yup.object({
        id: yup
            .object({
                label: yup.string().required(requiredValidation),
                value: yup.string().required(requiredValidation)
            })
            .required(requiredValidation), // If you want ID validation
        dailyPrice: priceSchema,
        dailyDiscountedPrice: priceSchema,
        weeklyPrice: priceSchema,
        weeklyDiscountedPrice: priceSchema,
        monthlyPrice: priceSchema,
        monthlyDiscountedPrice: priceSchema,
    });

    const { control, handleSubmit, watch, setValue, reset, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: init,
    });

    const discountMutation = useMutation({
        mutationFn: createDiscountedPrice,
        onSuccess: () => {
            toast.success("Discounted Price Created Successfully")
            reset();
            setCreateDiscountModal(false)
            refetch()
        },
        onError: () => {
            toast.error("Something went wrong")
        }
    })

    const selectedCarId = watch("id");

    const [fields, setFields] = useState([])

    useEffect(() => {
        setFields([
            {
                type: "select",
                name: "id",
                placeholder: "Select Car",
                multiSelect: false,
                req: true,
                options:
                    carsData?.data?.cars?.map((item) => ({
                        name: item?.name,
                        id: item?.id
                    })) || []
            },
            {
                type: "input",
                name: "dailyPrice",
                placeholder: "Daily Price",
                inputtype: "number",
                req: true,
                readOnly: true,
                colWidth: "col_md_6",
            },
            {
                type: "input",
                name: "dailyDiscountedPrice",
                placeholder: "Daily Discounted Price",
                inputtype: "number",
                req: true,
                colWidth: "col_md_6"
            },
            {
                type: "input",
                name: "weeklyPrice",
                placeholder: "Weekly Price",
                inputtype: "number",
                req: true,
                readOnly: true,
                colWidth: "col_md_6",
            },
            {
                type: "input",
                name: "weeklyDiscountedPrice",
                placeholder: "Weekly Discounted Price",
                inputtype: "number",
                req: true,
                colWidth: "col_md_6"
            },
            {
                type: "input",
                name: "monthlyPrice",
                placeholder: "Monthly Price",
                inputtype: "number",
                req: true,
                readOnly: true,
                colWidth: "col_md_6",
            },
            {
                type: "input",
                name: "monthlyDiscountedPrice",
                placeholder: "Monthly Discounted Price",
                inputtype: "number",
                req: true,
                colWidth: "col_md_6"
            },
        ])
    }, [carsData, selectedCarId])

    useEffect(() => {
        const car = carsData?.data?.cars?.find((item) => item.id === selectedCarId?.value)

        if (car && car.carPrices) {
            // Find the specific price objects by priceType
            const dailyPriceObj = car.carPrices.find(item => item.priceType === "daily");
            const weeklyPriceObj = car.carPrices.find(item => item.priceType === "weekly");
            const monthlyPriceObj = car.carPrices.find(item => item.priceType === "monthly");

            // Set init with single values, not arrays
            setInit({
                id: selectedCarId?.value,
                dailyPrice: dailyPriceObj?.price || null,
                dailyDiscountedPrice: dailyPriceObj?.discountedPrice || null,
                weeklyPrice: weeklyPriceObj?.price || null,
                weeklyDiscountedPrice: weeklyPriceObj?.discountedPrice || null,
                monthlyPrice: monthlyPriceObj?.price || null,
                monthlyDiscountedPrice: monthlyPriceObj?.discountedPrice || null,
            });

            // Also update form values
            setValue('dailyPrice', dailyPriceObj?.price || null);
            setValue('dailyDiscountedPrice', dailyPriceObj?.discountedPrice || null);
            setValue('weeklyPrice', weeklyPriceObj?.price || null);
            setValue('weeklyDiscountedPrice', weeklyPriceObj?.discountedPrice || null);
            setValue('monthlyPrice', monthlyPriceObj?.price || null);
            setValue('monthlyDiscountedPrice', monthlyPriceObj?.discountedPrice || null);
        } else {
            // Reset values if no car found
            setInit({
                id: selectedCarId?.value,
                dailyPrice: null,
                dailyDiscountedPrice: null,
                weeklyPrice: null,
                weeklyDiscountedPrice: null,
                monthlyPrice: null,
                monthlyDiscountedPrice: null,
            });
        }
    }, [selectedCarId, carsData, setValue])

    useEffect(() => {
        const updatedData = carsData?.data?.cars?.filter((car) =>
            car.carPrices?.some(price => price.discountedPrice !== null)
        )

        const transformedData =
            updatedData?.map((car) => {
                return {
                    id: car.id,
                    name: car.name,
                    prices: car.carPrices || [],
                    deletePrice: true
                };
            }) || [];

        setDiscountedCars(transformedData);
    }, [carsData])

    const onSubmit = (data) => {
        const payload = {
            id: parseInt(data?.id?.value),
            car_prices: [
                {
                    price: data?.dailyPrice,
                    discountedPrice: data?.dailyDiscountedPrice,
                    priceType: "daily"
                },
                {
                    price: data?.weeklyPrice,
                    discountedPrice: data?.weeklyDiscountedPrice,
                    priceType: "weekly"
                },
                {
                    price: data?.monthlyPrice,
                    discountedPrice: data?.monthlyDiscountedPrice,
                    priceType: "monthly"
                }
            ]
        }
        discountMutation.mutate(payload)
    }

    if (isPending) return <Loading />

    return (
        <>
            <section className="offerSec">
                <div class="offerBox">
                    <div className='headingBox'>
                        <SecHeading heading="Discounted Cars" />
                        <button onClick={() => setCreateDiscountModal(true)} className="themeBtn">
                            Create Discount
                        </button>
                    </div>
                    <VendorTable data={discounterCars} refetchData={refetch} />
                </div>
            </section>
            {createDiscountModal && (
                <div className='offerModal'>
                    <div class="offerBox ">
                        <div class="header">
                            <button onClick={() => setCreateDiscountModal(false)}>
                                <i class="fas fa-times" />
                            </button>
                        </div>
                        <SecHeading heading="Manage Car Discount" />
                        <form onSubmit={handleSubmit(onSubmit)} action="">
                            {fields?.map((item, i) => (
                                <FormGroup key={i} item={item} control={control} errors={errors} />
                            ))}
                            <button disabled={discountMutation?.isPending || !isValid}
                                className={`themeBtn full ${discountMutation?.isPending || !isValid ? "disabled" : ""}`} type='submit'>
                                {discountMutation?.isPending ? <Spinner /> : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default Page