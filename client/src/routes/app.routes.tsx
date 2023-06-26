import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { app } from "../pages"

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<app.Dashboard />} />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />

    </Routes>
  );
};

export default AppRoutes;