"use client";
import React, { useEffect, useState } from "react";
import SecHeading from "@/Components/SecHeading/SecHeading";
import Link from "next/link";
import AdminDataTable from "@/Components/AdminComponents/AdminTable/adminTable";
import { useQuery } from "@tanstack/react-query";
import { deleteCategory, getCategories } from "@/Services/AdminServices/AdminCategories";

function Page() {
    const [categoriesData, setCategoriesData] = useState([]);

    const { data: categories, refetch } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories
    });

    // Function to refetch categories after delete
    const refetchCategories = () => {
        refetch();
    };

    useEffect(() => {
        setCategoriesData([]);
        categories?.data?.map((item) => {
            const updatedItem = {
                id: item?.category_id,
                name: item?.category_name,
                image: item?.category_image
            };
            setCategoriesData((prev) => [...prev, updatedItem]);
        });
    }, [categories]);

    return (
        <>
            <div className="headingCont">
                <SecHeading heading="Categories" />
                <Link href="categories/create" className="themeBtn">
                    Create
                </Link>
            </div>

            <AdminDataTable
                refetchData={refetchCategories}
                deleteFunc={deleteCategory}
                data={categoriesData}
                showAction={true}
            />
        </>
    );
}

export default Page;
