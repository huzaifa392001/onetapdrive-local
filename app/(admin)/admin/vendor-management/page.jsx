"use client";
import React, { useEffect, useMemo, useState } from "react";
import AdminDataTable from "@/Components/AdminComponents/AdminTable/adminTable";
import SecHeading from "@/Components/SecHeading/SecHeading";
import Link from "next/link";
import Data from "@/DummyData/adminVendorManagement.json";

const Page = () => {
    return (
        <>
            <div className="headingCont">
                <SecHeading heading="User Management" />
                <Link href="user-management/create" className="themeBtn">
                    Create
                </Link>
            </div>
            <AdminDataTable data={Data} showAction={true} />
        </>
    );
};

export default Page;
