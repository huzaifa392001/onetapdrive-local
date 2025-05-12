"use client";
import SecHeading from '@/Components/SecHeading/SecHeading'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import VendorTable from '../VendorTable/VendorTable'
import { useQuery } from '@tanstack/react-query'
import { getCwd } from "@/Services/VendorServices/VendorServices"
import "./CarWithDriver.scss"

function CarWithDriver() {

    const [cwdData, setCwdData] = useState([]);
    
      const { data: cwdResponse, refetch  } = useQuery({
        queryKey: ["cwd"],
        queryFn: getCwd,
      });
    
      useEffect(() => {
        console.log("Full CarWithDriverResponse:", cwdResponse);
        const transformed = (cwdResponse?.data?.cars || []).map(cwd => ({
            id: cwd.id,
            name: cwd.car?.name,
            status: cwd.status,
          }));
        setCwdData(transformed);
      }, [cwdResponse]);

    

    return (
        <>
            <SecHeading heading="My Fleet With Driver" />
            <div className="listingAddFlex">
                <div className="listingNumbersFlex">
                    <div className="listingNumbers">
                        <h3>Total Listing</h3>
                        <h1>26</h1>
                    </div>
                    <div className="listingNumbers">
                        <h3>Active Listing</h3>
                        <h1>13</h1>
                    </div>
                </div>
                <Link href="car-with-driver/create" className="themeBtn">
                    Add
                </Link>
            </div>
            <VendorTable data={cwdData} refetchData={refetch} showAction={true} />
        </>
    )
}

export default CarWithDriver