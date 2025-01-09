import React from 'react';
import SecHeading from '@/Components/SecHeading/SecHeading';
import AdminDataTable from '@/Components/AdminComponents/AdminTable/adminTable';
import Data from "@/DummyData/carActiveManagement.json"

function page() {
  return (
    <>
    <div className="headingCont">
        <SecHeading heading="Car Active Management" />
      </div>
    <AdminDataTable data={Data} showAction={true}/>
    </>
  )
}

export default page