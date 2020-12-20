import {
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Table,
  TableSortLabel
} from "@material-ui/core";
import React, { useMemo } from "react";
import {
  Column,
  useTable,
  useSortBy,
  useFilters,
  TableState
} from "react-table";
import { CustomTableCell } from "./CustomTableCell";
import CustomTableHeader from "./CustomTableHeader";
import { useStyles } from "./TableStyles";

type TableProps = {
  data: Array<object>;
  columns: Column[];
};

const useOwnState = (state: TableState) => {
  console.log("~ state", state);
  return state;
};

const CustomTable: React.FC<TableProps> = ({ data, columns }) => {
  const classes = useStyles();

  const memoData = useMemo(() => data, [data]);
  const memoColumns = useMemo(() => columns, [columns]);

  const defaultColumn = {
    Cell: CustomTableCell,
    className: "user",
    style: {
      fontWeight: "bolder"
    }
  };

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns: memoColumns,
      data: memoData,
      defaultColumn,
      useControlledState: useOwnState
    },

    useFilters,
    useSortBy
  );

  return (
    <TableContainer>
      <Table
        {...getTableProps()}
        className={classes.root}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell {...column.getHeaderProps()}>
                  <CustomTableHeader column={column}>
                    {column.render("Header")}
                  </CustomTableHeader>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  console.log("~ cell", cell);
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
