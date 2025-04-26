import SecHeading from '@/Components/SecHeading/SecHeading'
import Link from 'next/link'
import React from 'react'
import VendorTable from '../VendorTable/VendorTable'
import fleetData from "@/DummyData/VendorFleets.json";
import "./CarWithDriver.scss"

function CarWithDriver() {
    return (
        <>
            <SecHeading heading="My Fleet" />
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
            <VendorTable data={fleetData} />
        </>
    )
}

export default CarWithDriver