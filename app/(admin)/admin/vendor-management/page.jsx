'use client';
import React, { useEffect, useMemo, useState } from "react";
import AdminDataTable from "@/Components/AdminComponents/AdminTable/adminTable";
import SecHeading from "@/Components/SecHeading/SecHeading";
import Link from "next/link";
import Data from "@/DummyData/adminVendorManagement.json";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { usePathname } from "next/navigation";

ModuleRegistry.registerModules([AllCommunityModule]);

function Page() {
    // Memoize rowData to prevent unnecessary recalculations
    const rowData = useMemo(() => Data || [], [Data]);
    const [colDefs, setColDefs] = useState([]);
    const showAction = true;
    const pathName = usePathname();

    useEffect(() => {
        if (rowData.length > 0) {
            const dynamicFields = Object.keys(rowData[0])
                .filter((key) => key !== "slug" && key !== "id") // Exclude "slug" and "id"
                .map((key) => {
                    if (key === "company_name") {
                        return {
                            field: key,
                            headerName: "Company Name",
                            flex: 2,
                            sortable: true,
                            filter: true,
                            cellRenderer: (params) => {
                                return <h6 className="title">{params.value}</h6>;
                            },
                        };
                    }
                    if (key === "name") {
                        return {
                            field: key,
                            headerName: "Vendor Name",
                            flex: 2,
                            sortable: true,
                            filter: true,
                            cellRenderer: (params) => {
                                return <h6 className="title heavy">{params.value}</h6>;
                            },
                        };
                    }
                    if (key === "email" || key === "contact") {
                        return {
                            field: key,
                            headerName: key === 'email' ? "Email" : "Contact",
                            flex: 2,
                            cellRenderer: (params) => {
                                return <h6 className="title">{params.value}</h6>;
                            },
                        };
                    }
                    if (key.toLowerCase().includes("date")) {
                        return {
                            field: key,
                            headerName: key.charAt(0).toUpperCase() + key.slice(1),
                            flex: 2,
                            cellRenderer: (params) => {
                                const formattedDate = formatDate(params.value)
                                return <span>{formattedDate}</span>;
                            },
                        };
                    }
                    return {
                        field: key,
                        flex: 1,
                        headerName: key.charAt(0).toUpperCase() + key.slice(1),
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
                                onClick={() =>
                                    alert(`Delete clicked for row: ${params.node.rowIndex + 1}`)
                                }
                            >
                                Delete
                            </button>
                        </div>
                    );
                },
            };

            setColDefs([
                {
                    headerName: "Sr No.",
                    valueGetter: "node.rowIndex + 1",
                    flex: 1,
                },
                ...dynamicFields,
                ...(showAction ? [actionColumn] : []),
            ]);
        }
    }, [rowData, showAction, pathName]); // Added pathName to the dependency array

    const defaultColDef = useMemo(() => {
        return {
            floatingFilter: false,
            resizable: false,
        };
    }, []);

    return (
        <>
            <div className="headingCont">
                <SecHeading heading="Vendor Management" />
                <Link href="vendor-management/create" className="themeBtn">
                    Create
                </Link>
            </div>
            <div className="dataTable ag-theme-alpine">
                <AgGridReact
                    rowData={rowData}
                    rowHeight={120}
                    domLayout="normal" // Allows horizontal scrolling
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
}

export default Page;
