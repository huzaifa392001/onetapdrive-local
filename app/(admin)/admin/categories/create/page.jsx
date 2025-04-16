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
import Spinner from '@/Components/Spinner/Spinner';

function Page() {
    const router = useRouter()
    const [formData, setFormData] = useState(new FormData());
    const init = {
        categoryImage: null,
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
            router.push("/admin/categories")
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
        if (formValues.categoryImage && formValues.categoryImage instanceof File) {
            const updatedFormData = new FormData();
            updatedFormData.append("file", formValues.categoryImage);
            setFormData(updatedFormData);
        }
    }, [formValues.categoryImage]);

    const onSubmit = async (data) => {

        // Append other fields
        formData.append("name", data.categoryTitle);
        formData.append("titles", data.categoryTitle);
        formData.append("description", data.categoryTitle);

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

                    <div className="inputCont btnCont">
                        <button disabled={!isValid || categoryMutation.isPending} type="submit" className={`themeBtn ${!isValid ? "disabled" : ""} ${categoryMutation.isPending ? "disabled" : ""}`}>
                            {categoryMutation.isPending ? <Spinner /> : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Page;