import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface DialogComponentProps {
    title:string;
    subtitle:string;
    button:string;
    isOpen: boolean;
    closeModal: () => void;
}

const DialogComponent: React.FC<DialogComponentProps> = ({ isOpen, closeModal,title,subtitle,button}) => {
    return <Transition appear show={isOpen} as={Fragment}>
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
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-poppins font-medium leading-6 text-gray-900"
                            >
                                {title}
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm font-poppins text-gray-500">
                                   {subtitle}
                                </p>
                            </div>

                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border px-4 py-2 bg-cyan-600 hover:bg-cyan-700 font-poppins font-medium text-white transition-colors duration-300"
                                    onClick={closeModal}
                                >
                                   {button}
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>;
}

export default DialogComponent;