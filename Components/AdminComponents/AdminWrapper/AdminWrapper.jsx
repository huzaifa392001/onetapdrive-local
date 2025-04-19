"use client";
import React, { memo, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import AdminLogin from "../AdminLogin/AdminLogin";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSidebar from "../AdminSiderbar/AdminSidebar";
import "./AdminWrapper.scss";
import Loading from "@/Components/Loading/Loading";

function AdminWrapper({ children }) {
    const isAdmin = useSelector((state) => state.auth.isAdmin);
    const router = useRouter();

    useEffect(() => {
        if (!isAdmin) {
            router.push("/admin-login");
        }
    }, [isAdmin, router]);

    if (!isAdmin) return null;

    return (
        <>
            {isAdmin ? (
                <main className="adminWrapper">
                    <AdminHeader />
                    <AdminSidebar />
                    <div className="adminContentWrap">
                        <Suspense fallback={<Loading />}>{children}</Suspense>
                    </div>
                </main>
            ) : (
                <AdminLogin />
            )}
        </>
    );
}

export default memo(AdminWrapper);
