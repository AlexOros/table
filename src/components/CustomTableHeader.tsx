import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TableSortLabel
} from "@material-ui/core";
import React from "react";
import FilterListIcon from "@material-ui/icons/FilterList";

export const CustomTableHeader: React.FC<any> = ({ column, children }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <IconButton onClick={() => setOpen(true)} size="small">
        <FilterListIcon fontSize="inherit" />
      </IconButton>
      <br />
      <TableSortLabel
        {...column.getSortByToggleProps()}
        active={column.isSorted}
        direction={column.isSortedDesc ? "desc" : "asc"}
      >
        {children}
      </TableSortLabel>
      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        column={column}
      />
    </div>
  );
};

type CustomDialogProps = {
  open: boolean;
  onClose: () => void;
  column: any;
};

const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  onClose,
  column
}) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Custom filtering</DialogTitle>
      <DialogContent>
        <DefaultColumnFilter column={column} />
      </DialogContent>
    </Dialog>
  );
};

export default CustomTableHeader;

type ColFilterProps = { column: any };

// Define a default UI for filtering
const DefaultColumnFilter: React.FC<ColFilterProps> = ({ column }) => {
  const { filterValue, preFilteredRows, setFilter } = column;
  console.log("~ column", column);
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
};
