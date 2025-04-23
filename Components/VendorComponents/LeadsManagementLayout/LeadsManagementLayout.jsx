'use client';
import React, { useEffect } from "react";
import "./LeadsManagementLayout.scss"
import SecHeading from "@/Components/SecHeading/SecHeading";
// import LeadsData from "@/DummyData/VendorLeads.json"
import VendorTable from "../VendorTable/VendorTable";
import { useQuery } from "@tanstack/react-query";
import { getLeads } from "@/Services/VendorServices/VendorServices";

const LeadsManagementLayout = () => {

    const { data: leadsData, isPending } = useQuery({
        queryKey: ['Leads'],
        queryFn: getLeads
    })

    useEffect(() => {
        console.log("leadsData=> ", leadsData)
    }, [leadsData])

    return (
        <>
            <SecHeading heading="Leads Management" />
            <VendorTable data={leadsData?.data} />
        </>
    );
};

export default LeadsManagementLayout
