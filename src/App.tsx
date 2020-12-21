import React from "react";
import CustomTable from "./components/CustomTable";
import makeData from "./makeData";

function App() {
  const columns = React.useMemo(() => {
    const col = [
      {
        Header: "First Name",
        accessor: "firstName",
        width: 200
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        width: 200
      },
      {
        Header: "Age",
        accessor: "age",
        width: 80
      },
      {
        Header: "Visits",
        accessor: "visits",
        width: 80
      },
      {
        Header: "Status",
        accessor: "status",
        width: 200
      },
      {
        Header: "Profile Progress",
        accessor: "progress",
        width: 80
      }
    ];
    return col.map(column => ({ ...column, dataType: "number" }));
  }, []);

  const data = React.useMemo(() => makeData(120), []);

  return (
    <div>
      <CustomTable columns={columns} data={data} />
    </div>
  );
}

export default App;
