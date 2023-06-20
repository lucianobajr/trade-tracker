import React from "react";
import { motion } from "framer-motion";
import { LogoWhite } from "../../../../assets";
import { presentation } from "../../../../constants/auth.constants";

const Presentation: React.FC = () => {
  return (
    <div className="hidden md:flex flex-col items-center justify-center w-1/2 h-full bg-cyan-700 overflow-x-hidden overflow-y-hidden">
      <motion.div
        className="w-full h-1/2 lg:h-3/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      ></motion.div>
      <motion.div
        className="w-full h-1/2 lg:h-2/5 bg-gray-900 py-9 px-6 y-3"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.img
          src={LogoWhite}
          alt="logo trade tracker white"
          className="w-44"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        />
        <motion.p
          className="font-poppins text-white font-medium text-3xl mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          {presentation.secondContainer.first}
        </motion.p>
        <motion.p
          className="font-poppins text-white font-light text-base mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          {presentation.secondContainer.second}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Presentation;