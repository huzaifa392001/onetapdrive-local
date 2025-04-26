'use client'
import React, { useEffect, useState } from "react";
import "./VendorDashboard.scss";
import VendorHeading from "@/Components/VendorComponents/VendorHeading/VendorHeading";
import LeadsChart from "@/Components/charts/LeadsChart";
import CarChart from "@/Components/charts/CarListingChart";
import { useQuery } from "@tanstack/react-query";
import { getVendorDashboard } from "@/Services/VendorServices/VendorServices";

export default function VendorDashboard() {
    const [listingData, setListingData] = useState([]);
    const [leadsData, setLeadsData] = useState([]);

    const { data: dashboardData } = useQuery({
        queryKey: ['dashboardData'],
        queryFn: getVendorDashboard
    })

    useEffect(() => {
        console.log("Dashboard Data", dashboardData)
        setListingData(dashboardData?.cars)

        // Convert totalLeadsByType object to array format
        if (dashboardData?.totalLeadsByType) {
            const convertedLeadsData = Object.entries(dashboardData.totalLeadsByType).map(([label, value]) => ({
                label: label.charAt(0).toUpperCase() + label.slice(1) + " Leads", // Format the label
                value: value
            }));
            setLeadsData(convertedLeadsData);
        }
    }, [dashboardData])

    return (
        <>
            <VendorHeading headingText="Welcome To Vendor Dashboard" />
            <div className="chartWrapper">
                <CarChart title="Your Listing" description="January - June 2025" data={listingData} />
                <LeadsChart title="Leads" description="" data={leadsData} />
            </div>
        </>
    );
}