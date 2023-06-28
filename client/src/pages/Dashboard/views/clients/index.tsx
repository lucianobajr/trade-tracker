import React from "react";
import ComplexTable from "./components/complex-table";
import tableDataComplex from "./variables/table-data-complex";

const Clients: React.FC = () => {
  return (
    <div className="mt-3">
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
        {/* Check Table */}
        <div>
          <ComplexTable tableData={tableDataComplex} />
        </div>
      </div>
    </div>
  );
};

export default Clients;
