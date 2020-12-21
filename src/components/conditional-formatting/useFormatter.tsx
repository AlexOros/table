import { useEffect, useReducer } from "react";
import Immutable from "seamless-immutable";

export type Rule = {
  type: string;
  title: string;
  value: string | number;
  backgroundColor: string;
  color: string;
};

type Action =
  | { type: "init"; payload: string }
  | { type: "addRule"; payload: { columnId: string; rule: Rule } };

const defaultState = Immutable({});

const countReducer = (state = Immutable({}), action: Action) => {
  switch (action.type) {
    case "init": {
      return state.setIn([action.payload], []);
    }
    case "addRule": {
      return state.updateIn([action.payload.columnId], arr => [
        ...(arr || []),
        action.payload.rule
      ]);
    }
    default: {
      throw new Error("Unhandled action type");
    }
  }
};

const useFormatter = (columns: any, page: any) => {
  const [state, dispatch] = useReducer(countReducer, defaultState);

  useEffect(() => {
    console.log("~ page", page); // all rows of the current page
    page.forEach(
      (rows: any) =>
        rows.cells.forEach((cell: any) => console.log(cell.getCellProps())) // ???!!! here
    );

    columns.map((column: any) =>
      dispatch({ type: "init", payload: column.columnId })
    );
  }, [columns]);

  return { formatRules: state, dispatchFormatRules: dispatch };
};

export default useFormatter;
