/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
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
  }>({ id: columns[0].data, direction: "asc" });
  const [search, setSearch] = useState<string>("");

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (a[columnSort.id] < b[columnSort.id])
        return columnSort.direction === "asc" ? -1 : 1;
      if (a[columnSort.id] > b[columnSort.id])
        return columnSort.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, columnSort]);

  const dataMatcheSearch = useMemo(() => {
    return sortedData.filter((row) => {
      for (const key in row) {
        if (row[key].toLowerCase().includes(search)) {
          return true;
        }
      }
      return false;
    });
  }, [search, sortedData]);

  const rowContent = (rowData: RowData) => {
    // console.log(rowData);
    return columns.map((column: Column, index: number) => (
      <td key={index}>{rowData[column.data]}</td>
    ));
  };

  const handleColumnSort = (columnId: string) => {
    if (columnSort.id === columnId) {
      setColumnSort({
        ...columnSort,
        direction: columnSort.direction === "asc" ? "desc" : "asc",
      });
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLocaleLowerCase());
    console.log(search);
  };

  return (
    <div id={`${id}_wrapper`} className="dataTable_wrapper">
      <div className={`${id}_filter`}>
        <label htmlFor="input-search">Search :</label>
        <input type="search" id="input-search" onChange={handleSearch} />
      </div>
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
                  columnSort.id === column.data ? columnSort.direction : ""
                }
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataMatcheSearch.map((rowData: RowData, index: number) => (
            <tr key={index}>{rowContent(rowData)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
