import React from 'react';
import CategoriesData from "@/DummyData/AdminCategories.json";
import SecHeading from '@/components/SecHeading/SecHeading';
import Link from 'next/link';
import AdminDataTable from '@/components/AdminComponents/AdminTable/adminTable';

function page() {
  return (
    <>
      <div className="headingCont">
        <SecHeading heading="Categories" />
        <Link href="categories/create" className='themeBtn' >
          Create
        </Link>
      </div>
      <AdminDataTable data={CategoriesData} showAction={true} />
    </>
  )
}

export default page