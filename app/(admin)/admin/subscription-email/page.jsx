import React from 'react';
import AdminDataTable from '@/Components/AdminComponents/AdminTable/adminTable';
import SecHeading from '@/Components/SecHeading/SecHeading';
import Data from "@/DummyData/adminSubscriptionEmail.json"

function page() {
  return (
    <>
    <div className="headingCont">
        <SecHeading heading="Subscription Email" />
    </div>
    <AdminDataTable data={Data} showAction={true} />
    </>
  )
}

export default page