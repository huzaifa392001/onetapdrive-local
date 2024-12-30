import AdminDataTable from '@/Components/AdminComponents/AdminTable/adminTable'
import React from 'react'
import brandsData from "@/DummyData/AdminBrands.json"
import SecHeading from '@/Components/SecHeading/SecHeading'
import Link from 'next/link'

function page() { 
  return (
    <>
      <div className="headingCont">
        <SecHeading heading="Brands" />
        <Link href="" className='themeBtn' >
          Create
        </Link>
      </div>
      <AdminDataTable data={brandsData} />
    </>
  )
}

export default page