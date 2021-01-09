import React from "react";
import { Cell } from "react-table";
import { Immutable } from "seamless-immutable";

type CellProps = {
  cell: Cell;
  cells: Cell[];
  rules?: Immutable<{}>;
};

export const CustomTableCell: React.FC<CellProps> = ({
  cells,
  cell,
  rules
}) => {
  // TODO clue is here
  console.log("cell", cell);
  console.log("cells", cells);
  const { allCells } = cell.row;

  const isFullRow = allCells.find(cell => cell.value === 0);

  return (
    <div
      style={{
        background: isFullRow ? "orangered" : "white"
      }}
    >
      {/* {cell.value % 2 === 0 && "🎄"} */}
      {cell.value}
    </div>
  );
};
