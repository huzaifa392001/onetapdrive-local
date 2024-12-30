import React from "react";
import "./MyFleetLayout.scss";
import VendorTable from "../VendorTable/VendorTable";
import fleetData from "@/DummyData/VendorFleets.json"

const MyFleetLayout = () => {
  return (
    <VendorTable data={fleetData} />
  )
}

export default MyFleetLayout;
