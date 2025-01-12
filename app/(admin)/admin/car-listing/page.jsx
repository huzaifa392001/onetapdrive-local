import React from 'react';
import AdminDataTable from '@/Components/AdminComponents/AdminTable/adminTable';
import SecHeading from '@/Components/SecHeading/SecHeading';
import CarListingData from '@/DummyData/CarListing.json';

function page() {
  return (
    <>
    <div className="headingCont">
        <SecHeading heading="Car Listing" />
    </div>
    <AdminDataTable data={CarListingData} />
    </>
  )
}

export default page