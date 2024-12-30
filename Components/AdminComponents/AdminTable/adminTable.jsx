"use client";
import React, { useEffect, useMemo, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import Image from "next/image";
import "./adminTable.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

ModuleRegistry.registerModules([AllCommunityModule]);

const AdminDataTable = (props) => {
  const rowData = props?.data || [];
  const pathName = usePathname()

  const [colDefs, setColDefs] = useState([]);

  useEffect(() => {
    if (rowData.length > 0) {
      const dynamicFields = Object.keys(rowData[0])
        .filter((key) => key !== "slug") // Exclude 'slug' from being rendered in the table
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
          if (key === "title" || key === "name") {
            return {
              field: key,
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
            const slug = params.data?.slug; // Access 'slug' from row data
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
        },
      ]);
    }
  }, [rowData, pathName]); // Added pathName as a dependency


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
        columnDefs={colDefs}
        pagination={true}
        defaultColDef={defaultColDef}
        paginationPageSize={10}
        headerHeight={80}
        suppressCellFocus={true}
      />
    </div>
  );
};

export default AdminDataTable;
