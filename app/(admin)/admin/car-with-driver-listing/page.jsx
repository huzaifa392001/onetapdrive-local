import React from 'react';
import SecHeading from '@/Components/SecHeading/SecHeading';
import AdminDataTable from '@/Components/AdminComponents/AdminTable/adminTable';
import carWithDriverData from '@/DummyData/carWithDriverData.json';


function page() {
  return (
    <>
    <div className="headingCont">
        <SecHeading heading="Car With Driver Listing" />
      </div>
    <AdminDataTable data={carWithDriverData} showAction={true} />
    </>
  )
}

export default page