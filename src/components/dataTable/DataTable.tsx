/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./dataTable.css";

interface Column {
  title: string;
  data: string;
}

type RowData = Record<string, string>;

interface DataTableProps {
  id: string;
  className?: string;
  data: RowData[];
  columns: Column[];
}

function DataTable({ id, className, data, columns }: DataTableProps) {
  console.log(data);
  console.log(columns);
  // console.log(id);
  // console.log(className);
  const [columnSort, setColumnSort] = useState<{
    id: string;
    direction: string;
  } | null>(null);

  const rowContent = (rowData: RowData) => {
    // console.log(rowData);
    return columns.map((column: Column, index: number) => (
      <td key={index}>{rowData[column.data]}</td>
    ));
  };

  const handleColumnSort = (columnId: string) => {
    if (columnSort?.id === columnId) {
      setColumnSort({
        ...columnSort,
        direction: columnSort.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setColumnSort({ id: columnId, direction: "asc" });
    }
  };

  return (
    <div id={`${id}_wrapper`} className="dataTable_wrapper">
      <table id={id} className={`${className} dataTable`}>
        <thead>
          <tr>
            {columns.map((column: Column, index: number) => (
              <th
                key={index}
                onClick={() => {
                  handleColumnSort(column.data);
                }}
                className={
                  columnSort?.id === column.data ? columnSort.direction : ""
                }
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((rowData: RowData, index: number) => (
            <tr key={index}>{rowContent(rowData)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
