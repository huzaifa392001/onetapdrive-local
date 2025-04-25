"use client";
import React, { useEffect, useState } from "react";
import SecHeading from "@/Components/SecHeading/SecHeading";
import Link from "next/link";
import AdminDataTable from "@/Components/AdminComponents/AdminTable/adminTable";
import { useQuery } from "@tanstack/react-query";
import { deleteBodyType, getAllBodyTypes } from "@/Services/AdminServices/AdminBodyTypes";
import Loading from "@/Components/Loading/Loading";

function Page() {
    const [bodyTypeData, setBodyTypeData] = useState([]);

    const {
        data: bodyType,
        refetch,
        isPending
    } = useQuery({
        queryKey: ["bodyType"],
        queryFn: getAllBodyTypes
    });

    // Function to refetch bodyType after delete
    const refetchBodyType = () => {
        refetch();
    };

    useEffect(() => {
        console.log("bodyType> ", bodyType);
        setBodyTypeData([]);
        bodyType?.data?.map((item) => {
            const updatedItem = {
                id: item?.id,
                name: item?.name,
                image: item?.image
            };
            setBodyTypeData((prev) => [...prev, updatedItem]);
        });
    }, [bodyType]);

    if (isPending) return <Loading />;
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
