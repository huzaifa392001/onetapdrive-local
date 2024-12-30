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
            const dynamicFields = Object.keys(rowData[0])
                .filter((key) => key !== "slug" && key !== 'id') // Exclude 'slug' from being rendered in the table
                .map((key) => {
                    const formattedKey = key.replace(/_/g, " "); // Replace underscores with spaces

                    if (key === "images") {
                        return {
                            field: key,
                            flex: 2,
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
                                                width={150}
                                                height={50}
                                                style={{ objectFit: "cover", borderRadius: "5px" }}
                                            />
                                        ))}
                                    </div>
                                );
                            },
                        };
                    }

                    if (key === "title" || key === "name" || key === "car_name") {
                        return {
                            field: key,
                            headerName: formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1),
                            sortable: true,
                            filter: true,
                            flex: 1,
                            cellRenderer: (params) => (
                                <h6 className="title">{params.value}</h6>
                            ),
                        };
                    }

                    return {
                        field: key,
                        headerName: formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1),
                    };
                });

            setColDefs([
                {
                    headerName: "Sr No.",
                    valueGetter: "node.rowIndex + 1",
                },
                ...dynamicFields,
                {
                    headerName: "Action",
                    flex: 1,
                    cellRenderer: (params) => {
                        const id = params.data?.id; // Access 'id' from row data
                        const currentStatus = statusMap[id] || params.data.status || 'inactive'; // Get current status for the row

                        const toggleStatus = () => {
                            const newStatus = currentStatus === 'inactive' ? 'active' : 'inactive';
                            setStatusMap((prevStatusMap) => ({
                                ...prevStatusMap,
                                [id]: newStatus, // Toggle status for the clicked row only
                            }));

                            // Update the status in the localRowData
                            const updatedRowData = localRowData.map((row) =>
                                row.id === id ? { ...row, status: newStatus } : row
                            );
                            setLocalRowData(updatedRowData); // Set the updated rowData
                        };

                        return (
                            <div className="btnCont">
                                <button
                                    className={`themeBtn statusBtn iconBtn ${currentStatus === 'active' ? 'active' : 'inactive'}`}
                                    onClick={toggleStatus}
                                >
                                    <i className={`fas fa-power-off ${currentStatus === 'active' ? 'active' : 'inactive'}`} />
                                    {currentStatus === 'active' ? 'Active' : 'Inactive'}
                                </button>
                                <button className="themeBtn iconBtn">
                                    <i className="fas fa-rocket" />
                                    Boost
                                </button>
                                <Link className="themeBtn" href={`${pathName}/edit/${id}`}>
                                    Edit
                                </Link>
                            </div>
                        );
                    },
                },
            ]);
        }
    }, [rowData, statusMap, localRowData]);

    const defaultColDef = useMemo(() => {
        return {
            floatingFilter: false,
            resizable: false,
        };
    }, []);

    return (
        <div className="dataTable ag-theme-alpine">
            <AgGridReact
                rowData={localRowData} // Use localRowData instead of props.rowData
                rowHeight={120}
                columnDefs={colDefs}
                pagination={true}
                defaultColDef={defaultColDef}
                paginationPageSize={10}
                headerHeight={80}
                suppressCellFocus={true}
            />
        </div>
    );
}

export default VendorTable;
