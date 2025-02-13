"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminDataTable from "@/Components/AdminComponents/AdminTable/adminTable";
import SecHeading from "@/Components/SecHeading/SecHeading";
import Link from "next/link";
import axios from "axios";
import { useSelector } from "react-redux";
import API from "@/Services/Constants/api";
import { getBrands } from "@/Services/AdminServices/AdminServices";

const fetchBrands = async () => {
    return await API
        .get("/brands")
        .then((res) => {
            return res.data?.data || [];
        });
}

function Page() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["brands"],
        queryFn: getBrands,
    });

    if (isLoading) return <p>Loading brands...</p>;
    if (error) return <p>Error fetching brands: {error.message}</p>;

    return (
        <>
            <div className="headingCont">
                <SecHeading heading="Brands" />
                <Link href="brands/create" className="themeBtn">
                    Create
                </Link>
            </div>
            <AdminDataTable data={data} showAction={true} />
        </>
    );
}

export default Page;
