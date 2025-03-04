'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import SecHeading from '@/Components/SecHeading/SecHeading';
import { pageName } from '@/Utils/Utils';
import FormGroup from '@/Components/FormGroup';
import { useMutation } from '@tanstack/react-query';
import { addCategory } from '@/Services/AdminServices/AdminCategories';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { requiredValidation } from '@/Utils/validation';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function Page() {
    const router = useRouter()
    const init = {
        categoryImage: null, // ✅ File field should be null initially
        categoryTitle: "",
    };


    const schema = yup
        .object({
            categoryImage: yup.string().required(requiredValidation),
            categoryTitle: yup.string().required(requiredValidation),
        })
        .required();

    const categoryMutation = useMutation({
        mutationFn: addCategory,
        onSuccess: (res) => {
            toast.success(res?.message)
            // router.back()
        },
        onError: (error) => {
            toast.error(`Failed to add category: ${error}`);
        }
    })

    const fields = [
        {
            type: "file",
            name: "categoryImage",
            multiple: false,
            accept: {
                "image/jpeg": [],
                "image/png": [],
                "image/webp": [],
            },
            uploadLabel: "Upload Category Image",
        },
        {
            type: "input",
            name: "categoryTitle",
            placeholder: "Enter Category Title",
            label: "Category Title",
            inputtype: "text",
            req: true,
        },
    ];

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: init,
    });

    const formValues = watch();

    useEffect(() => {
        if (formValues.profilePic && formValues.profilePic instanceof File) {
            const updatedFormData = new FormData();
            updatedFormData.append("profile_picture", formValues.profilePic);
            setFormData(updatedFormData);
        }
    }, [formValues.profilePic]); // 👈 Only update when profilePic changes

    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append("name", data.categoryTitle);
        formData.append("titles", data.categoryTitle);
        formData.append("description", data.categoryTitle);

        if (data.categoryImage && data.categoryImage[0]) {
            formData.append("categoryImage", data.categoryImage[0]); // File object pass karna zaroori hai
        } else {
            toast.error("Category Image is required");
            return;
        }

        console.log("Submitting Data: ", Object.fromEntries(formData.entries()));
        categoryMutation.mutate(formData);
    };



    return (
        <>
            <div className="formWrapper">
                <form className='formContainer' onSubmit={handleSubmit(onSubmit)}>
                    <div className="headingCont">
                        <SecHeading heading={`${pageName()}`} />
                    </div>
                    {fields?.map((item, i) => (
                        <FormGroup
                            key={i}
                            item={item}
                            control={control}
                            errors={errors}
                        />
                    ))}
                    {/* <div className="divider" />
                    <h3>Category Page</h3>
                    <div className="inputCont">
                        <label htmlFor="pageHeading">Page Heading</label>
                        <input
                            id="pageHeading"
                            placeholder="Enter Category's Page heading"
                            type="text"
                            {...register('pageHeading', { required: true })}
                        />
                        {errors.pageHeading && <span>This field is required</span>}
                    </div>
                    <div className="inputCont">
                        <label htmlFor="pageDescription">Page Description</label>
                        <textarea
                            id="pageDescription"
                            placeholder="Enter Category's Page Description"
                            {...register('pageDescription', { required: true })}
                            rows={7}
                        />
                        {errors.pageDescription && <span>This field is required</span>}
                    </div> */}
                    <div className="inputCont btnCont">
                        <button disabled={!isValid} type="submit" className={`themeBtn ${!isValid ? "disabled" : ""}`}>
                            Submit
                        </button>
                    </div>
                </form>
                {/* <div className="preview">
                    <div className="previewBox">
                        <h2 className='heading'>Preview</h2>
                        <figure>
                            {categoryImage ? (
                                <Image src={categoryImage} alt="Category Image" fill />
                            ) : (
                                <p>No Image Selected</p>
                            )}
                        </figure>
                        <h2>{watch('categoryTitle') || 'Category Name'}</h2>
                        <div className="headingLayout">
                            <h3>{watch('pageHeading') || "Category's Page Heading"}</h3>
                            <p>{watch('pageDescription') || "Category's Page Description"}</p>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    );
}

export default Page;