import React, { useCallback, useRef } from "react";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import getValidationErrors from "../../utils/get-validation-errors";

import * as Yup from "yup";
import Input from "../../components/input";
import { Link } from "react-router-dom";

// interfaces and types
interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required("Email obrigatório")
          .email("Informe um email válido"),
        password: Yup.string().required("Password obrigatório"),
      });

      await schema.validate(data, { abortEarly: false });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const erros = getValidationErrors(error);

        formRef.current?.setErrors(erros);

        return;
      } else {
        alert("Algo deu errado! Teste novamente");
      }
    }
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
      <div className="p-8 bg-white rounded-xl inline-flex flex-col gap-y-12 items-center justify-start">
        <p className="text-3xl font-medium text-zinc-900">Faça login</p>
        <div className="py-4 bg-white flex flex-col gap-y-9 items-center justify-start">
          <Form className="flex flex-col gap-y-6" ref={formRef} onSubmit={handleSubmit}>
            <Input
              label="E-mail"
              name="email"
              type="text"
              placeholder="johndoe@gmail.com"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="************"
            />
            <button
              className=" min-w-full py-3 bg-cyan-600 hover:bg-cyan-700 rounded-2xl font-poppins font-medium text-white transition-colors duration-300"
              type="submit"
            >
              entrar
            </button>
          </Form>

          <p className="font-poppins text-base font-medium leading-tight ">
            não tem uma conta?
            <Link
              className="text-cyan-600 hover:text-cyan-700 transition-colors duration-300"
              to={"/sign-up"}
            >
              {" "}
              registre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
