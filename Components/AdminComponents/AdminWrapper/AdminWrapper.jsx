"use client"
import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AdminLogin from '../AdminLogin/AdminLogin';
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminSidebar from '../AdminSiderbar/AdminSidebar';
import './AdminWrapper.scss'

function AdminWrapper({ children }) {
    const isAdmin = useSelector((state) => state.auth.isAdmin);
    
    return (
        <>
            {
                isAdmin ? (
                    <main className="adminWrapper">
                        <AdminHeader />
                        <AdminSidebar />
                        <div className="adminContentWrap">
                            {children}
                        </div>
                    </main>
                ) : (
                    <AdminLogin />
                )
            }
        </>
    )
}

export default memo(AdminWrapper);
