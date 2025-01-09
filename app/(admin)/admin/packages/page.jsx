import React from 'react';
import AdminDataTable from '@/components/AdminComponents/AdminTable/adminTable';
import PackagesOrder from '@/DummyData/packagesOrder.json';
import SecHeading from '@/components/SecHeading/SecHeading';

function page() {
  return (
    <>
    <div className="headingCont">
    <SecHeading heading="Packages"/>
    </div>
    <AdminDataTable data={PackagesOrder}/>
    </>
  )
}

export default page