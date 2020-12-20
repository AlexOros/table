import React from "react";
import CustomTable from "./components/CustomTable";
import makeData from "./makeData";

function App() {
  const columns = React.useMemo(() => {
    const col = [
      {
        Header: "First Name",
        accessor: "firstName"
      },
      {
        Header: "Last Name",
        accessor: "lastName"
      },
      {
        Header: "Age",
        accessor: "age"
      },
      {
        Header: "Visits",
        accessor: "visits"
      },
      {
        Header: "Status",
        accessor: "status"
      },
      {
        Header: "Profile Progress",
        accessor: "progress"
      }
    ];
    return col.map(column => ({ ...column, dataType: "number" }));
  }, []);

  const data = React.useMemo(() => makeData(20), []);

  return (
    <div>
      <CustomTable columns={columns} data={data} />
    </div>
  );
}

export default App;
