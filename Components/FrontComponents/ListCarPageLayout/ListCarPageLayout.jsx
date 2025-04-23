"use client";
import React, { memo, useEffect, useState } from "react";
import "./ListCarPageLayout.scss";
import { useForm } from "react-hook-form";
import Image from "next/image";
import SecHeading from "@/Components/SecHeading/SecHeading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { vendorSignup } from "@/Services/AuthService/AuthService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Spinner from "@/Components/Spinner/Spinner";

function ListCarPageLayout() {
    const router = useRouter();
    const [companyLogoPreview, setCompanyLogoPreview] = useState(null);
    const [companyLicensePreview, setCompanyLicensePreview] = useState(null);
    const [companyLogoFile, setCompanyLogoFile] = useState(null);
    const [companyLicenseFile, setCompanyLicenseFile] = useState(null);

    const handleImageChange = (e, setPreview, setFile, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            const blob = new Blob([file], { type: file.type });
            const url = URL.createObjectURL(blob);
            setPreview(url);
            setFile(file);
            setValue(fieldName, file);
        }
    };

    const handleDeleteImage = (setPreview, setFile, fieldName) => {
        setPreview("");
        setFile(null);
        setValue(fieldName, null);
    };

    const signupMutation = useMutation({
        mutationFn: vendorSignup,
        onSuccess: (data) => {
            console.log("data=> ", data);
            toast.success(data?.message);
            // Reset form
            reset();
            setCompanyLogoFile();
            setCompanyLicenseFile();
            // Redirect will be handled in the service
            router.push("/vendor-login");
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
        password: "",
        confirmPassword: "",
        companyName: "",
        companyType: "",
        jobTitle: "",
        companyLogo: null,
        companyLicense: null,
        licenseExpiryDate: "",
        countryId: "United Arab Emirates",
        cityId: ""
    };

    const schema = yup.object().shape({
        fullName: yup.string().required("Full Name is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        phoneNumber: yup.string().required("Phone Number is required"),
        whatsappNumber: yup.string().required("WhatsApp Number is required"),
        password: yup.string().required("Password is required"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Passwords must match")
            .required("Confirm Password is required"),
        companyName: yup.string().required("Company Name is required"),
        companyType: yup.string().required("Company Type is required"),
        jobTitle: yup.string().required("Job Title is required"),
        companyLogo: yup.mixed().required("Company Logo is required"),
        companyLicense: yup.mixed().required("Company License is required"),
        licenseExpiryDate: yup.string().required("License Expiry Date is required"),
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

    const companyLogo = watch("companyLogo");
    const companyLicense = watch("companyLicense");

    useEffect(() => {
        if (companyLogo && companyLogo[0]) {
            const url = URL.createObjectURL(companyLogo[0]);
            setCompanyLogoPreview(url);
        }
    }, [companyLogo]);

    useEffect(() => {
        if (companyLicense && companyLicense[0]) {
            const url = URL.createObjectURL(companyLicense[0]);
            setCompanyLicensePreview(url);
        }
    }, [companyLicense]);

    const onSubmit = async (data) => {
        const firstName = data.fullName.split(" ")[0].toLowerCase();
        const carTerms = ["driver", "rider", "wheels", "cars", "auto", "drive"];
        const randomCarTerm = carTerms[Math.floor(Math.random() * carTerms.length)];
        const randomNum = Math.floor(Math.random() * 900) + 100;
        const username = `${firstName}${randomCarTerm}${randomNum}`;

        const formData = new FormData();
        formData.append("firstName", data.fullName);
        formData.append("username", username);
        formData.append("email", data.email);
        formData.append("phoneNumber", data.phoneNumber);
        formData.append("password", data.password);
        formData.append("whatsappNumber", data.whatsappNumber);
        formData.append("companyName", data.companyName);
        formData.append("companyType", data.companyType);
        formData.append("jobTitle", data.jobTitle);

        // Handle file objects
        if (companyLogoFile) {
            formData.append("companyLogo", companyLogoFile);
        }
        if (companyLicenseFile) {
            formData.append("tradeLicense", companyLicenseFile);
        }

        formData.append("licenseExpiryDate", data.licenseExpiryDate);
        formData.append("countryId", 1);
        formData.append("cityId", 2);

        signupMutation.mutate(formData);
    };

    const images = new Array(12).fill("");

    // Add this to check if all required fields are filled
    const isFormValid = () => {
        const requiredFields = [
            "fullName",
            "email",
            "phoneNumber",
            "whatsappNumber",
            "password",
            "confirmPassword",
            "companyName",
            "companyType",
            "jobTitle",
            "companyLogo",
            "companyLicense",
            "licenseExpiryDate",
            "countryId",
            "cityId"
        ];

        return requiredFields.every((field) => {
            const value = watch(field);
            return value !== null && value !== undefined && value !== "";
        });
    };

    return (
        <>
            <section className="joinNow">
                <div className="customContainer">
                    <div className="contentRow">
                        <div className="contentCol">
                            <div className="content">
                                <SecHeading heading="JOIN NOW" />
                                <p>
                                    Join OneTapDrive to profit from over 1 million page views every month, with more
                                    than 50,000 quality leads sent to car rental companies and brokers all across the
                                    world.
                                </p>
                                <ul>
                                    <li>
                                        <i className="fas fa-check"></i> Get direct leads via phone, SMS and emails.
                                    </li>
                                    <li>
                                        <i className="fas fa-check"></i> Full training provided for your staff to use
                                        the CMS.
                                    </li>
                                    <li>
                                        <i className="fas fa-check"></i> Assistance from your dedicated Account Manager.
                                    </li>
                                    <li>
                                        <i className="fas fa-check"></i> Tools and resources to plan your marketing
                                        strategy.
                                    </li>
                                    <li>
                                        <i className="fas fa-check"></i> Exclusive member benefits
                                    </li>
                                </ul>
                            </div>
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
                                            />
                                            {errors?.email && <p className="errorText">{errors.email.message}</p>}
                                        </div>
                                    </div>
                                    <div className="contentCol">
                                        <div className={`inputCont full ${errors?.phoneNumber ? "error" : ""}`}>
                                            <label htmlFor="phoneNumber">
                                                Phone Number<span className="required">*</span>
                                            </label>
                                            <input
                                                className={`${errors?.phoneNumber ? "errorInput" : ""}`}
                                                {...register("phoneNumber")}
                                                type="tel"
                                                placeholder="Enter Phone Number"
                                                id="phoneNumber"
                                            />
                                            {errors?.phoneNumber && (
                                                <p className="errorText">{errors.phoneNumber.message}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="contentCol">
                                        <div className={`inputCont full ${errors?.whatsappNumber ? "error" : ""}`}>
                                            <label htmlFor="whatsappNumber">
                                                WhatsApp Number<span className="required">*</span>
                                            </label>
                                            <input
                                                className={`${errors?.whatsappNumber ? "errorInput" : ""}`}
                                                {...register("whatsappNumber")}
                                                type="tel"
                                                placeholder="Enter WhatsApp Number"
                                                id="whatsappNumber"
                                            />
                                            {errors?.whatsappNumber && (
                                                <p className="errorText">{errors.whatsappNumber.message}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="contentCol">
                                        <div className={`inputCont full ${errors?.password ? "error" : ""}`}>
                                            <label htmlFor="password">
                                                Create a Password<span className="required">*</span>
                                            </label>
                                            <input
                                                className={`${errors?.password ? "errorInput" : ""}`}
                                                {...register("password")}
                                                type="password"
                                                placeholder="Enter Password"
                                                id="password"
                                            />
                                            {errors?.password && <p className="errorText">{errors.password.message}</p>}
                                        </div>
                                    </div>
                                    <div className="contentCol">
                                        <div className={`inputCont full ${errors?.confirmPassword ? "error" : ""}`}>
                                            <label htmlFor="confirmPassword">
                                                Confirm Password<span className="required">*</span>
                                            </label>
                                            <input
                                                className={`${errors?.confirmPassword ? "errorInput" : ""}`}
                                                {...register("confirmPassword")}
                                                type="password"
                                                placeholder="Confirm Password"
                                                id="confirmPassword"
                                            />
                                            {errors?.confirmPassword && (
                                                <p className="errorText">{errors.confirmPassword.message}</p>
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
                                                <option value="Dubai">Dubai</option>
                                                <option value="Abu Dhabi">Abu Dhabi</option>
                                                <option value="Sharjah">Sharjah</option>
                                                <option value="Ajman">Ajman</option>
                                                <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                                                <option value="Fujairah">Fujairah</option>
                                                <option value="Umm Al Quwain">Umm Al Quwain</option>
                                                <option value="Al Ain">Al Ain</option>
                                            </select>
                                            {errors?.cityId && <p className="errorText">{errors.cityId.message}</p>}
                                        </div>
                                    </div>
                                    <div className="contentCol">
                                        <div className={`inputCont img ${errors?.companyLogo ? "error" : ""}`}>
                                            <label htmlFor="companyLogo">
                                                Company Logo<span className="required">*</span>
                                            </label>
                                            <div className="imgInput">
                                                {companyLogoPreview ? (
                                                    <div className="imgBox">
                                                        <Image
                                                            src={companyLogoPreview || "/images/noImage.jpg"}
                                                            width={300}
                                                            height={80}
                                                            alt="Company Logo"
                                                        />
                                                        <div className="actions">
                                                            <button
                                                                onClick={() =>
                                                                    handleDeleteImage(
                                                                        setCompanyLogoPreview,
                                                                        setCompanyLogoFile,
                                                                        "companyLogo"
                                                                    )
                                                                }
                                                            >
                                                                <i className="fas fa-trash" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <label htmlFor="companyLogo">
                                                        Click to Upload
                                                        <input
                                                            {...register("companyLogo", {
                                                                required: "Company Logo is Required"
                                                            })}
                                                            type="file"
                                                            accept="image/png,image/jpeg,image/jpg,application/pdf"
                                                            id="companyLogo"
                                                            onChange={(e) =>
                                                                handleImageChange(
                                                                    e,
                                                                    setCompanyLogoPreview,
                                                                    setCompanyLogoFile,
                                                                    "companyLogo"
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                        <p className="small">Only &quot;PNG, JPG, JPEG, and PDF&quot; are accepted</p>
                                        {errors?.companyLogo && (
                                            <p className="errorText">{errors?.companyLogo?.message}</p>
                                        )}
                                    </div>
                                    <div className="contentCol">
                                        <div className={`inputCont img ${errors?.companyLicense ? "error" : ""}`}>
                                            <label htmlFor="companyLicense">
                                                Company License<span className="required">*</span>
                                            </label>
                                            <div className="imgInput">
                                                {companyLicensePreview ? (
                                                    <div className="imgBox">
                                                        <Image
                                                            src={companyLicensePreview}
                                                            width={300}
                                                            height={80}
                                                            alt="Company License"
                                                        />
                                                        <div className="actions">
                                                            <button
                                                                onClick={() =>
                                                                    handleDeleteImage(
                                                                        setCompanyLicensePreview,
                                                                        setCompanyLicenseFile,
                                                                        "companyLicense"
                                                                    )
                                                                }
                                                            >
                                                                <i className="fas fa-trash" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <label htmlFor="companyLicense">
                                                        Click to Upload
                                                        <input
                                                            {...register("companyLicense", {
                                                                required: "Company License is Required"
                                                            })}
                                                            type="file"
                                                            accept="image/png,image/jpeg,image/jpg,application/pdf"
                                                            id="companyLicense"
                                                            onChange={(e) =>
                                                                handleImageChange(
                                                                    e,
                                                                    setCompanyLicensePreview,
                                                                    setCompanyLicenseFile,
                                                                    "companyLicense"
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                        <p className="small">Only &quot;PNG, JPG, JPEG, and PDF&quot; are accepted</p>
                                        {errors?.companyLicense && (
                                            <p className="errorText">{errors?.companyLicense?.message}</p>
                                        )}
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
                                    <div className="contentCol">
                                        <div className={`inputCont full ${errors?.licenseExpiryDate ? "error" : ""}`}>
                                            <label htmlFor="licenseExpiryDate">
                                                License Expiry Date
                                                <span className="required">*</span>
                                            </label>
                                            <input
                                                className={`${errors?.licenseExpiryDate ? "errorInput" : ""}`}
                                                {...register("licenseExpiryDate", {
                                                    required: "License Expiry Date is required."
                                                })}
                                                type="date"
                                                id="licenseExpiryDate"
                                            />

                                            {errors?.licenseExpiryDate ? (
                                                <p className="errorText">{errors.licenseExpiryDate.message}</p>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="btnCont">
                                    <button
                                        type="submit"
                                        disabled={!isFormValid() || signupMutation.isPending}
                                        className={`themeBtn large ${!isFormValid() || signupMutation.isPending ? "disabled" : ""}`}
                                    >
                                        {signupMutation?.isPending ? <Spinner /> : 'Submit'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section className="gallerySec">
                <div className="imagesGrid">
                    {images.map((_, index) => (
                        <figure key={index}>
                            <Image src={`/images/cars/${index + 1}.webp`} alt={`gallery image ${index + 1}`} fill />
                        </figure>
                    ))}
                </div>
            </section>
        </>
    );
}

export default memo(ListCarPageLayout);
