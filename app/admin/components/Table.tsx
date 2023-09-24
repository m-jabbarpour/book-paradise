"use client";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { AG_GRID_LOCALE_FA } from "@/constants/Ag_Grid_Locale_Fa";

import { useTheme } from "next-themes";

const defaultColDef = {
  resizable: true,
  sortable: true,
  flex: 1,
};

interface Props<T> {
  rowData: T[] | undefined;
  columnDefs: ColDef<T, unknown>[];
}

function Table<T>({ rowData, columnDefs }: Props<T>) {
  const { resolvedTheme } = useTheme();

  return (
    <div
      className={`${
        resolvedTheme === "dark" ? "ag-theme-alpine-dark" : "ag-theme-alpine"
      } w-full h-[calc(100vh-160px)]`}
    >
      <AgGridReact<T>
        rowData={rowData}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        enableRtl={true}
        pagination={true}
        paginationPageSize={10}
        localeText={AG_GRID_LOCALE_FA}
      />
    </div>
  );
}

export default Table;
