import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TableSortLabel
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";

export const CustomTableHeader: React.FC<any> = ({
  column,
  dispatchFormatRules,
  children
}) => {
  const [open, setOpen] = React.useState(false);

  // // TODO this works, take it from here
  // useEffect(() => {
  //   dispatchFormatRules({
  //     type: "addRule",
  //     payload: {
  //       columnId: "firstName",
  //       rule: {
  //         type: "string",
  //         title: "is text equal",
  //         value: "alex",
  //         backgroundColor: "orangered",
  //         color: "white"
  //       }
  //     }
  //   });
  // }, [dispatchFormatRules]);

  // console.log("~ column", column);

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
