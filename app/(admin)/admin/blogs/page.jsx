import AdminDataTable from "@/Components/AdminComponents/AdminTable/adminTable";
import SecHeading from "@/Components/SecHeading/SecHeading";
import React from "react";
import blogsData from "@/DummyData/BlogsData.json";
import Link from "next/link";

function page() {
  const blogUpdatedData = blogsData.map(
    ({ min_content, content, author, ...rest }) => rest
  );
  console.log("blogUpdatedData=> ", blogUpdatedData);
  return (
    <>
      <div className="headingCont">
        <SecHeading heading="OneTapDrive's Blogs" />
        <Link href="blogs/create" className="themeBtn">
          Create
        </Link>
      </div>
      <AdminDataTable data={blogUpdatedData} showAction={true} />
    </>
  );
}

export default page;
