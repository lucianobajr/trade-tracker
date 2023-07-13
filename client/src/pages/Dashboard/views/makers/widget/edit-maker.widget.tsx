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

interface EditMakerWidgetProps {
    id: string;
    isOpen: boolean;
    closeModal: () => void;
}

// interfaces and types
interface FormData {
    site?: string;
    name?: string;
}

const EditMakerWidget: React.FC<EditMakerWidgetProps> = ({ id, isOpen, closeModal }) => {
    const formRef = useRef<FormHandles>(null);

    const [loading, setLoading] = useState(false);

    const history = useNavigate()

    const handleSubmit = useCallback(async (data: FormData) => {
        setLoading(true);
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().optional().nullable(),
                site: Yup.string().optional().nullable(),
            });

            await schema.validate(data, { abortEarly: false });

            const finalData = {
                name: data.name ? data.name : undefined,
                site: data.site ? data.site : undefined
            }

            await api.put(`/makers/${id}`, finalData)
           
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
    }, [closeModal,history,id]);

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
                                    Editar de Fabricante
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        editar dados de fabricante.
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
                                            label="Website"
                                            name="site"
                                            type="text"
                                            placeholder="https://www.jhondoe.com.br"
                                        />
                                        <button
                                            className="min-w-full py-3 bg-cyan-600 hover:bg-cyan-700 rounded-2xl font-poppins font-medium text-white transition-colors duration-300"
                                            type="submit"
                                            disabled={loading}
                                            style={{ cursor: loading ? "not-allowed" : "pointer" }}
                                        >
                                            {loading ? "Carregando..." : "Editar"}
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

export default EditMakerWidget;