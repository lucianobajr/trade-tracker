import React from "react";
import { Routes, Route } from "react-router-dom";

import { Main } from "../pages"

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index path="/" element={<Main />} />

      <Route path="*" element={<Main />} />
    </Routes>
  );
};

export default AppRoutes;
