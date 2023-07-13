import React from "react";

import Dropdown from "../../../../../components/dropdown";

import { BsThreeDots } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import CreateMakerWidget from "../widget/create-client.widget";

interface CardMenuProps {
    transparent?: boolean;
    isOpen: boolean;
    closeModal: () => void;
    openModal: () => void;
}

function CardMenu(props: CardMenuProps) {

    const { transparent, isOpen, closeModal,openModal } = props;

    const [open, setOpen] = React.useState(false);

    return (
        <>
            <Dropdown
                button={
                    <button
                        onClick={() => setOpen(!open)}
                        className={`flex items-center text-xl hover:cursor-pointer ${transparent
                            ? "bg-none text-white hover:bg-none active:bg-none"
                            : "bg-cyan-200 text-cyan-700 p-2 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
                            } linear justify-center rounded-lg font-bold transition duration-200`}
                    >
                        <BsThreeDots className="h-6 w-6" />
                    </button>
                }
                animation={"origin-top-right transition-all duration-300 ease-in-out"}
                classNames={`${transparent ? "top-8" : "top-11"} right-0 w-max`}
                children={
                    <button className="z-50 w-max rounded-xl bg-white py-3 px-4 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none" onClick={openModal}>
                        <p className="flex cursor-pointer items-center gap-2 text-cyan-600 hover:text-cyan-700 hover:font-medium">
                            <span >
                                <FiPlus />
                            </span>
                            Create
                        </p>
                    </button>
                }
            />
            <CreateMakerWidget isOpen={isOpen} closeModal={closeModal} />
        </>
    );
}

export default CardMenu;