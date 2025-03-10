import React from 'react';
import ModelData from '@/DummyData/adminModel.json';
import SecHeading from '@/Components/SecHeading/SecHeading';
import AdminDataTable from '@/Components/AdminComponents/AdminTable/adminTable';

function page() {
  return (
    <>
    <div className="headingCont">
        <SecHeading heading="Car Brands/Models" />
    </div>
    <AdminDataTable data={ModelData} showAction={true}/>
    </>
  )
}

export default page