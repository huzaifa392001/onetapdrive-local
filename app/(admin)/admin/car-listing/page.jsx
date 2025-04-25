"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import SecHeading from "@/Components/SecHeading/SecHeading";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/Components/Loading/Loading";
import AdminDataTable from "@/Components/AdminComponents/AdminTable/adminTable";
import "./index.scss";
import { getAdminAllCars } from "@/Services/AdminServices/AdminServices";
import VendorTable from "@/Components/VendorComponents/VendorTable/VendorTable";

const Page = () => {
    const [vendorCarData, setVendorCarData] = useState([]);

    const {
        data: vendorData,
        refetch,
        isPending
    } = useQuery({
        queryKey: ["cars"],
        queryFn: getAdminAllCars
    });

    useEffect(() => {
        const transformedData =
            vendorData?.data?.cars?.map((car) => ({
                id: car.id,
                name: car.name,
                companyName: car.user.vendorProfile.companyName,
                category: car.category?.name || "N/A",
                status: car.status // 👈 Add this line (assuming it's `active` in your response)
            })) || [];

        setVendorCarData(transformedData);
    }, [vendorData]);

    if (isPending) return <Loading />;

    return (
        <>
            <SecHeading heading="All Cars" />
            <div className="listingAddFlex">
                <div className="listingNumbersFlex">
                    <div className="listingNumbers">
                        <h3>Total Listing</h3>
                        <h1>{vendorData?.data?.cars?.length || 0}</h1>
                    </div>
                    <div className="listingNumbers">
                        <h3>Active Listing</h3>
                        <h1>{vendorData?.data?.cars?.reduce((count, car) => (car.active ? count + 1 : count), 0)}</h1>
                    </div>
                </div>
                <Link href="fleet/create" className="themeBtn">
                    Add
                </Link>
            </div>
            <AdminDataTable data={vendorCarData} refetchData={refetch} showAdminCarActions={true} />
        </>
    );
};

export default Page;
