"use client";
import React, { useEffect, useState } from "react";
import "./MyFleetLayout.scss";
import VendorTable from "../VendorTable/VendorTable";
import Link from "next/link";
import SecHeading from "@/Components/SecHeading/SecHeading";
import { useQuery } from "@tanstack/react-query";
import { getVendorCars } from "@/Services/VendorServices/VendorServices";
import Loading from "@/Components/Loading/Loading";

const MyFleetLayout = () => {
    const [vendorCarData, setVendorCarData] = useState([]);

    const {
        data: vendorData,
        refetch,
        isPending
    } = useQuery({
        queryKey: ["cars"],
        queryFn: getVendorCars
    });

    useEffect(() => {
        const transformedData =
            vendorData?.data?.cars?.map((car) => ({
                id: car.id,
                name: car.name,
                category: car.category?.name || "N/A",
                status: car.active,
                Action: true
            })) || [];
        setVendorCarData(transformedData);
    }, [vendorData]);

    if (isPending) return <Loading />;

    return (
        <>
            <SecHeading heading="My Fleet" />
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
            <VendorTable refetchData={refetch} data={vendorCarData} />
        </>
    );
};

export default MyFleetLayout;
