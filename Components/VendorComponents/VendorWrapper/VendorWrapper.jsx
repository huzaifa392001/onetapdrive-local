"use client";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import VendorLogin from "../VendorLogin/VendorLogin";
import VendorHeader from "../VendorHeader/VendorHeader";
import VendorSidebar from "../VendorSidebar/VendorSidebar";
import "./VendorWrapper.scss";

function VendorWrapper({ children }) {
  const isVendor = useSelector((state) => state.auth.isVendor);
  return (
    <>
      {isVendor ? (
        <main className="vendorWrapper">
          <VendorHeader />
          <VendorSidebar />
          <div className="vendorContentWrap">{children}</div>
        </main>
      ) : (
        <VendorLogin />
      )}
    </>
  );
}

export default memo(VendorWrapper);
