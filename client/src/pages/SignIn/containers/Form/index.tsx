import React, { useCallback, useRef } from "react";

// context
import { useAuth } from "../../../../contexts/AuthContext";

import { motion } from "framer-motion";
import { Form as FormComponent } from "@unform/web";
import { FormHandles } from "@unform/core";

import getValidationErrors from "../../../../utils/get-validation-errors";

import * as Yup from "yup";
import Input from "../../../../components/input";
import { Link } from "react-router-dom";

// interfaces and types
interface SignInFormData {
  email: string;
  password: string;
}

const Form: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();

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

      await signIn({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const erros = getValidationErrors(error);

        formRef.current?.setErrors(erros);

        return;
      } else {
        alert("Algo deu errado! Teste novamente");
      }
    }
  }, [signIn]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="h-screen w-full md:w-1/2 bg-gray-100 flex items-center justify-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="p-8 bg-white rounded-xl inline-flex flex-col gap-y-12 items-center justify-start"
        variants={formVariants}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-3xl font-medium text-zinc-900">Faça login</p>
        <div className="py-4 bg-white flex flex-col gap-y-9 items-center justify-start">
          <FormComponent
            className="flex flex-col gap-y-6"
            ref={formRef}
            onSubmit={handleSubmit}
          >
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
          </FormComponent>

          <p className="font-poppins text-base font-medium leading-tight">
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
      </motion.div>
    </motion.div>
  );
};

export default Form;