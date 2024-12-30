import AdminDataTable from '@/Components/AdminComponents/AdminTable/adminTable';
import SecHeading from '@/Components/SecHeading/SecHeading';
import Link from 'next/link';
import React from 'react';
import brandsData from "@/DummyData/tableData.json"

function page() {
  return (
    <>
      <div className="headingCont">
        <SecHeading heading="Banners" />
        <Link href="" className='themeBtn' >
          Create
        </Link>
      </div>
      <AdminDataTable data={brandsData} />
    </>
  )
}

export default page