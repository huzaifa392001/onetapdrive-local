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

ModuleRegistry.registerModules([AllCommunityModule]);

const AdminDataTable = (props) => {
    const rowData = props?.data || [];
    const showAction = props?.showAction || false;
    const pathName = usePathname();

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

            // ✅ Fix: `actionColumn` ko function call kar ke pass karein
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
                { headerName: "Sr No.", valueGetter: "node.rowIndex + 1" },
                ...dynamicFields,
                ...(showAction ? [actionColumn] : []) // ✅ Fix: `actionColumn` ko array mein call karein
            ]);
        }
    }, [rowData, showAction, pathName]); // ✅ Fix: `onDelete` ko dependencies mein add karein

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
