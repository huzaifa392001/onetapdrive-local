"use client";
import React, { useState, useEffect } from 'react';
import AdminDataTable from '@/Components/AdminComponents/AdminTable/adminTable';
import SecHeading from '@/Components/SecHeading/SecHeading';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getCarRefresh } from '@/Services/AdminServices/AdminServices';
import Loading from '@/Components/Loading/Loading';
// import Data from "@/DummyData/carRefreshesManagement.json";


function Page() {

  const [refreshData, setRefreshData] = useState([]);

  const { data: refreshResponse, refetch, isPending } = useQuery({
    queryKey: ["refresh"],
    queryFn: () => getCarRefresh("refresh"), // refresh, active_car, premium
  });

  useEffect(() => {
    const transformed = refreshResponse?.data?.packageDetails?.map((item, index) => ({
      id: item.id || index,
      company_name: item.companyName,
      package_name: item.packageName,
      total_quantity: item.totalQuantity,
      consumed_quantity: item.consumedQuantity,
    }));
    setRefreshData(transformed);
  }, [refreshResponse]);

  if (isPending) return <Loading />;

  return (
    <>
      <div className="headingCont">
        <SecHeading heading="Car Refresh Management" />
        <Link href="car-refresh-management/create" className='themeBtn' >
          Create
        </Link>
      </div>
      <AdminDataTable data={refreshData} showAction={true} />
    </>
  )
}

export default Page