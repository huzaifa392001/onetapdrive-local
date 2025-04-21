"use client";
import React, { useEffect, useMemo, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SecHeading from "@/Components/SecHeading/SecHeading";
import { getAdminCars, updateCarStatus } from "@/Services/AdminServices/AdminCars";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "./index.scss";

ModuleRegistry.registerModules([AllCommunityModule]);

const Page = () => {
    const [adminCarData, setAdminCarData] = useState([]);
    const showAction = true;
    const queryClient = useQueryClient();
    const pathName = usePathname();
    const [updatingId, setUpdatingId] = useState(null);
    const [colDefs, setColDefs] = useState([]);

    const { data: carsData } = useQuery({
        queryKey: ["cars"],
        queryFn: getAdminCars
    });

    const { mutateAsync: toggleCarStatus } = useMutation({
        mutationFn: ({ id, enable }) => updateCarStatus(id, enable),
        onSuccess: () => {
            toast.success("Status updated successfully");
            queryClient.invalidateQueries({ queryKey: ["cars"] });
        },
        onError: () => {
            toast.error("Failed to update status");
        },
        onSettled: () => {
            setUpdatingId(null); // re-enable the button
        }
    });

    useEffect(() => {
        if (!carsData?.data?.data) return;

        const transformedData = carsData.data.data.map((car) => ({
            id: car?.id,
            name: car.name,
            category: car.category.name,
            status: car.active ? "active" : "inactive"
        }));

        setAdminCarData(transformedData);
    }, [carsData]);

    const rowData = adminCarData;

    useEffect(() => {
        if (rowData.length > 0) {
            const dynamicFields = Object.keys(rowData[0])
                .filter((key) => key !== "slug" && key !== "id")
                .map((key) => ({
                    field: key,
                    flex: 1,
                    headerName: key.charAt(0).toUpperCase() + key.slice(1)
                }));

            const actionColumn = {
                headerName: "Action",
                flex: 2,
                cellRenderer: (params) => {
                    const id = params.data?.id;
                    const currentStatus = params.data?.status || "inactive";

                    const toggleStatus = async () => {
                        const newStatus = currentStatus === "inactive" ? "active" : "inactive";
                        const enableValue = newStatus === "active";

                        try {
                            setUpdatingId(id); // disable button
                            await toggleCarStatus({ id, enable: enableValue });
                        } catch (err) {
                            console.error("Toggle failed", err);
                        }
                    };

                    if (!showAction) return null;

                    return (
                        <div className="adminBtnCont">
                            <button
                                title="Toggle Status"
                                className={`themeBtn statusBtn iconBtn ${currentStatus} ${
                                    updatingId === id ? "disabled" : ""
                                }`}
                                onClick={toggleStatus}
                                disabled={updatingId === id}
                            >
                                <i className={`fas fa-power-off ${currentStatus}`} />
                            </button>

                            <button title="Boost Car" className="themeBtn iconBtn">
                                <i className="fas fa-rocket" />
                            </button>
                            <Link title="Edit Car" className="themeBtn" href={`${pathName}/edit/${id}`}>
                                <i className="fas fa-pencil" />
                            </Link>
                        </div>
                    );
                }
            };

            setColDefs([
                {
                    headerName: "Sr No.",
                    valueGetter: "node.rowIndex + 1"
                },
                ...dynamicFields,
                ...(showAction ? [actionColumn] : [])
            ]);
        }
    }, [rowData, showAction, pathName]);

    const defaultColDef = useMemo(
        () => ({
            floatingFilter: false,
            resizable: false
        }),
        []
    );

    return (
        <>
            <div className="headingCont">
                <SecHeading heading="Car Listing" />
                <Link href={""} className="themeBtn">
                    Create
                </Link>
            </div>
            <div className="dataTable ag-theme-alpine">
                <AgGridReact
                    rowData={rowData}
                    rowHeight={120}
                    domLayout="normal"
                    columnDefs={colDefs}
                    pagination={true}
                    defaultColDef={defaultColDef}
                    paginationPageSize={10}
                    headerHeight={80}
                    suppressCellFocus={true}
                />
            </div>
        </>
    );
};

export default Page;
