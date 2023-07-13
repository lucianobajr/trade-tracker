import React, { useCallback, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FormHandles } from '@unform/core';

import { Form as FormComponent } from "@unform/web";

import { motion } from "framer-motion";

import * as Yup from "yup";
import getValidationErrors from '../../../../../utils/get-validation-errors';
import { Input } from '../../../../../components';
import { api } from '../../../../../services/api';
import { useNavigate } from 'react-router-dom';

interface CreateClientWidgetProps {
    isOpen: boolean;
    closeModal: () => void;
}

// interfaces and types
interface FormData {
    name: string;
    adress: string;
    phone: string;
    cityId: string;
}

const CreateClientWidget: React.FC<CreateClientWidgetProps> = ({ isOpen, closeModal }) => {
    const formRef = useRef<FormHandles>(null);

    const [loading, setLoading] = useState(false);

    const history = useNavigate()

    const handleSubmit = useCallback(async (data: FormData) => {
        setLoading(true);
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required("Nome obrigatório"),
                adress: Yup.string().required("Endereço obrigatório"),
                phone: Yup.string().required("Telefone obrigatório"),
                cityId: Yup.string().required("Cidade obrigatório"),
            });

            await schema.validate(data, { abortEarly: false });

            console.log(data)

            await api.post('/clients', data)

            history(0);

            closeModal();
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
    }, [closeModal, history]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Cadastro de Cliente
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Tela de Cadastro de Clientes: Registre e mantenha atualizadas as informações dos seus clientes, possibilitando um atendimento personalizado e a criação de estratégias de fidelização eficientes.
                                    </p>
                                </div>

                                <motion.div
                                    className="mt-4"
                                    variants={containerVariants}
                                    transition={{ duration: 0.5 }}
                                >
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
                                            label="Endereço"
                                            name="adress"
                                            type="text"
                                            placeholder="Rua ...."
                                        />
                                        <Input
                                            label="Telefone"
                                            name="phone"
                                            type="text"
                                            placeholder="+55 31 9xxxx-xxxx"
                                        />


                                        <Input
                                            label="Cidade"
                                            name="cityId"
                                            type="text"
                                            placeholder="xxxxxxxx"
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
                                </motion.div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default CreateClientWidget;