import {
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Table,
  TablePagination
} from "@material-ui/core";
import React, { useMemo } from "react";
import {
  Column,
  useTable,
  useSortBy,
  useFilters,
  TableState,
  usePagination,
  useBlockLayout
} from "react-table";
import { CustomTableCell } from "./CustomTableCell";
import CustomTableHeader from "./CustomTableHeader";
import { useStyles } from "./TableStyles";
import useFormatter, { Rule } from "./conditional-formatting/useFormatter";

type TableProps = {
  data: Array<object>;
  columns: Column[];
};

const CustomTable: React.FC<TableProps> = ({ data, columns }) => {
  const classes = useStyles();
  const memoData = useMemo(() => data, [data]);
  const memoColumns = useMemo(() => columns, [columns]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    flatRows,
    page,
    columns: tableColumns,
    gotoPage
  } = useTable(
    {
      columns: memoColumns,
      data: memoData,
      initialState: {
        pageSize: 10
      }
    },
    useFilters,
    useSortBy,
    usePagination,
    useBlockLayout
  );
  const { formatRules, dispatchFormatRules } = useFormatter(tableColumns, page);

  console.log("~ page", page);
  const { pageIndex, pageSize } = state;

  const handleChangePage = (event: unknown, newPage: number) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    gotoPage(+event.target.value);
  };

  return (
    <>
      <TableContainer className={classes.root}>
        <Table {...getTableProps()} size="small" aria-label="a dense table">
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell {...column.getHeaderProps()}>
                    <CustomTableHeader
                      column={column}
                      dispatchFormatRules={dispatchFormatRules}
                    >
                      {column.render("Header")}
                    </CustomTableHeader>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              const { cells } = row;
              return (
                <TableRow {...row.getRowProps()}>
                  {cells.map(cell => {
                    const rules = formatRules.getIn([cell.column.id]) ?? [];
                    return (
                      <TableCell {...cell.getCellProps()}>
                        <CustomTableCell
                          cells={cells}
                          cell={cell}
                          rules={rules}
                        >
                          {cell.render("Cell")}
                        </CustomTableCell>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={flatRows.length}
          rowsPerPage={pageSize}
          page={pageIndex}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};

export default CustomTable;
