"use client";
import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // ✅ Import useRouter
import VendorHeader from "../VendorHeader/VendorHeader";
import VendorSidebar from "../VendorSidebar/VendorSidebar";
import "./VendorWrapper.scss";
import { useQueries } from "@tanstack/react-query";
import {
    getBags,
    getCarBodyTypes,
    getCarBrands,
    getCarCategories,
    getCities,
    getColors,
    getDoors,
    getFeatures,
    getFuelTypes,
    getLuggages,
    getMakeYears,
    getSeating,
    getService,
    getSpecs,
    getTransmission
} from "@/Services/VendorServices/VendorAddCarServices";

function VendorWrapper({ children }) {
    const isVendor = useSelector((state) => state.auth.isVendor);
    const router = useRouter();

    useEffect(() => {
        if (!isVendor) {
            router.push("/vendor-login"); // ✅ Redirect if not a vendor
        }
    }, [isVendor, router]);

    const queries = useQueries({
        queries: [
            { queryKey: ["carBrands"], queryFn: getCarBrands },
            { queryKey: ["carBodyTypes"], queryFn: getCarBodyTypes },
            { queryKey: ["cities"], queryFn: getCities },
            { queryKey: ["makeYears"], queryFn: getMakeYears },
            { queryKey: ["carCategories"], queryFn: getCarCategories },
            { queryKey: ["colors"], queryFn: getColors },
            { queryKey: ["features"], queryFn: getFeatures },
            { queryKey: ["transmissions"], queryFn: getTransmission },
            { queryKey: ["specs"], queryFn: getSpecs },
            { queryKey: ["seating"], queryFn: getSeating },
            { queryKey: ["bags"], queryFn: getBags },
            { queryKey: ["doors"], queryFn: getDoors },
            { queryKey: ["fuelTypes"], queryFn: getFuelTypes },
            { queryKey: ["luggages"], queryFn: getLuggages },
            { queryKey: ["service"], queryFn: getService }
        ]
    });

    if (!isVendor) return null; // ✅ Prevent rendering anything before redirect

    return (
        <main className="vendorWrapper">
            <VendorHeader />
            <div className="vendorContentLayout">
                <VendorSidebar />
                <div className="vendorContentWrap">{children}</div>
            </div>
        </main>
    );
}

export default memo(VendorWrapper);
