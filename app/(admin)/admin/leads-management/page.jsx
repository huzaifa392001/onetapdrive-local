"use client";
import React, { useState, useEffect } from 'react';
import AdminDataTable from '@/Components/AdminComponents/AdminTable/adminTable';
import SecHeading from '@/Components/SecHeading/SecHeading';
// import Data from "@/DummyData/adminLeadsManagement.json"
import { useQuery } from '@tanstack/react-query';
import { getAllleads } from '@/Services/AdminServices/AdminServices';

function Page() {

    const [leadsData, setleadData] = useState([]);

    const { data: leadsResponse, refetch } = useQuery({
        queryKey: ["leads"],
        queryFn: getAllleads,
    });

    useEffect(() => {
        const transformed = leadsResponse?.data?.map(lead => ({
            carName: lead.car?.name,
            vendorName: lead.vendor?.firstName,
            companyName: lead.vendor?.companyName,
            leadType: lead.type,
            userNumber: lead.user?.phoneNumber,
        }));
        setleadData(transformed);
    }, [leadsResponse]);

    return (
        <>
            <div className="headingCont">
                <SecHeading heading="Leads Management" />
            </div>
            <AdminDataTable data={leadsData} refetchData={refetch} showAction={true} />
        </>
    )
}

export default Page