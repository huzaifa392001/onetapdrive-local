import AdminDataTable from '@/components/AdminComponents/AdminTable/adminTable'
import React from 'react'
import brandsData from "@/DummyData/AdminBrands.json"
import SecHeading from '@/components/SecHeading/SecHeading'
import Link from 'next/link'

function page() {
  return (
    <>
      <div className="headingCont">
        <SecHeading heading="Brands" />
        <Link href="brands/create" className='themeBtn' >
          Create
        </Link>
      </div>
      <AdminDataTable data={brandsData} showAction={true} />
    </>
  )
}

export default page