import React from 'react';
import AdminDataTable from '@/Components/AdminComponents/AdminTable/adminTable';
import SecHeading from '@/Components/SecHeading/SecHeading';

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