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
  // console.log(data);
  console.log(columns);
  // console.log(id);
  // console.log(className);
  const [columnSort, setColumnSort] = useState<{
    id: string;
    direction: string;
  }>({ id: columns[0].data, direction: "asc" });
  const [search, setSearch] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);

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

  const paginationData = useMemo(() => {
    console.log(dataMatcheSearch);
    const startIndex = rowsPerPage * currentPage;
    return dataMatcheSearch.slice(startIndex, startIndex + rowsPerPage);
  }, [dataMatcheSearch, currentPage, rowsPerPage]);

  const rowContent = (rowData: RowData) => {
    // console.log(rowData);
    return columns.map((column: Column, index: number) => (
      <td
        key={index}
        className={columnSort.id === column.data ? "column-short_cell" : ""}
      >
        {rowData[column.data]}
      </td>
    ));
  };

  const handleColumnSort = (columnId: string) => {
    if (columnSort.id === columnId) {
      setColumnSort({
        ...columnSort,
        direction: columnSort.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setColumnSort({ id: columnId, direction: "asc" });
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLocaleLowerCase());
    setCurrentPage(0);
    console.log(search);
  };

  const handleSelectRows = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    console.log(rowsPerPage);
  };

  const maxPage = useMemo(() => {
    return Math.ceil(dataMatcheSearch.length / rowsPerPage);
  }, [dataMatcheSearch, rowsPerPage]);

  const nextPage = () => {
    if (currentPage < maxPage - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginateBtnPage = () => {
    const btnList = [];
    for (let i = 0; i < maxPage; i++) {
      btnList.push(
        <a
          className={`paginate_button ${currentPage === i ? "current" : ""}`}
          key={`paginate-${i}`}
          onClick={() => {
            setCurrentPage(i);
          }}
        >
          {i + 1}
        </a>
      );
    }
    return btnList;
  };

  return (
    <div id={`${id}_wrapper`} className="dataTables_wrapper">
      <div className="dataTables-header">
        <div id={`${id}_length`} className="dataTables_length">
          <label>
            Show{" "}
            <select name={`${id}_length`} onChange={handleSelectRows}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>{" "}
            entries
          </label>
        </div>
        <div id={`${id}_filter`} className="dataTables_filter">
          <label>
            Search:{" "}
            <input type="search" id="input-search" onChange={handleSearch} />
          </label>
        </div>
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
          {dataMatcheSearch.length > 0 ? (
            paginationData.map((rowData: RowData, index: number) => (
              <tr key={index}>{rowContent(rowData)}</tr>
            ))
          ) : (
            <tr>
              <td className="dataTables_empty" colSpan={columns.length}>
                No matching records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="dataTables-footer">
        <div className="dataTables_info" id={`${id}_info`}>
          Showing{" "}
          {`${
            paginationData.length > 0 ? rowsPerPage * currentPage + 1 : 0
          } to ${paginationData.length} of ${dataMatcheSearch.length}`}
          {dataMatcheSearch.length !== sortedData.length &&
            ` (filtered from ${data.length} total entries)`}
        </div>
        <div className="dataTables_paginate" id={`${id}_paginate`}>
          <button
            className="paginate_button"
            onClick={previousPage}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <span>{paginateBtnPage()}</span>
          <button
            className="paginate_button"
            onClick={nextPage}
            disabled={currentPage === maxPage - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
