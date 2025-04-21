"use client";
import { useQuery } from "@tanstack/react-query";
import AdminDataTable from "@/Components/AdminComponents/AdminTable/adminTable";
import SecHeading from "@/Components/SecHeading/SecHeading";
import Link from "next/link";
import { deleteBrand, getBrands } from "@/Services/AdminServices/AdminBrand";
import { useEffect, useState } from "react";
import Loading from "@/Components/Loading/Loading";

function Page() {
    const [brandsData, setbrandsData] = useState([]);

    const {
        data: brands,
        refetch,
        isPending
    } = useQuery({
        queryKey: ["brands"],
        queryFn: getBrands
    });

    // Function to refetch brands after delete
    const refetchBrands = () => {
        refetch();
    };

    useEffect(() => {
        setbrandsData([]);
        brands?.data?.map((item) => {
            const updatedItem = {
                id: item?.id,
                name: item?.name,
                image: item?.image
            };
            setbrandsData((prev) => [...prev, updatedItem]);
        });
    }, [brands]);

    if (isPending) return <Loading />;
    return (
        <>
            <div className="headingCont">
                <SecHeading heading="brands" />
                <Link href="/admin/brands/create" className="themeBtn">
                    Create
                </Link>
            </div>

            <AdminDataTable refetchData={refetchBrands} deleteFunc={deleteBrand} data={brandsData} showAction={true} />
        </>
    );
}

export default Page;
