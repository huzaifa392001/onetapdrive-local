"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SecHeading from "@/Components/SecHeading/SecHeading";
import { pageName } from "@/Utils/Utils";
import FormGroup from "@/Components/FormGroup";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { requiredValidation } from "@/Utils/validation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Spinner from "@/Components/Spinner/Spinner";
import { addModel } from "@/Services/AdminServices/AdminModels";
import { getBrands } from "@/Services/AdminServices/AdminBrand";
import { getAllBodyTypes } from "@/Services/AdminServices/AdminBodyTypes";

function Page() {
    const router = useRouter();
    const [formData, setFormData] = useState(new FormData());
    const { data: brandsData } = useQuery({
        queryKey: ["brands"],
        queryFn: getBrands
    });

    const { data: bodyTypesData } = useQuery({
        queryKey: ["bodyTypes"],
        queryFn: getAllBodyTypes
    });

    const init = {
        modelImage: null,
        modelTitle: "",
        brandId: null,
        bodyTypeId: null
    };

    const schema = yup
        .object({
            modelImage: yup.string().required(requiredValidation),
            modelTitle: yup.string().required(requiredValidation),
            brandId: yup
                .object({
                    label: yup.string().required(requiredValidation),
                    value: yup.string().required(requiredValidation)
                })
                .required(requiredValidation),
            bodyTypeId: yup
                .object({
                    label: yup.string().required(requiredValidation),
                    value: yup.string().required(requiredValidation)
                })
                .required(requiredValidation)
        })
        .required();

    const brandMutation = useMutation({
        mutationFn: addModel,
        onSuccess: (res) => {
            if (res?.success === false) {
                toast.error(res?.message || "Failed to add Brand");
                return;
            }
            toast.success(res?.message);
            router.push("/admin/models");
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || error?.message || "Failed to add Brand";
            toast.error(errorMessage);
        }
    });

    const [fields, setFields] = useState([
        {
            type: "file",
            name: "modelImage",
            multiple: false,
            accept: {
                "image/jpeg": [],
                "image/png": [],
                "image/webp": []
            },
            uploadLabel: "Upload Model Image"
        },
        {
            type: "input",
            name: "modelTitle",
            placeholder: "Enter Model Title",
            label: "Model Title",
            inputtype: "text",
            req: true
        },
        {
            type: "select",
            name: "brandId",
            label: "Brand",
            placeholder: "Select Brand",
            multiSelect: false,
            req: true,
            options:
                brandsData?.data?.map((item) => ({
                    name: item?.brand_name,
                    id: item?.brand_id
                })) || []
        },
        {
            type: "select",
            name: "bodyTypeId",
            label: "Body Type",
            placeholder: "Select Body Type",
            multiSelect: false,
            req: true,
            options:
                bodyTypesData?.data?.map((item) => ({
                    name: item?.bodyType_name,
                    id: item?.bodyType_id
                })) || []
        }
    ]);

    useEffect(() => {
        setFields([
            {
                type: "file",
                name: "modelImage",
                multiple: false,
                accept: {
                    "image/jpeg": [],
                    "image/png": [],
                    "image/webp": []
                },
                uploadLabel: "Upload Model Image"
            },
            {
                type: "input",
                name: "modelTitle",
                placeholder: "Enter Model Title",
                label: "Model Title",
                inputtype: "text",
                req: true
            },
            {
                type: "select",
                name: "brandId",
                label: "Brand",
                placeholder: "Select Brand",
                multiSelect: false,
                search: true,
                req: true,
                options:
                    brandsData?.data?.map((item) => ({
                        name: item?.brand_name,
                        id: item?.brand_id
                    })) || []
            },
            {
                type: "select",
                name: "bodyTypeId",
                label: "Body Type",
                placeholder: "Select Body Type",
                multiSelect: false,
                search: true,
                req: true,
                options:
                    bodyTypesData?.data?.map((item) => ({
                        name: item?.bodyType_name,
                        id: item?.bodyType_id
                    })) || []
            }
        ]);
    }, [brandsData, bodyTypesData]);

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        watch
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: init,
        mode: "onChange"
    });

    const formValues = watch();

    useEffect(() => {
        if (formValues.modelImage && formValues.modelImage instanceof File) {
            const updatedFormData = new FormData();
            updatedFormData.append("file", formValues.modelImage);
            setFormData(updatedFormData);
        }
    }, [formValues.modelImage]);

    const onSubmit = async (data) => {
        formData.append("name", data.modelTitle);
        formData.append("brandId", data.brandId.value);
        formData.append("bodyTypeId", data.bodyTypeId.value);
        brandMutation.mutate(formData);
    };

    return (
        <>
            <div className="formWrapper">
                <form className="formContainer" onSubmit={handleSubmit(onSubmit)}>
                    <div className="headingCont">
                        <SecHeading heading={`${pageName()}`} />
                    </div>
                    {fields?.map((item, i) => (
                        <FormGroup key={i} item={item} control={control} errors={errors} />
                    ))}

                    <div className="inputCont btnCont">
                        <button
                            disabled={!isValid || brandMutation.isPending}
                            type="submit"
                            className={`themeBtn ${!isValid ? "disabled" : ""} ${
                                brandMutation.isPending ? "disabled" : ""
                            }`}
                            onClick={() =>
                                console.log("Button clicked, isValid:", isValid, "isPending:", brandMutation.isPending)
                            }
                        >
                            {brandMutation.isPending ? <Spinner /> : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Page;
