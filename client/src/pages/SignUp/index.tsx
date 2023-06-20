import React, { useCallback, useRef } from "react";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import getValidationErrors from "../../utils/get-validation-errors";

import * as Yup from "yup";
import {Input} from "../../components";
import { Link } from "react-router-dom";

// interfaces and types
interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório"),
        email: Yup.string()
          .required("Email obrigatório")
          .email("Informe um email válido"),
        password: Yup.string().required("Password obrigatório"),
      });

      await schema.validate(data, { abortEarly: false });

      console.log(data);
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
      <div className="px-6 py-8 bg-white rounded-xl inline-flex flex-col items-center justify-start">
        <p className="text-3xl font-medium text-zinc-900">Se cadastre agora!</p>
        <div className="py-4 bg-white flex flex-col gap-y-8 items-center justify-start">
          <Form className="flex flex-col gap-y-6" ref={formRef} onSubmit={handleSubmit}>
            <Input
              label="Nome"
              name="name"
              type="text"
              placeholder="John Doe"
            />
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
              className="min-w-full py-3 bg-cyan-600 hover:bg-cyan-700 rounded-2xl font-poppins font-medium text-white transition-colors duration-300"
              type="submit"
            >
              entrar
            </button>
          </Form>

          <p className="font-poppins text-base font-medium leading-tight">
            já tem uma conta?
            <Link
              to="/"
              className="text-cyan-600 hover:text-cyan-700 transition-colors duration-300"
            >
              {" "}
              entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;