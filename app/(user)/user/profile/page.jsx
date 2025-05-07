"use client";
import React, { useEffect, useState } from "react";
import "./style.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import Spinner from "@/Components/Spinner/Spinner";
import { getCurrentUser, updateUser } from "@/Services/AuthService/AuthService";
import { useMutation, useQuery } from "@tanstack/react-query";

function Page() {
    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser
    });


    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
    });

    const updateUserMutation = useMutation({
        mutationFn: updateUser,
        onSuccess: (data) => {
            toast.success(data?.message || "Profile updated successfully!");
            reset();
        },
        onError: (error) => {
            if (error.errors && Array.isArray(error.errors)) {
                error.errors.forEach((errObj) => {
                    Object.values(errObj).forEach((errMessage) => {
                        toast.error(errMessage);
                    });
                });
            } else {
                toast.error(error.message || "Something went wrong");
            }
        }
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: ""
        },
    });

    const onSubmit = async (data) => {
        const formattedData = {
            name: data.name,
            phoneNumber: data.phoneNumber.toString(),
        };

        console.log('formattedData', formattedData)

        const formData = new FormData();
        for (const key in formattedData) {
            formData.append(key, formattedData[key]);
        }

        updateUserMutation.mutate(formData);
    };

    useEffect(() => {
        if (user?.data?.user) {
            const userData = user.data.user;
            reset({
                name: userData?.firstName,
                email: userData?.email,
                phoneNumber: userData?.phoneNumber,
            })
        }
    }, [user]);


    return (
        <div className="contentCol">
            <form className="listForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="contentRow">
                    <div className="contentCol">
                        <div className={`inputCont full ${errors?.name ? "error" : ""}`}>
                            <label htmlFor="name">Name<span className="required">*</span></label>
                            <input
                                {...register("name")}
                                type="text"
                                placeholder="Enter your name"
                                className={errors?.name ? "errorInput" : ""}
                                id="name"
                            />
                            {errors?.name && <p className="errorText">{errors.name.message}</p>}
                        </div>
                    </div>

                    <div className="contentCol">
                        <div className={`inputCont full ${errors?.email ? "error" : ""}`}>
                            <label htmlFor="email">Email<span className="required">*</span></label>
                            <input
                                {...register("email")}
                                type="email"
                                placeholder="Enter your email"
                                className={errors?.email ? "errorInput" : ""}
                                id="email"
                                readOnly // This ensures the email cannot be updated
                                disabled // Disables the field so it's not editable
                            />
                            {errors?.email && <p className="errorText">{errors.email.message}</p>}
                        </div>
                    </div>

                    <div className="contentCol">
                        <div className={`inputCont phoneNumber full ${errors?.phoneNumber ? "error" : ""}`}>
                            <label htmlFor="phoneNumber">Mobile Number<span className="required">*</span></label>
                            <input
                                {...register("phoneNumber")}
                                type="tel"
                                placeholder="Enter mobile number"
                                className={errors?.phoneNumber ? "errorInput" : ""}
                                id="phoneNumber"
                                readOnly // This ensures the email cannot be updated
                                disabled // Disables the field so it's not editable
                            />
                            {errors?.phoneNumber && <p className="errorText">{errors.phoneNumber.message}</p>}
                        </div>
                    </div>

                    {/* <div className="contentCol">
                        <div className={`inputCont full ${errors?.dob ? "error" : ""}`}>
                            <label htmlFor="dob">Date of Birth<span className="required">*</span></label>
                            <input
                                {...register("dob")}
                                type="date"
                                className={errors?.dob ? "errorInput" : ""}
                                id="dob"
                            />
                            {errors?.dob && <p className="errorText">{errors.dob.message}</p>}
                        </div>
                    </div>

                    <div className="contentCol">
                        <div className={`inputCont full ${errors?.nationality ? "error" : ""}`}>
                            <label htmlFor="nationality">Nationality<span className="required">*</span></label>
                            <input
                                {...register("nationality")}
                                type="text"
                                placeholder="Enter your nationality"
                                className={errors?.nationality ? "errorInput" : ""}
                                id="nationality"
                            />
                            {errors?.nationality && <p className="errorText">{errors.nationality.message}</p>}
                        </div>
                    </div> */}
                </div>

                <div className="btnCont">
                    <button
                        type="submit"
                        disabled={!isValid || updateUserMutation?.isPending}
                        className={`themeBtn large ${!isValid || updateUserMutation?.isPending ? "disabled" : ""}`}
                    >
                        {updateUserMutation?.isPending ? <Spinner /> : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Page;
