'use client'
import React, { useEffect, useState } from "react";
import "./AdminDashboard.scss";
import UserChart from "@/Components/Charts/UserChart";
import CarChart from "@/Components/Charts/CarListingChart";
import { useQuery } from "@tanstack/react-query";
import { getAdminDashboard } from "@/Services/AdminServices/AdminServices";

export default function AdminDashboard() {
    const [listingData, setListingData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const { data: dashboardData } = useQuery({
        queryKey: ['dashboardData'],
        queryFn: getAdminDashboard
    })

    useEffect(() => {
        // console.log("Dashboard Data", dashboardData)
        setListingData(dashboardData?.cars)
        setUsersData(dashboardData?.users)
    }, [dashboardData])


    const leadsData = [
        { label: "Whatsapp Leads", value: 150 },
        { label: "Number Leads", value: 90 }
    ];

    return (
        <div className="customContainer adminContainer">
            <div className="chartWrapper">
                <CarChart
                    title="Car Listing - Car With Driver Listing"
                    description="January - June 2025"
                    data={listingData || []}
                />
                <UserChart
                    title="Vendors - Users"
                    description="January - June 2025"
                    data={usersData || []}
                />
                {/* <LeadsChart title="Leads" description="" data={leadsData} /> */}
            </div>
        </div>
    );
}
