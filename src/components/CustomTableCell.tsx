import React, { useEffect } from "react";
import { Immutable } from "seamless-immutable";

type CellProps = {
  cell: any;
  rules?: Immutable<{}>;
};

export const CustomTableCell: React.FC<CellProps> = ({ cell, rules }) => {
  // useEffect(() => {
  //   console.log("~ rules", rules);
  // }, [rules]);

  return (
    <div>
      {cell.value % 2 === 0 ? "🎄" : <span style={{ opacity: 0 }}>🍂</span>}
      {cell.value}
    </div>
  );
};
