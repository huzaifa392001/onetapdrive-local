"use client";
import React, { useEffect, useState } from "react";
import AdminDataTable from "@/Components/AdminComponents/AdminTable/adminTable";
import SecHeading from "@/Components/SecHeading/SecHeading";
import Link from "next/link";
import { getAllVendors } from "@/Services/AdminServices/AdminServices";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/Components/Loading/Loading";

const Page = () => {
    const [vendorData, setVendorData] = useState([]);

    const { data: vendorsApiData, isPending, refetch } = useQuery({
        queryKey: ["vendors"],
        queryFn: getAllVendors,
    });

    useEffect(() => {
        const transformed = vendorsApiData?.data?.map(item => ({
            id: item.userId,
            name: item?.user?.firstName,
            companyName: item?.companyName,
            email: item?.user?.email,
            phoneNumber: item?.user?.phoneNumber,
            leadGenerated: item.lead_count,
            status: item.user?.status,
        }));
        setVendorData(transformed);
    }, [vendorsApiData]);

    if (isPending) return <Loading />

    return (
        <>
            <div className="headingCont">
                <SecHeading heading="Vendor Management" />
                <Link href="vendor-management/create" className="themeBtn">
                    Create
                </Link>
            </div>
            <AdminDataTable data={vendorData} showUserAction refetchData={refetch} />
        </>
    );
};

export default Page;
