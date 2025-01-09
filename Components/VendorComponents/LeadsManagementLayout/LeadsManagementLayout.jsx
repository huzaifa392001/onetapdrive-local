'use client';
import React from "react";
import "./LeadsManagementLayout.scss"
import SecHeading from "@/components/SecHeading/SecHeading";
import LeadsData from "@/DummyData/VendorLeads.json"
import VendorTable from "../VendorTable/VendorTable";

const LeadsManagementLayout = () => {

  return (
    <>
      <SecHeading heading="Leads Management" />
      <VendorTable data={LeadsData} />
    </>
  );
};

export default LeadsManagementLayout
