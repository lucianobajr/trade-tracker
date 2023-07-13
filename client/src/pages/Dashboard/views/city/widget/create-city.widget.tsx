import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FormHandles } from '@unform/core';

import { Form as FormComponent } from "@unform/web";

import { motion } from "framer-motion";

import * as Yup from "yup";
import getValidationErrors from '../../../../../utils/get-validation-errors';
import { Input } from '../../../../../components';
import { brasilApi } from '../../../../../services/brasil-api';
import { api } from '../../../../../services/api';

interface CreateCityWidgetProps {
    isOpen: boolean;
    closeModal: () => void;
}

// interfaces and types
interface CityFormData {
    name: string;
    state: string;
}

interface CepFormData {
    cep: string;
}

interface DataResponse {
    state: string;
    name: string;
}

const CreateCityWidget: React.FC<CreateCityWidgetProps> = ({ isOpen, closeModal }) => {
    const formRef = useRef<FormHandles>(null);
    const formCepRef = useRef<FormHandles>(null);

    const [dataResponse, setDataResponse] = useState<DataResponse>({} as DataResponse);
    const [loading, setLoading] = useState(false);
    const [cep, setCep] = useState(true);

    const handleSubmitCep = useCallback(async (data: CepFormData) => {
        setLoading(true);
        try {
            formCepRef.current?.setErrors({});

            const schema = Yup.object().shape({
                cep: Yup.string().required("CEP obrigatório")
            });

            await schema.validate(data, { abortEarly: false });

            const response = await brasilApi.get(`/cep/v1/${data.cep}`);
            setDataResponse({
                name: response.data.city,
                state: response.data.state,
            });
            setCep(false)
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const erros = getValidationErrors(error);

                formCepRef.current?.setErrors(erros);

                return;
            } else {
                alert("Algo deu errado! Teste novamente");
            }
        }
        finally { setLoading(false) }
    }, []);

    useEffect(() => {
        if (Object.keys(dataResponse).length > 0) {
            formRef.current?.setData({
                name: dataResponse.name,
                state: dataResponse.state
            });
        }
    }, [dataResponse]);

    const handleSubmit = useCallback(async (data: CityFormData) => {
        setLoading(true);
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required("City obrigatório"),
                state: Yup.string().required("State obrigatório"),
            });

            await schema.validate(data, { abortEarly: false });

            await api.post('/cities', data)
            
            setDataResponse({} as DataResponse); 
            setCep(true); 
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
    }, [closeModal]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const handleCloseModal = () => { setDataResponse({} as DataResponse); setCep(true); closeModal(); }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
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
                                    Cadastro de Cidade
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Registre e gerencie informações essenciais sobre as cidades em que seu comércio opera, facilitando o planejamento estratégico e a análise de desempenho.
                                        <br /><br />
                                        Primeiramente informe o CEP da cidade que deseja cadastra, usaremos uma API que facilitará nosso processo de cadastro.
                                    </p>
                                </div>

                                {!!cep ? <motion.div
                                    className="mt-4"
                                    variants={containerVariants}
                                    transition={{ duration: 0.5 }}
                                >
                                    <FormComponent
                                        className="flex flex-col gap-y-6"
                                        ref={formCepRef}
                                        onSubmit={handleSubmitCep}
                                    >
                                        <Input
                                            label="CEP"
                                            name="cep"
                                            type="text"
                                            placeholder="xxxxxxxx"
                                            maxLength={8}
                                        />
                                        <button
                                            className="min-w-full py-3 bg-cyan-600 hover:bg-cyan-700 rounded-2xl font-poppins font-medium text-white transition-colors duration-300"
                                            type="submit"
                                            disabled={loading}
                                            style={{ cursor: loading ? "not-allowed" : "pointer" }}
                                        >
                                            {loading ? "Carregando..." : "Avançar"}
                                        </button>
                                    </FormComponent>
                                </motion.div> : <motion.div
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
                                            label="Cidade"
                                            name="name"
                                            type="text"
                                            placeholder="São Paulo"
                                        />
                                        <Input
                                            label="Estado"
                                            name="state"
                                            type="text"
                                            placeholder="SP"
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
                                </motion.div>}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default CreateCityWidget;