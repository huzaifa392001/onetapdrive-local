'use client';
import SecHeading from '@/Components/SecHeading/SecHeading'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import VendorTable from '../VendorTable/VendorTable'
import { useQuery } from '@tanstack/react-query'
import { getCwd } from "@/Services/VendorServices/VendorServices"
import "./CarWithDriver.scss"

function CarWithDriver() {
    const [vendorCwdData, setvendorCarWithDriver] = useState([]);
    
        const { data: CarWithDriverResponse, refetch } = useQuery({
            queryKey: ["cwd"],
            queryFn: getCwd,
        });

        useEffect(() => {
            console.log("Full CarWithDriverResponse:", cwdResponse);
        
            const cars = CwdResponse?.data; // adjust this key based on real structure
            if (Array.isArray(cars)) {
                const transformed = cars.map(car => ({
                    carName: car.car?.name,
                }));
                setvendorCarWithDriver(transformed);
            } else {
                console.warn("Expected an array, but got:", cars);
            }
        }, [CwdResponse]);
        
    
        // useEffect(() => {
        //     const transformed = CarWithDriverResponse?.data?.map(car => ({
        //         carName: car.car?.name,
        //     }));
        //     setvendorCarWithDriver(transformed);
        //     console.log("CarWithDriverResponse", CarWithDriverResponse);
        // }, [CarWithDriverResponse]);

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
            <VendorTable data={vendorCarWithDriverData} refetchData={refetch} showAction={true} />
        </>
    )
}

export default CarWithDriver