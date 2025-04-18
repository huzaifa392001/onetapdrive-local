"use client";
import React, { useEffect, useState } from "react";
import SecHeading from "@/Components/SecHeading/SecHeading";
import AdminDataTable from "@/Components/AdminComponents/AdminTable/adminTable";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { deleteModel, getModels } from "@/Services/AdminServices/AdminModels";

function Page() {
    const [modelsData, setmodelsData] = useState([]);

    const { data: models, refetch } = useQuery({
        queryKey: ["models"],
        queryFn: getModels
    });

    // Function to refetch models after delete
    const refetchModels = () => {
        refetch();
    };

    useEffect(() => {
        console.log("models=> ", models);
        setmodelsData([]);
        models?.data?.map((item) => {
            const updatedItem = {
                id: item?.id,
                name: item?.name
                // image: item?.image || "/images/noImage.jpg",
            };
            setmodelsData((prev) => [...prev, updatedItem]);
        });
    }, [models]);
    return (
        <>
            <div className="headingCont">
                <SecHeading heading="Models" />
                <Link href="/admin/models/create" className="themeBtn">
                    Create
                </Link>
            </div>
            <AdminDataTable refetchData={refetchModels} deleteFunc={deleteModel} data={modelsData} showAction={true} />
        </>
    );
}

export default Page;
