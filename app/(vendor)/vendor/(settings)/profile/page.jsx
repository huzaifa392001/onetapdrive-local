"use client";
import React, { memo, useEffect, useState } from "react";
import "./index.scss";
import { useForm } from "react-hook-form";
import SecHeading from "@/Components/SecHeading/SecHeading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCurrentUser, updateVendor } from "@/Services/AuthService/AuthService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Spinner from "@/Components/Spinner/Spinner";
import { useSelector } from "react-redux";

function Page() {
    const { data: vendor } = useQuery({
        queryKey: ['vendor'],
        queryFn: getCurrentUser
    });

    const router = useRouter();
    const [phoneCountryCode, setPhoneCountryCode] = useState("+971"); // Default UAE code
    const [whatsappCountryCode, setWhatsappCountryCode] = useState("+971"); // Default UAE code
    const cities = useSelector((state) => state.car.cities);

    const updateVendorMutation = useMutation({
        mutationFn: updateVendor,
        onSuccess: (data) => {
            console.log("data=> ", data);
            toast.success(data?.message);
            reset();
            router.push("/vendor");
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

    const defaultValues = {
        fullName: "",
        email: "",
        phoneNumber: "",
        whatsappNumber: "",
        companyName: "",
        companyType: "",
        jobTitle: "",
        countryId: "United Arab Emirates",
        cityId: ""
    };

    const schema = yup.object().shape({
        fullName: yup.string().required("Full Name is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        phoneNumber: yup.string().required("Phone Number is required"),
        whatsappNumber: yup.string().required("WhatsApp Number is required"),
        companyName: yup.string().required("Company Name is required"),
        companyType: yup.string().required("Company Type is required"),
        jobTitle: yup.string().required("Job Title is required"),
        countryId: yup.string().required("Country is required"),
        cityId: yup.string().required("City is required")
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch,
        reset
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
        mode: "onChange"
    });

    const onSubmit = async (data) => {
        const firstName = data.fullName.split(" ")[0].toLowerCase();
        const carTerms = ["driver", "rider", "wheels", "cars", "auto", "drive"];
        const randomCarTerm = carTerms[Math.floor(Math.random() * carTerms.length)];
        const randomNum = Math.floor(Math.random() * 900) + 100;
        const username = `${firstName}${randomCarTerm}${randomNum}`;

        const formData = new FormData();
        formData.append("firstName", data.fullName);
        formData.append("username", username);
        formData.append("phoneNumber", `${phoneCountryCode}${data.phoneNumber}`);
        formData.append("whatsappNumber", `${whatsappCountryCode}${data.whatsappNumber}`);
        formData.append("companyName", data.companyName);
        formData.append("companyType", data.companyType);
        formData.append("jobTitle", data.jobTitle);
        formData.append("countryId", 1); // United Arab Emirates country ID
        formData.append("cityId", data.cityId); // Use the selected city ID

        updateVendorMutation.mutate(formData);
    };

    const isFormValid = () => {
        const requiredFields = [
            "fullName",
            "phoneNumber",
            "whatsappNumber",
            "companyName",
            "companyType",
            "jobTitle",
            "countryId",
            "cityId"
        ];

        return requiredFields.every((field) => {
            const value = watch(field);
            return value !== null && value !== undefined && value !== "";
        });
    };

    useEffect(() => {
        if (vendor?.data?.user) {
            const userData = vendor.data.user;
            const vendorProfile = userData.vendorProfile;
            console.log("userData=> ", userData)
            if (vendorProfile) {
                setValue("fullName", userData.firstName || "");
                setValue("email", userData.email || "");

                const phoneNumber = userData.phoneNumber || "";
                if (phoneNumber && phoneNumber.startsWith("+")) {
                    const countryCode = phoneNumber.substring(0, 4);
                    const number = phoneNumber.substring(4);
                    setPhoneCountryCode(countryCode);
                    setValue("phoneNumber", number);
                } else {
                    setValue("phoneNumber", phoneNumber);
                }

                const whatsapp = vendorProfile.whatsappNumber || "";
                if (whatsapp && whatsapp.startsWith("+")) {
                    const countryCode = whatsapp.substring(0, 4);
                    const number = whatsapp.substring(4);
                    setWhatsappCountryCode(countryCode);
                    setValue("whatsappNumber", number);
                } else {
                    setValue("whatsappNumber", whatsapp);
                }

                setValue("companyName", vendorProfile.companyName || "");
                setValue("companyType", vendorProfile.companyType || "");
                setValue("jobTitle", vendorProfile.jobTitle || "");
                setValue("countryId", "United Arab Emirates");
                setValue("cityId", vendorProfile.cityId.toString());
            }
        }
    }, [vendor, setValue]);

    return (
        <>
            <div className="headingCont">
                <SecHeading heading="Update Profile" />
            </div>
            <div className="contentCol">
                <form className="listForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="contentRow">
                        <div className="contentCol">
                            <div className={`inputCont full ${errors?.fullName ? "error" : ""}`}>
                                <label htmlFor="fullName">
                                    Full Name<span className="required">*</span>
                                </label>
                                <input
                                    className={`${errors?.fullName ? "errorInput" : ""}`}
                                    {...register("fullName")}
                                    type="text"
                                    placeholder="Enter Your Full Name"
                                    id="fullName"
                                />
                                {errors?.fullName && <p className="errorText">{errors.fullName.message}</p>}
                            </div>
                        </div>
                        <div className="contentCol">
                            <div className={`inputCont full ${errors?.email ? "error" : ""}`}>
                                <label htmlFor="email">
                                    Email Address<span className="required">*</span>
                                </label>
                                <input
                                    className={`${errors?.email ? "errorInput" : ""}`}
                                    {...register("email")}
                                    type="email"
                                    placeholder="Enter Email Address"
                                    id="email"
                                    readOnly={true}
                                    disabled={true}
                                />
                                {errors?.email && <p className="errorText">{errors.email.message}</p>}
                            </div>
                        </div>
                        <div className="contentCol">
                            <div className={`inputCont phoneNumber full ${errors?.phoneNumber ? "error" : ""}`}>
                                <label htmlFor="phoneNumber">
                                    Phone Number<span className="required">*</span>
                                </label>
                                <div className="phoneInputWrapper">
                                    <select
                                        className="countryCodeSelect"
                                        value={phoneCountryCode}
                                        onChange={(e) => setPhoneCountryCode(e.target.value)}
                                    >
                                        <option value="+971">+971</option>
                                        <option value="+966">+966</option>
                                        <option value="+974">+974</option>
                                        <option value="+973">+973</option>
                                        <option value="+965">+965</option>
                                        <option value="+968">+968</option>
                                    </select>
                                    <input
                                        className={`${errors?.phoneNumber ? "errorInput" : ""}`}
                                        {...register("phoneNumber")}
                                        type="tel"
                                        placeholder="Enter Phone Number"
                                        id="phoneNumber"
                                    />
                                </div>
                                {errors?.phoneNumber && (
                                    <p className="errorText">{errors.phoneNumber.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="contentCol">
                            <div className={`inputCont phoneNumber full ${errors?.whatsappNumber ? "error" : ""}`}>
                                <label htmlFor="whatsappNumber">
                                    WhatsApp Number<span className="required">*</span>
                                </label>
                                <div className="phoneInputWrapper">
                                    <select
                                        className="countryCodeSelect"
                                        value={whatsappCountryCode}
                                        onChange={(e) => setWhatsappCountryCode(e.target.value)}
                                    >
                                        <option value="+971">+971</option>
                                        <option value="+966">+966</option>
                                        <option value="+974">+974</option>
                                        <option value="+973">+973</option>
                                        <option value="+965">+965</option>
                                        <option value="+968">+968</option>
                                    </select>
                                    <input
                                        className={`${errors?.whatsappNumber ? "errorInput" : ""}`}
                                        {...register("whatsappNumber")}
                                        type="tel"
                                        placeholder="Enter WhatsApp Number"
                                        id="whatsappNumber"
                                    />
                                </div>
                                {errors?.whatsappNumber && (
                                    <p className="errorText">{errors.whatsappNumber.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="contentCol">
                            <div className={`inputCont full ${errors?.companyName ? "error" : ""}`}>
                                <label htmlFor="companyName">
                                    Company Name<span className="required">*</span>
                                </label>
                                <input
                                    className={`${errors?.companyName ? "errorInput" : ""}`}
                                    {...register("companyName")}
                                    type="text"
                                    placeholder="Enter Company Name"
                                    id="companyName"
                                />
                                {errors?.companyName && (
                                    <p className="errorText">{errors.companyName.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="contentCol">
                            <div className={`inputCont ${errors?.companyType ? "error" : ""}`}>
                                <label htmlFor="companyType">
                                    Company Type<span className="required">*</span>
                                </label>
                                <select
                                    id="companyType"
                                    {...register("companyType")}
                                    className={`${errors?.companyType ? "errorInput" : ""}`}
                                >
                                    <option value="">Select Company Type</option>
                                    <option value="rental_service">Rental Service</option>
                                    <option value="car_with_driver">Car with Driver Service</option>
                                </select>
                                {errors?.companyType && (
                                    <p className="errorText">{errors.companyType.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="contentCol">
                            <div className={`inputCont ${errors?.countryId ? "error" : ""}`}>
                                <label htmlFor="countryId">
                                    Country<span className="required">*</span>
                                </label>
                                <select
                                    id="countryId"
                                    {...register("countryId")}
                                    className={`${errors?.countryId ? "errorInput" : ""}`}
                                    disabled
                                >
                                    <option value="United Arab Emirates">United Arab Emirates</option>
                                </select>
                                {errors?.countryId && (
                                    <p className="errorText">{errors.countryId.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="contentCol">
                            <div className={`inputCont ${errors?.cityId ? "error" : ""}`}>
                                <label htmlFor="cityId">
                                    City<span className="required">*</span>
                                </label>
                                <select
                                    id="cityId"
                                    {...register("cityId")}
                                    className={`${errors?.cityId ? "errorInput" : ""}`}
                                >
                                    <option value="">Select City</option>
                                    {cities && cities.length > 0 ? (
                                        cities.map((city) => (
                                            <option key={city.id} value={city.id.toString()}>
                                                {city.name}
                                            </option>
                                        ))
                                    ) : (
                                        <>
                                            <option value="1">Dubai</option>
                                            <option value="2">Abu Dhabi</option>
                                            <option value="6">Sharjah</option>
                                            <option value="4">Ajman</option>
                                            <option value="7">Ras Al Khaimah</option>
                                            <option value="3">Fujairah</option>
                                            <option value="8">Umm Al Qwain</option>
                                            <option value="5">Al Ain</option>
                                        </>
                                    )}
                                </select>
                                {errors?.cityId && <p className="errorText">{errors.cityId.message}</p>}
                            </div>
                        </div>
                        <div className="contentCol">
                            <div className={`inputCont full ${errors?.jobTitle ? "error" : ""}`}>
                                <label htmlFor="jobTitle">
                                    Job Title<span className="required">*</span>
                                </label>
                                <input
                                    className={`${errors?.jobTitle ? "errorInput" : ""}`}
                                    {...register("jobTitle")}
                                    type="text"
                                    placeholder="Enter Job Title"
                                    id="jobTitle"
                                />
                                {errors?.jobTitle && <p className="errorText">{errors.jobTitle.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="btnCont">
                        <button
                            type="submit"
                            disabled={!isFormValid() || updateVendorMutation.isPending}
                            className={`themeBtn large ${!isFormValid() || updateVendorMutation.isPending ? "disabled" : ""}`}
                        >
                            {updateVendorMutation?.isPending ? <Spinner /> : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Page;