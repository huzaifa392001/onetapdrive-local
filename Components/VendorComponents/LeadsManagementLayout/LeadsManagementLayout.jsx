'use client';
import React, { useEffect, useState } from "react";
import "./LeadsManagementLayout.scss"
import SecHeading from "@/Components/SecHeading/SecHeading";
// import LeadsData from "@/DummyData/VendorLeads.json"
import VendorTable from "../VendorTable/VendorTable";
import { useQuery } from "@tanstack/react-query";
import { getLeads } from "@/Services/VendorServices/VendorServices";
import Loading from "@/Components/Loading/Loading";

const LeadsManagementLayout = () => {

    const [data, setData] = useState([])

    const { data: leadsData, isPending } = useQuery({
        queryKey: ['Leads'],
        queryFn: getLeads
    })

    useEffect(() => {
        console.log("leadsData=> ", leadsData)
        const transformedData =
            leadsData?.data?.map((lead) => ({
                id: lead.id,
                car: lead?.car?.name || "",
                user: lead?.user?.firstName,
                email: lead?.user?.email,
                number: lead?.user?.phoneNumber,
                type: lead?.type,
                time: lead.createdAt || "N/A",
            })) || [];
        setData(transformedData)
    }, [leadsData])

    if (isPending) return <Loading />

    return (
        <>
            <SecHeading heading="Leads Management" />
            <VendorTable action={false} data={data} />
        </>
    );
};

export default LeadsManagementLayout
