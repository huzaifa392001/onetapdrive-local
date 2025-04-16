"use client";
import React, { useEffect, useState } from "react";
import "./MyFleetLayout.scss";
import VendorTable from "../VendorTable/VendorTable";
import fleetData from "@/DummyData/VendorFleets.json";
import Link from "next/link";
import SecHeading from "@/Components/SecHeading/SecHeading";
import { useQuery } from "@tanstack/react-query";
import { getVendorCars } from "@/Services/VendorServices/VendorServices";

const MyFleetLayout = () => {
    const [vendorCarData, setVendorCarData] = useState();

    const { data: vendorData } = useQuery({
        queryKey: ["cars"],
        queryFn: getVendorCars
    });

    useEffect(() => {
        console.log("vendorData=> ", vendorData);
    }, [vendorData]);

    useEffect(() => {
        // Extract only name, active, and category
        const transformedData = vendorData?.data?.data?.map((car) => ({
            id: car?.id,
            name: car.name,
            category: car.category.name,
            status: car.active ? "Active" : "Inactive",
            Action: ""
        }));

        setVendorCarData(transformedData);
    }, [vendorData]);

    return (
        <>
            <SecHeading heading="My Fleet" />
            <div className="listingAddFlex">
                <div className="listingNumbersFlex">
                    <div className="listingNumbers">
                        <h3>Total Listing</h3>
                        <h1>{vendorData?.data?.data?.length}</h1>
                    </div>
                    <div className="listingNumbers">
                        <h3>Active Listing</h3>
                        <h1>
                            {vendorData?.data?.data?.reduce((count, car) => {
                                return car?.active ? count + 1 : count;
                            }, 0)}
                        </h1>
                    </div>
                </div>
                <Link href="fleet/create" className="themeBtn">
                    Add
                </Link>
            </div>
            <VendorTable data={vendorCarData} />
        </>
    );
};

export default MyFleetLayout;
