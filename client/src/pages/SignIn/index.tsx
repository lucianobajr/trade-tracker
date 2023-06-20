import React from "react";
import { Form,Presentation } from "./containers";

const SignIn: React.FC = () => {
 
  return (
    <div className="h-screen w-screen flex">
      <Presentation />
      <Form />
    </div>
  );
};

export default SignIn;
