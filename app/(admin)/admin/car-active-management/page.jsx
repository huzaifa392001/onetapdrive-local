"use client";
import React, { useState, useEffect } from 'react';
import AdminDataTable from '@/Components/AdminComponents/AdminTable/adminTable';
import SecHeading from '@/Components/SecHeading/SecHeading';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getCarRefresh } from '@/Services/AdminServices/AdminServices';
// import Data from "@/DummyData/carRefreshesManagement.json";


function Page() {

  const [refreshData, setRefreshData] = useState([]);

  const { data: refreshResponse } = useQuery({
    queryKey: ["active_car"],
    queryFn: () => getCarRefresh("active_car"), // refresh, active_car, premium
  });

  useEffect(() => {
    const transformed = refreshResponse?.data?.packageDetails?.map((item, index) => ({
      id: item.id || index,
      company_name: item.companyName,
      package_name: item.packageName,
      total_quantity: item.totalQuantity,
      consumed_quantity: item.consumedQuantity,
      remain_quantity: item.totalQuantity - item.consumedQuantity,
    }));
    setRefreshData(transformed);
  }, [refreshResponse]);


  return (
    <>
      <div className="headingCont">
        <SecHeading heading="Active Car Management" />
        <Link href="car-refresh-management/create" className='themeBtn' >
          Create
        </Link>
      </div>
      <AdminDataTable data={refreshData} showAction={true} />
    </>
  )
}

export default Page