import React from 'react';
import SecHeading from '@/components/SecHeading/SecHeading';
import AdminDataTable from '@/components/AdminComponents/AdminTable/adminTable';
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