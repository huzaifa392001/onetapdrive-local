"use client"

import AdminDataTable from '@/components/AdminComponents/AdminTable/adminTable';
import SecHeading from '@/components/SecHeading/SecHeading';
import Error from 'next/error';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';


function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch('https://mocki.io/v1/61fda4cd-64ba-4224-9dab-4f19d5e59912');
        if (!response.ok){
          throw new Error (`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      }catch (err){
        setError(err.message);
      }finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);


return (
  <>
  <div className="headingCont adminHeadingCont">
      <SecHeading heading="Banners" />
      <Link href="./banners/create" className="themeBtn">
        Create
      </Link>
  </div>

  {/* Yeh ternory Operator hai  */}

  {loading ? (
    <p>Loading.......</p>
  ): error ? (
    <p>Error: {error}</p>
  ) : (
    <AdminDataTable data={data} showAction={true}/>
  )}

  </>
);

}
export default Page;
