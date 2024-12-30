'use client';
import React, { useEffect, useMemo, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "./LeadsManagementLayout.scss"
import { usePathname } from "next/navigation";
import SecHeading from "@/Components/SecHeading/SecHeading";

const LeadsManagementLayout = (props) => {
  ModuleRegistry.registerModules([AllCommunityModule]);
    const rowData = props?.data || [];
    const pathName = usePathname();
  
    useEffect(() => {
      console.log("pathname=> ", pathName);
    });
  
    const [colDefs, setColDefs] = useState([]);
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [10, 20, 50];
    useEffect(() => {
      if (rowData.length > 0) {
        const dynamicFields = Object.keys(rowData[0])
          .filter((key) => key !== "slug") // Exclude 'slug' from being rendered in the table
          .map((key) => {
            
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
              flex: 1,
              headerName: key.charAt(0).toUpperCase() + key.slice(1),
            };
          });
  
        setColDefs([
          {
            headerName: "S No.",
            valueGetter: "node.rowIndex + 1",
            filter: false
          },
          ...dynamicFields,
          // {
          //   headerName: "Action",
          //   cellRenderer: (params) => {
          //     const slug = params.data?.slug; // Access 'slug' from row data
          //     return (
          //       <div className="btnCont">
          //         <Link className="themeBtn" href={`${pathName}/view/${slug}`}>
          //           View Details
          //         </Link>
          //       </div>
          //     );
          //   },
          // },
        ]);
      }
    }, [rowData]);
    const defaultColDef = useMemo(() => {
      return {
        filter: "agTextColumnFilter",
        floatingFilter: false,
        resizable: false,
      };
    }, []);
  return (
    <>
      <SecHeading heading="Leads Management" />
      <div className="inquiryTable">
        <AgGridReact
          rowData={rowData}
          rowHeight={70}
          columnDefs={colDefs}
          pagination={true}
          defaultColDef={defaultColDef}
          headerHeight={80}
          suppressCellFocus={true}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          enableCellTextSelection={true} 
        />
      </div>
    </>
  );
};

export default LeadsManagementLayout
