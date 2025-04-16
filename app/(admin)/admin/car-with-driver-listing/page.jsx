"use client";
import React, { useEffect, useMemo, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SecHeading from "@/Components/SecHeading/SecHeading";
import CarListingData from "@/DummyData/CarListing.json";

ModuleRegistry.registerModules([AllCommunityModule]);

const Page = () => {
    // Memoize rowData to prevent unnecessary recalculations
    const rowData = useMemo(() => CarListingData || [], [CarListingData]);
    const showAction = true;
    const pathName = usePathname();

    const [colDefs, setColDefs] = useState([]);

    useEffect(() => {
        if (rowData.length > 0) {
            const dynamicFields = Object.keys(rowData[0])
                .filter((key) => key !== "slug" && key !== "id") // Exclude "slug" and "id"
                .map((key) => {
                    if (key === "carName") {
                        return {
                            field: key,
                            flex: 2,
                            headerName: "Car Name",
                            sortable: true,
                            filter: true,
                            cellRenderer: (params) => <h6 className="title">{params.value}</h6>
                        };
                    }
                    if (key === "companyName") {
                        return {
                            field: key,
                            flex: 2,
                            headerName: "Company Name",
                            sortable: true,
                            filter: true,
                            cellRenderer: (params) => <h6 className="title">{params.value}</h6>
                        };
                    }
                    if (key === "price") {
                        return {
                            field: key,
                            flex: 2,
                            headerName: "Price",
                            cellRenderer: (params) => <h6 className="title">AED {params.value.perDay} / Day</h6>
                        };
                    }
                    return {
                        field: key,
                        flex: 1,
                        headerName: key.charAt(0).toUpperCase() + key.slice(1)
                    };
                });

            const actionColumn = {
                headerName: "Action",
                flex: 2,
                cellRenderer: (params) => {
                    const slug = params.data?.slug;

                    if (!showAction) {
                        return null;
                    }

                    return (
                        <div className="btnCont">
                            <Link className="themeBtn" href={`${pathName}/edit/${slug}`}>
                                Edit
                            </Link>
                            <button
                                className="themeBtn"
                                onClick={() => alert(`Delete clicked for row: ${params.node.rowIndex + 1}`)}
                            >
                                Delete
                            </button>
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

    const defaultColDef = useMemo(() => {
        return {
            floatingFilter: false,
            resizable: false
        };
    }, []);

    return (
        <>
            <div className="headingCont">
                <SecHeading heading="Car With Driver Listing" />
                <Link href={"/admin/car-with-driver-listing/create"} className="themeBtn">
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
                    suppressHorizontalScroll={false}
                />
            </div>
        </>
    );
};

export default Page;
