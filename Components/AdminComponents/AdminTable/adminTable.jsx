"use client";
import React, { useEffect, useMemo, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import Image from "next/image";
import "./adminTable.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { formatDate } from "@/Utils/Utils";

ModuleRegistry.registerModules([AllCommunityModule]);

const AdminDataTable = (props) => {
  const rowData = props?.data || [];
  const showAction = props?.showAction || false;
  const pathName = usePathname();

  const [colDefs, setColDefs] = useState([]);

  useEffect(() => {
    if (rowData.length > 0) {
      const dynamicFields = Object.keys(rowData[0])
        .filter((key) => key !== "slug" && key !== "id") // Exclude "slug" and "id"
        .map((key) => {
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
                        width={100}
                        height={50}
                        style={{ objectFit: "cover", borderRadius: "5px" }}
                      />
                    ))}
                  </div>
                );
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
              cellRenderer: (params) => (
                <h6 className="title">{params.value}</h6>
              ),
            };
          }
          return {
            field: key,
            headerName: key.charAt(0).toUpperCase() + key.slice(1),
          };
        });

      const actionColumn = {
        headerName: "Action",
        flex: 1,
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
  );
};

export default AdminDataTable;
