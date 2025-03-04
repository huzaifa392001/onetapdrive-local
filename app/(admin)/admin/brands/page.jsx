"use client"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AdminDataTable from "@/Components/AdminComponents/AdminTable/adminTable";
import SecHeading from "@/Components/SecHeading/SecHeading";
import Link from "next/link";
import { deleteBrand, getBrands } from "@/Services/AdminServices/AdminBrand";


function Page() {
    const queryClient = useQueryClient();

    const { data: brands } = useQuery({
        queryKey: ["brands"],
        queryFn: getBrands,
    });

    // Function to refetch brands after delete
    const refetchBrands = () => {
        queryClient.invalidateQueries(["brands"]);
    };


    return (
        <>
            <div className="headingCont">
                <SecHeading heading="brands" />
                <Link href="brands/create" className='themeBtn'>
                    Create
                </Link>
            </div>

            <AdminDataTable
                refetchData={refetchBrands}
                deleteFunc={deleteBrand}
                data={brands?.data}
                showAction={true}
            />
        </>
    );
}

export default Page;
