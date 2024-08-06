/* eslint-disable @typescript-eslint/no-explicit-any */

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

  const rowContent = (rowData: RowData) => {
    console.log(rowData);
    return columns.map((column: Column, index: number) => (
      <td key={index}>{rowData[column.data]}</td>
    ));
  };

  return (
    <table id={id} className={className}>
      <thead>
        <tr>
          {columns.map((column: Column, index: number) => (
            <th key={index}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((rowData: RowData, index: number) => (
          <tr key={index}>{rowContent(rowData)}</tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
