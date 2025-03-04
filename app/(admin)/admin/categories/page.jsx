"use client"
import React from 'react';
import SecHeading from '@/Components/SecHeading/SecHeading';
import Link from 'next/link';
import AdminDataTable from '@/Components/AdminComponents/AdminTable/adminTable';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCategory, getCategories } from '@/Services/AdminServices/AdminCategories';

function Page() {
    const queryClient = useQueryClient();

    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    // Function to refetch categories after delete
    const refetchCategories = () => {
        queryClient.invalidateQueries(["categories"]);
    };

    return (
        <>
            <div className="headingCont">
                <SecHeading heading="Categories" />
                <Link href="categories/create" className='themeBtn'>
                    Create
                </Link>
            </div>

            <AdminDataTable
                refetchData={refetchCategories}
                deleteFunc={deleteCategory}
                data={categories?.data}
                showAction={true}
            />
        </>
    );
}

export default Page;
