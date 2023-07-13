import React from "react";
import { useFetch } from "../../../../hooks/useFetch";
import ComplexTable from "./components/complex-table";

const City: React.FC = () => {
  const { data } = useFetch("/cities")

  if (!data) {
    return <div className="mt-3"><p>Carregando...</p></div>;
  }

  return (
    <div className="mt-3">
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
        <div>
          <ComplexTable tableData={data} />
        </div>
      </div>
    </div>
  );
};

export default City;
