"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import "./VendorTable.scss";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { boostCar, changeCarStatus } from "@/Services/VendorServices/VendorServices";

ModuleRegistry.registerModules([AllCommunityModule]);

const VendorTable = ({ data = [], refetchData }) => {
    const gridRef = useRef(null);
    const pathName = usePathname();
    const [colDefs, setColDefs] = useState([]);
    const [localRowData, setLocalRowData] = useState(data);
    const [togglingStatusId, setTogglingStatusId] = useState(null);
    const statusMutation = useMutation({
        mutationFn: changeCarStatus,
        onSuccess: (_, variables) => {
            const { id, enable } = variables;
            toast.success("Status Updated");
            refetchData?.();
            setTogglingStatusId(null);
            setLocalRowData((prev) => prev.map((row) => (row.id === id ? { ...row, status: enable } : row)));
        },
        onError: () => {
            toast.error("Failed to update status");
            setTogglingStatusId(null);
        }
    });

    const refreshCar = useMutation({
        mutationFn: boostCar,
        onSuccess: () => {
            toast.success("Car Boosted");
        },
        onError: () => {
            toast.error("Failed to Boost Car");
        }
    });

    useEffect(() => {
        setLocalRowData(data);
    }, [data]);

    const onGridReady = (params) => {
        gridRef.current = params.api;
    };

    useEffect(() => {
        if (!data.length) return;

        const dynamicFields = Object.keys(data[0])
            .filter((key) => key !== "slug" && key !== "id" && key !== "Action")
            .map((key) => {
                if (key === "image") {
                    return {
                        field: key,
                        headerName: "Image",
                        flex: 1,
                        cellRenderer: (params) => {
                            const imageSrc = params.value || "/images/noImage.jpg";
                            return (
                                <div className="tableImgCol">
                                    <Image
                                        src={imageSrc || "/images/noImage.jpg"}
                                        alt="Car Image"
                                        width={100}
                                        height={50}
                                        style={{ objectFit: "cover", borderRadius: "5px" }}
                                    />
                                </div>
                            );
                        }
                    };
                }

                return {
                    field: key,
                    headerName: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
                    sortable: true,
                    filter: true,
                    flex: 1
                };
            });

        const actionColumn = [
            {
                headerName: "Action",
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
                                    setTogglingStatusId(id);
                                }}
                                disabled={statusMutation.isPending}
                            >
                                <i className="fas fa-power-off" />
                            </button>
                            <button title="Refresh" onClick={() => refreshCar.mutate(id)} className="themeBtn iconBtn">
                                <i className="fas fa-rocket" />
                            </button>
                            <Link title="Edit" className="themeBtn" href={`${pathName}/edit/${id}`}>
                                <i className="fas fa-pencil" />
                            </Link>
                        </div>
                    );
                }
            }
        ];

        setColDefs([
            {
                headerName: "Sr No.",
                valueGetter: "node.rowIndex + 1",
                width: 100
            },
            ...dynamicFields,
            ...actionColumn
        ]);
    }, [data, togglingStatusId]);

    const defaultColDef = useMemo(
        () => ({
            resizable: true,
            floatingFilter: false,
            suppressSizeToFit: false
        }),
        []
    );

    return (
        <div className="dataTable ag-theme-alpine">
            <AgGridReact
                ref={gridRef}
                rowData={localRowData}
                columnDefs={colDefs}
                pagination={true}
                paginationPageSize={10}
                defaultColDef={defaultColDef}
                rowHeight={80}
                headerHeight={50}
                suppressCellFocus={true}
                domLayout="autoHeight"
                onGridReady={onGridReady}
            />
        </div>
    );
};

export default VendorTable;
