"use client";
import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // ✅ Import useRouter
import VendorHeader from "../VendorHeader/VendorHeader";
import VendorSidebar from "../VendorSidebar/VendorSidebar";
import "./VendorWrapper.scss";

function VendorWrapper({ children }) {
  const isVendor = useSelector((state) => state.auth.isVendor);
  const router = useRouter();

  useEffect(() => {
    if (!isVendor) {
      router.push("/vendor-login"); // ✅ Redirect if not a vendor
    }
  }, [isVendor, router]);

  if (!isVendor) return null; // ✅ Prevent rendering anything before redirect

  return (
    <main className="vendorWrapper">
      <VendorHeader />
      <div className="vendorContentLayout">
        <VendorSidebar />
        <div className="vendorContentWrap">{children}</div>
      </div>
    </main>
  );
}

export default memo(VendorWrapper);
