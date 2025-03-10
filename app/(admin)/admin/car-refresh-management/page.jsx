import React from 'react';
import AdminDataTable from '@/Components/AdminComponents/AdminTable/adminTable';
import SecHeading from '@/Components/SecHeading/SecHeading';
import Link from 'next/link';
import Data from "@/DummyData/carRefreshesManagement.json";

function page() {
  return (
    <>
    <div className="headingCont">
        <SecHeading heading="Car Refresh Management" />
        <Link href="car-refresh-management/create" className='themeBtn' >
          Create
        </Link>
    </div>
    <AdminDataTable data={Data} showAction={true} />
    </>
  )
}

export default page