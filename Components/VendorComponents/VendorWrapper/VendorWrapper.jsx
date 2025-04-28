"use client";
import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // ✅ Import useRouter
import VendorHeader from "../VendorHeader/VendorHeader";
import VendorSidebar from "../VendorSidebar/VendorSidebar";
import "./VendorWrapper.scss";
import { useQueries, useQuery } from "@tanstack/react-query";
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
import { store } from "@/Redux/Store";
import { SET_ACCESS_TOKEN, SET_IS_VENDOR, SET_VENDOR_DETAILS } from "@/Redux/Slices/Auth";
import { getCurrentUser } from "@/Services/AuthService/AuthService";

function VendorWrapper({ children }) {
    const isVendor = useSelector((state) => state.auth.isVendor);
    const router = useRouter();

    const { data: vendorData } = useQuery({
        queryKey: ["vendorProfile"],
        queryFn: getCurrentUser
    });

    useEffect(() => {
        if (!isVendor) {
            router.push("/vendor-login"); // ✅ Redirect if not a vendor
        }
    }, [isVendor, router]);

    useEffect(() => {
        if (vendorData) {
            if (!vendorData?.data?.user?.status) {
                store.dispatch(SET_VENDOR_DETAILS(null));
                store.dispatch(SET_IS_VENDOR(false));
                store.dispatch(SET_ACCESS_TOKEN(null));
            }
        }
    }, [vendorData])

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

    useEffect(() => {
        store.dispatch(SET_VENDOR_DETAILS(vendorData?.data?.user));
    }, [vendorData]);

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
