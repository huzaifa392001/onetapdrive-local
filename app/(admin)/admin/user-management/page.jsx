"use client";
import React, { useEffect, useState } from 'react';
import AdminDataTable from '@/Components/AdminComponents/AdminTable/adminTable';
import SecHeading from '@/Components/SecHeading/SecHeading';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '@/Services/AdminServices/AdminServices';

const UserManagementPage = () => {
  const [userData, setUserData] = useState([]);

  const { data: usersResponse } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  useEffect(() => {
    const transformed = usersResponse?.data?.data?.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.active ? "Active" : "Inactive",
      Action: "",
    }));
    setUserData(transformed);
  }, [usersResponse]);

  return (
    <>
      <div className="headingCont">
        <SecHeading heading="User Management" />
        <Link href="user-management/create" className="themeBtn">
          Create
        </Link>
      </div>
      <AdminDataTable data={userData} showAction={true} />
    </>
  );
};

export default UserManagementPage;
