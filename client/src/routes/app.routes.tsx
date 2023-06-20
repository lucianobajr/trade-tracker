import React from "react";
import { Routes, Route } from "react-router-dom";

import { app } from "../pages"

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index path="/" element={<app.Home />} />

      <Route path="*" element={<app.Home />} />
    </Routes>
  );
};

export default AppRoutes;
