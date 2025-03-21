'use client'
import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import "./VendorTable.scss";

ModuleRegistry.registerModules([AllCommunityModule]);

function VendorTable(props) {
    const rowData = props?.data || [];
    const pathName = usePathname();

    const [colDefs, setColDefs] = useState([]);
    const [statusMap, setStatusMap] = useState({}); // Store status for each row by id
    const [localRowData, setLocalRowData] = useState(rowData); // Local state to manage rowData

    useEffect(() => {
        if (rowData.length > 0) {
            console.log("rowData is not empty. Processing dynamic fields...");

            const dynamicFields = Object.keys(rowData[0])
                .filter((key) => key !== "slug" && key !== "id" && key !== "Action")
                .map((key) => {
                    const formattedKey = key.replace(/_/g, " ");
                    if (key === "images") {
                        return {
                            field: key,
                            flex: 1, // Use flex to allow this column to grow
                            headerName: "Images",
                            cellRenderer: (params) => {
                                const imagePaths = Array.isArray(params.value)
                                    ? params.value
                                    : params.value.split(",");

                                return (
                                    <div className="tableImgCol">
                                        {imagePaths.map((src, index) => (
                                            <Image
                                                key={index}
                                                src={src.trim()}
                                                alt={`Image ${index + 1}`}
                                                width={100} // Reduced width for better fit
                                                height={50}
                                                style={{ objectFit: "cover", borderRadius: "5px" }}
                                            />
                                        ))}
                                    </div>
                                );
                            },
                        };
                    }

                    if (key === "title" || key === "Name" || key === "Car") {
                        return {
                            field: key,
                            headerName: formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1),
                            sortable: true,
                            filter: true,
                            flex: 1, // Use flex to allow this column to grow
                            cellRenderer: (params) => (
                                <h6 className="title">{params.value}</h6>
                            ),
                        };
                    }

                    if (key === "Date") {
                        console.log("Adding Date field with custom comparator.");
                        return {
                            field: key,
                            headerName: formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1),
                            filter: 'agDateColumnFilter', // Enable date filter
                            sortable: true,
                            width: 150, // Fixed width for date column
                            filterParams: {
                                comparator: (filterDate, cellValue) => {
                                    console.log("Comparing dates: filterDate =", filterDate, "cellValue =", cellValue);
                                    const cellDate = new Date(cellValue);
                                    if (cellDate < filterDate) {
                                        return -1;
                                    } else if (cellDate > filterDate) {
                                        return 1;
                                    }
                                    return 0;
                                },
                                browserDatePicker: true, // Use the browser's date picker
                            },
                        };
                    }

                    return {
                        field: key,
                        headerName: formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1),
                        flex: 1, // Use flex to allow this column to grow
                    };
                });

            // Check if the "Action" key exists in the data
            const hasActionKey = Object.keys(rowData[0]).includes("Action");

            const actionColumn = hasActionKey
                ? [
                    {
                        headerName: "Action",
                        width: 200, // Fixed width for action column
                        cellRenderer: (params) => {
                            const id = params.data?.id;
                            const currentStatus = statusMap[id] || params.data.status || 'inactive';

                            const toggleStatus = () => {
                                const newStatus = currentStatus === 'inactive' ? 'active' : 'inactive';
                                setStatusMap((prevStatusMap) => ({
                                    ...prevStatusMap,
                                    [id]: newStatus,
                                }));

                                const updatedRowData = localRowData.map((row) =>
                                    row.id === id ? { ...row, status: newStatus } : row
                                );
                                console.log("Updated rowData:", updatedRowData);
                                setLocalRowData(updatedRowData);
                            };

                            return (
                                <div className="btnCont">
                                    <button
                                        className={`themeBtn statusBtn iconBtn ${currentStatus === 'active' ? 'active' : 'inactive'}`}
                                        onClick={toggleStatus}
                                    >
                                        <i className={`fas fa-power-off ${currentStatus === 'active' ? 'active' : 'inactive'}`} />
                                        {/* {currentStatus === 'active' ? 'Active' : 'Inactive'} */}
                                    </button>
                                    <button className="themeBtn iconBtn">
                                        <i className="fas fa-rocket" />
                                        {/* Boost */}
                                    </button>
                                    <Link className="themeBtn" href={`${pathName}/edit/${id}`}>
                                    <i className="fas fa-pencil" />
                                        {/* Edit */}
                                    </Link>
                                </div>
                            );
                        },
                    },
                ]
                : []; // If "Action" key is not present, exclude the column

            setColDefs([
                {
                    headerName: "Sr No.",
                    valueGetter: "node.rowIndex + 1",
                    width: 100, // Fixed width for serial number column
                },
                ...dynamicFields,
                ...actionColumn, // Conditionally add the "Action" column
            ]);

        }
    }, [rowData, statusMap, localRowData]);

    const defaultColDef = useMemo(() => {
        return {
            floatingFilter: false,
            resizable: true, // Allow columns to be resized
            suppressSizeToFit: false, // Ensure columns fit the screen
        };
    }, []);

    return (
        <div className="dataTable ag-theme-alpine">
            <AgGridReact
                rowData={localRowData} // Use localRowData instead of props.rowData
                rowHeight={80} // Reduced row height for better fit
                columnDefs={colDefs}
                pagination={true}
                defaultColDef={defaultColDef}
                paginationPageSize={10}
                headerHeight={50} // Reduced header height
                suppressCellFocus={true}
                domLayout="autoHeight" // Adjust table height dynamically
                suppressHorizontalScroll={false} // Enable horizontal scrolling
            />
        </div>
    );
}

export default VendorTable;