import React, { useCallback, useRef, useState } from "react";

import { motion } from "framer-motion";
import { Form as FormComponent } from "@unform/web";
import { FormHandles } from "@unform/core";

import getValidationErrors from "../../../../utils/get-validation-errors";

import * as Yup from "yup";
import Input from "../../../../components/input";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../../services/api";

import { DialogComponent } from "../../../../components";


// interfaces and types
interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const Form: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    setLoading(true)
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

      await api.post("/admins", data);

      setOpen(true);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const erros = getValidationErrors(error);

        formRef.current?.setErrors(erros);

        return;
      } else {
        alert("Algo deu errado! Teste novamente");
      }
    }
    finally { setLoading(false) }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const handleCloseModal = () => {
    setOpen(false);
    navigate("/")
  }

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
        <p className="text-3xl font-medium text-zinc-900">Se cadastre agora!</p>
        <div className="py-4 bg-white flex flex-col gap-y-9 items-center justify-start">
          <FormComponent
            className="flex flex-col gap-y-6"
            ref={formRef}
            onSubmit={handleSubmit}
          >
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
              disabled={loading}
              style={{ cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? "Carregando..." : "Cadastrar"}
            </button>
          </FormComponent>

          <p className="font-poppins text-base font-medium leading-tight">
            já tem uma conta?
            <Link
              className="text-cyan-600 hover:text-cyan-700 transition-colors duration-300"
              to={"/"}
            >
              {" "}
              entrar
            </Link>
          </p>
        </div>
      </motion.div>
      <DialogComponent isOpen={open} closeModal={handleCloseModal} title="Sucesso" subtitle="Você foi cadastrado com sucesso na plataforma =)" button="começar!" />
    </motion.div>
  );
};

export default Form;