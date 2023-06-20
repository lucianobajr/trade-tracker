import React from "react";
import { Routes, Route } from "react-router-dom";

import { auth } from "../pages"

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index path="/" element={<auth.SignIn />} />
      <Route index path="/sign-up" element={<auth.SignUp />} />

      <Route path="*" element={<auth.SignIn />} />
    </Routes>
  );
};

export default AuthRoutes;
