import React from "react";

export const CustomTableCell: React.FC<any> = state => {
  console.log("~ state", state);

  const { cell } = state;

  return <div>🎄{cell.value}</div>;
};

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
