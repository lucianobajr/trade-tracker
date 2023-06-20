import React from "react";

import { LogoWhite } from "../../../../assets";
import { presentation } from "../../../../constants/auth.constants";

const Presentation: React.FC = () => {
  return (
    <div className="hidden md:flex flex-col items-center justify-center w-1/2 h-full  bg-cyan-700">
      <div className="w-full h-1/2"></div>
      <div className="w-full h-1/2 bg-gray-900 py-9 px-6 y-3">
        <img src={LogoWhite} alt="logo trade tracker white" className="w-44" />
        <p className="font-poppins text-white font-medium text-3xl mt-3">{presentation.secondContainer.first}</p>
        <p className="font-poppins text-white font-light text-base mt-3">{presentation.secondContainer.second}</p>
      </div>
    </div>
  );
};

export default Presentation;
