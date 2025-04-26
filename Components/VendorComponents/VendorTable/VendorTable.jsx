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
import { boostCar, changeCarStatus, deleteCar, deleteDiscountPrice } from "@/Services/VendorServices/VendorServices";
import { formatDate } from "@/Utils/Utils";

ModuleRegistry.registerModules([AllCommunityModule]);

const VendorTable = ({ data = [], refetchData, action, refreshItem, refetchVendor }) => {
    const gridRef = useRef(null);
    const pathName = usePathname();
    const [colDefs, setColDefs] = useState([]);
    const [localRowData, setLocalRowData] = useState(data);

    const statusMutation = useMutation({
        mutationFn: changeCarStatus,
        onSuccess: () => {
            toast.success("Status Updated");
            refetchData?.();
            if (typeof refetchVendor === 'function') {
                refetchVendor();
            }
        },
        onError: (error) => {
            console.log("refreshItem", refreshItem);
            if (refreshItem?.used === refreshItem?.quantity) {
                toast.error("You have used your Active limit, Please make 1 car inactive to make another active");
            } else {
                const errorMessage = error?.response?.data?.message || "Failed to update status";
                toast.error(errorMessage);
            }
        }
    });

    const refreshCar = useMutation({
        mutationFn: boostCar,
        onSuccess: () => {
            toast.success("Car Boosted");
        },
        onError: (res) => {
            if (res?.response?.data?.errors[0]?.message === "You have already used your refresh limit") {
                toast.error("You have Used Your Refresh Limit");
            }
            else {
                toast.error("Failed to refresh car");
            }
        }
    });

    const deleteDiscountPriceMutation = useMutation({
        mutationFn: deleteDiscountPrice,
        onSuccess: () => {
            toast.success("Discounted Price Deleted");
            refetchData?.();
        },
        onError: () => {
            toast.error("Failed to delete discounted price");
        }
    })

    const deleteCarMutation = useMutation({
        mutationFn: deleteCar,
        onSuccess: () => {
            toast.success("Car Deleted");
            refetchData?.();
        },
        onError: () => {
            toast.error("Error Deleting Car.")
        }
    })

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
                if (key === "adminStatus") {
                    return {
                        field: key,
                        headerName: "Admin Status",
                        flex: 1,
                        cellRenderer: (params) => {
                            const currentStatus = params.data?.adminStatus;

                            return <p>{currentStatus ? "Active" : "Inactive"}</p>;
                        }
                    };
                }
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
                if (key === 'time') {
                    return {
                        field: key,
                        headerName: "Date",
                        flex: 1,
                        cellRenderer: (params) => {
                            const updatedDate = formatDate(params?.value)
                            return <p>{updatedDate}</p>;
                        }
                    }
                }
                if (key === "prices") {
                    return {
                        field: key,
                        headerName: "Date",
                        flex: 2,
                        cellRenderer: (params) => {
                            return params?.value?.map((item, index) => (
                                <div className="priceBox" key={index}>
                                    <p key={index}>{item?.priceType} Price: <span>{item?.price}</span></p>
                                    <p key={index}>{item?.priceType} Discounted Price: <span>{item?.discountedPrice}</span></p>
                                </div>
                            ))

                        }
                    }
                }

                if (key === "deletePrice") {
                    return {
                        field: key,
                        headerName: "Delete Price",
                        flex: 0,
                        cellRenderer: (params) => {
                            return (
                                <div className="btnCont">
                                    <button
                                        title="Toggle Status"
                                        className={`themeBtn statusBtn iconBtn ${deleteDiscountPriceMutation?.isPaused ? "disabled" : ""} `}
                                        onClick={() => {
                                            deleteDiscountPriceMutation.mutate(params?.data?.id);
                                        }}
                                        disabled={deleteDiscountPriceMutation.isPending}
                                    >
                                        <i className="fas fa-trash" />
                                    </button>
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
                flex: 1,
                cellRenderer: (params) => {
                    const id = params.data?.id;
                    const currentStatus = params.data?.status;

                    return (
                        <div className="btnCont">
                            <button
                                title="Toggle Status"
                                className={`themeBtn statusBtn iconBtn ${currentStatus === true ? "active" : "inactive"
                                    } ${statusMutation.isPending ? "disabled" : ""}`}
                                onClick={() => {
                                    statusMutation.mutate({ id, enable: !currentStatus });
                                }}
                                disabled={statusMutation.isPending}
                            >
                                <i className="fas fa-power-off" />
                            </button>
                            <button title="Refresh" onClick={() => refreshCar.mutate(id)} className="themeBtn iconBtn">
                                <i className="fas fa-rocket" />
                            </button>
                            {/* <Link title="Edit" className="themeBtn" href={`${pathName}/edit/${id}`}>
                                <i className="fas fa-pencil" />
                            </Link> */}
                            {/* <button
                                title="Toggle Status"
                                className={`themeBtn statusBtn iconBtn ${deleteCarMutation?.isPaused ? "disabled" : ""} `}
                                onClick={() => {
                                    deleteCarMutation.mutate(params?.data?.id);
                                }}
                                disabled={deleteCarMutation.isPending}
                            >
                                <i className="fas fa-trash" />
                            </button> */}
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
            ...(action ? actionColumn : [])
        ]);
    }, [data]);

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
