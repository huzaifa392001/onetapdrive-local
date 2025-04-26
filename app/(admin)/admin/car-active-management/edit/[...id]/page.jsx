"use client";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormGroup from "@/Components/FormGroup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editCarRefresh } from "@/Services/AdminServices/AdminServices";
import { getCarRefresh } from "@/Services/AdminServices/AdminServices";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Spinner from "@/Components/Spinner/Spinner";
import "./edit.scss";
import { useRow } from "@/contexts/RowContext";

const Page = ({ params: asyncParams }) => {
    const { selectedRow } = useRow();
    const { id } = use(asyncParams);
    const router = useRouter();
    const [selectedCompany, setSelectedCompany] = useState(null);
    const schema = yup.object({
        numberOfActiveCar: yup
            .number()
            .typeError("Number must be a number")
            .min(1, "At least 1 active no. required")
            .required("Active no. count is required"),
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            companyName: "",
            numberOfActiveCar: "",
        },
    });

    useEffect(() => {
        if (selectedRow) {
            setValue("companyName", selectedRow.company_name);
            setValue("numberOfActiveCar", selectedRow.total_quantity);
        }
    }, [selectedRow, setValue]);

    const fields = [
        {
            type: "input",
            name: "companyName",
            placeholder: "Company Name",
            label: "Company Name",
            inputtype: "text",
            req: true,
            colWidth: "col_md_6",
            disabled: true,
        },
        {
            type: "input",
            name: "numberOfActiveCar",
            placeholder: "Enter the Number",
            label: "No of ActiveCar",
            inputtype: "number",
            req: true,
            colWidth: "col_md_6",
        },
    ];

    const resetMutation = useMutation({
        mutationFn: editCarRefresh,
        onSuccess: () => {
            toast.success("Updated successfully!");
            router.back();
        },
        onError: (error) => {
            toast.error(error?.message || "Update failed");
        },
    });

    const onSubmit = (data) => {
        const quantity = parseInt(data.numberOfActiveCar, 10);

        if (isNaN(quantity)) {
            toast.error("Please enter a valid number.");
            return;
        }

        const body = {
            quantity,
            id
        };

        resetMutation.mutate(body);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="resetPassword">
            {fields.map((item, i) => (
                <FormGroup key={i} item={item} control={control} errors={errors} />
            ))}
            <div className="inputWrap">
                <button
                    className={`themeBtn ${!isValid ? "disabled" : ""}`}
                    type="submit"
                    disabled={!isValid}
                >
                    {resetMutation.isPending ? <Spinner /> : "Update"}
                </button>
                <button
                    type="button"
                    className="themeBtn cancelBtn"
                    onClick={() => router.back()}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default Page;
