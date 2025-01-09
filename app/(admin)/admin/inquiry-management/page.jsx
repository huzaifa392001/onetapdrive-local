import React from 'react';
import AdminDataTable from '@/components/AdminComponents/AdminTable/adminTable';
import SecHeading from '@/components/SecHeading/SecHeading';

function page() {
  return (
    <>
    <div className="headingCont">
        <SecHeading heading="Inquiry Management" />
    </div>
    <AdminDataTable />
    </>
  )
}

export default page