import React from "react";
import AdminDataTable from "@/Components/AdminComponents/AdminTable/adminTable";
import SecHeading from "@/Components/SecHeading/SecHeading";
import Link from "next/link";
import Data from "@/DummyData/adminVendorManagement.json";   

function page() {
  return (
    <>
      <div className="headingCont">
        <SecHeading heading="Vendor Management" />
        <Link href="vendor-management/create" className="themeBtn">
          Create
        </Link>
      </div>
      <AdminDataTable data={Data} showAction={true}/>
    </>
  );
}

export default page;
