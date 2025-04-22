"use client";
import React, { useEffect, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import Image from "next/image";
import "./adminTable.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { formatDate } from "@/Utils/Utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Spinner from "@/Components/Spinner/Spinner";
import { updateCarStatus } from "@/Services/AdminServices/AdminCars";

ModuleRegistry.registerModules([AllCommunityModule]);

const AdminDataTable = (props) => {
    const rowData = props?.data || [];
    const showAdminActions = props?.showAdminCarActions || false;
    const showAction = props?.showAction || false;
    const pathName = usePathname();
    const statusMutation = useMutation({
        mutationFn: updateCarStatus,
        onSuccess: (_, variables) => {
            const { id, enable } = variables;
            toast.success("Status Updated");
            refetchData?.();
            setLocalRowData((prev) => prev.map((row) => (row.id === id ? { ...row, status: enable } : row)));
        },
        onError: () => {
            toast.error("Failed to update status");
        }
    });

    const deleteMutation = useMutation({
        mutationFn: props?.deleteFunc,
        onSuccess: () => {
            toast.success("Deleted Successfully!");
            props.refetchData(); // ✅ Ensure refetchData is called correctly
        },
        onError: (e) => {
            toast.error(`An error Occurred: ${e}`);
        }
    });

    const handleDelete = async (id) => {
        deleteMutation.mutate(id);
    };

    const [colDefs, setColDefs] = useState([]);

    useEffect(() => {
        if (rowData.length > 0) {
            const dynamicFields = Object.keys(rowData[0])
                .filter((key) => key !== "slug" && key !== "id")
                .map((key) => {
                    if (key === "status") {
                        return {
                            field: key,
                            headerName: "Status",
                            flex: 1,
                            cellRenderer: (params) => {
                                const currentStatus = params.data?.status;

                                return <p>{currentStatus ? "Active" : "Inactive"}</p>;
                            }
                        };
                    }
                    if (key === "image") {
                        return {
                            field: key,
                            flex: 1,
                            headerName: "Images",
                            cellRenderer: (params) => {
                                return (
                                    <div className="tableImgCol">
                                        <Image
                                            src={params.value || "/images/noImage.jpg"}
                                            alt={`Category Image`}
                                            width={100}
                                            height={50}
                                            style={{ objectFit: "cover", borderRadius: "5px" }}
                                        />
                                    </div>
                                );
                            }
                        };
                    }
                    if (key.toLowerCase().includes("date")) {
                        return {
                            field: key,
                            headerName: key.charAt(0).toUpperCase() + key.slice(1),
                            flex: 2,
                            cellRenderer: (params) => {
                                const formattedDate = formatDate(params.value);
                                return <span>{formattedDate}</span>;
                            }
                        };
                    }
                    if (
                        key === "title" ||
                        key === "name" ||
                        key === "carName" ||
                        key === "companyName" ||
                        key === "brand" ||
                        key === "model"
                    ) {
                        return {
                            field: key,
                            flex: 2,
                            headerName: key.charAt(0).toUpperCase() + key.slice(1),
                            sortable: true,
                            filter: true,
                            cellRenderer: (params) => <h6 className="title">{params.value}</h6>
                        };
                    }
                    return {
                        field: key,
                        headerName: key.charAt(0).toUpperCase() + key.slice(1)
                    };
                });

            const carAction = [
                {
                    headerName: "Car Actions",
                    width: 200,
                    cellRenderer: (params) => {
                        const id = params.data?.id;
                        const currentStatus = params.data?.status;

                        return (
                            <div className="btnCont">
                                <button
                                    title="Toggle Status"
                                    className={`themeBtn statusBtn iconBtn ${
                                        currentStatus === true ? "active" : "inactive"
                                    } ${statusMutation.isPending ? "disabled" : ""}`}
                                    onClick={() => {
                                        statusMutation.mutate({ id, enable: !currentStatus });
                                    }}
                                    disabled={statusMutation.isPending}
                                >
                                    <i className="fas fa-power-off" />
                                </button>
                                <Link title="Edit" className="themeBtn" href={`${pathName}/edit/${id}`}>
                                    <i className="fas fa-pencil" />
                                </Link>
                            </div>
                        );
                    }
                }
            ];

            const actionColumn = {
                headerName: "Action",
                flex: 1,
                cellRenderer: (params) => {
                    if (!showAction) {
                        return null;
                    }

                    return (
                        <div className="btnCont">
                            <Link className="themeBtn" href={`${pathName}/edit/${params.data?.id}`}>
                                Edit
                            </Link>
                            <button
                                className="themeBtn"
                                onClick={() => handleDelete(params.data?.id)}
                                disabled={deleteMutation.isPending}
                            >
                                {deleteMutation.isPending ? <Spinner /> : "Delete"}
                            </button>
                        </div>
                    );
                }
            };

            setColDefs([
                {
                    headerName: "Sr No.",
                    valueGetter: "node.rowIndex + 1",
                    width: 100
                },
                ...dynamicFields,
                ...(showAdminActions ? carAction : []),
                ...(showAction ? [actionColumn] : [])
            ]);
        }
    }, [rowData, showAdminActions]); // 👈 Add showAdminActions as a dependency

    return (
        <div className="dataTable ag-theme-alpine">
            <AgGridReact
                rowData={rowData}
                rowHeight={120}
                domLayout="normal" // Allows horizontal scrolling
                columnDefs={colDefs}
                pagination={true}
                defaultColDef={setColDefs}
                paginationPageSize={10}
                headerHeight={80}
                suppressCellFocus={true}
                suppressHorizontalScroll={false}
            />
        </div>
    );
};

export default AdminDataTable;
