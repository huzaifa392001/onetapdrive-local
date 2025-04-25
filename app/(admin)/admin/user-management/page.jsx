"use client";
import React, { useEffect, useState } from 'react';
import AdminDataTable from '@/Components/AdminComponents/AdminTable/adminTable';
import SecHeading from '@/Components/SecHeading/SecHeading';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '@/Services/AdminServices/AdminServices';
import Loading from '@/Components/Loading/Loading';

const UserManagementPage = () => {
    const [userData, setUserData] = useState([]);

    const { data: usersResponse, isPending, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
    });

    useEffect(() => {
        const transformed = usersResponse?.data?.map(user => ({
            id: user.id,
            name: user.firstName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            leadGenerated: user.lead_count,
            status: user.status,
        }));
        setUserData(transformed);
    }, [usersResponse]);

    if (isPending) return <Loading />

    return (
        <>
            <div className="headingCont">
                <SecHeading heading="User Management" />
                {/* <Link href="user-management/create" className="themeBtn">
                    Create
                </Link> */}
            </div>
            <AdminDataTable data={userData} showUserAction refetchData={refetch} />
        </>
    );
};

export default UserManagementPage;
