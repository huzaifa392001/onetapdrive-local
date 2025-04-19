"use client";
import React, { useEffect, useState } from "react";
import SecHeading from "@/Components/SecHeading/SecHeading";
import Link from "next/link";
import AdminDataTable from "@/Components/AdminComponents/AdminTable/adminTable";
import { useQuery } from "@tanstack/react-query";
import { deleteBodyType, getAllBodyTypes } from "@/Services/AdminServices/AdminBodyTypes";

function Page() {
    const [bodyTypeData, setBodyTypeData] = useState([]);

    const { data: bodyType, refetch } = useQuery({
        queryKey: ["bodyType"],
        queryFn: getAllBodyTypes
    });

    // Function to refetch bodyType after delete
    const refetchBodyType = () => {
        refetch();
    };

    useEffect(() => {
        console.log("bodytypes=> ", bodyType);
        setBodyTypeData([]);
        bodyType?.data?.map((item) => {
            const updatedItem = {
                id: item?.bodyType_id,
                name: item?.bodyType_name
            };
            setBodyTypeData((prev) => [...prev, updatedItem]);
        });
    }, [bodyType]);

    return (
        <>
            <div className="headingCont">
                <SecHeading heading="bodyType" />
                <Link href="body-type/create" className="themeBtn">
                    Create
                </Link>
            </div>

            <AdminDataTable
                refetchData={refetchBodyType}
                deleteFunc={deleteBodyType}
                data={bodyTypeData}
                showAction={true}
            />
        </>
    );
}

export default Page;
