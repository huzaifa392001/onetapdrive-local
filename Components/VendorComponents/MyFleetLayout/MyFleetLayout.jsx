"use client";
import React, { useEffect, useState } from "react";
import "./MyFleetLayout.scss";
import VendorTable from "../VendorTable/VendorTable";
import Link from "next/link";
import SecHeading from "@/Components/SecHeading/SecHeading";
import { useQuery } from "@tanstack/react-query";
import { getVendorCars } from "@/Services/VendorServices/VendorServices";
import Loading from "@/Components/Loading/Loading";
import { useSelector } from "react-redux";
import { getCurrentUser } from "@/Services/AuthService/AuthService";

const MyFleetLayout = () => {
    const [vendorCarData, setVendorCarData] = useState([]);
    const [refreshItem, setRefreshItem] = useState(null);

    const { data: vendor, refetch: refetchVendor } = useQuery({
        queryKey: ['vendor'],
        queryFn: getCurrentUser
    })

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
                adminStatus: car?.status
            })) || [];
        setVendorCarData(transformedData);
    }, [vendorData]);

    useEffect(() => {
        if (vendor?.data?.user?.vendorPackageOrder) {
            const item = vendor?.data?.user?.vendorPackageOrder.userConsumePackageItems.find(
                item => item.item === "Active Car"
            );
            setRefreshItem(item);
        }
    }, [vendor]);

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
                        <h1>
                            {refreshItem?.used || 0} / {refreshItem?.quantity || 0}
                        </h1>
                        {/* <h1>{vendorData?.data?.cars?.reduce((count, car) => (car.active ? count + 1 : count), 0)}</h1> */}
                    </div>
                </div>
                <Link href="fleet/create" className="themeBtn">
                    Add
                </Link>
            </div>
            <VendorTable refetchVendor={refetchVendor} refetchData={refetch} action data={vendorCarData} refreshItem={refreshItem} />
        </>
    );
};

export default MyFleetLayout;
