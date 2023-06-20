import React from 'react';

const Main: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
      <div className="p-8 bg-white rounded-xl inline-flex flex-col gap-y-12 items-center justify-start">
        <p className="text-3xl font-medium text-zinc-900">Faça Login na sua Conta</p>
        <div className="py-4 bg-white flex flex-col gap-y-9 items-center justify-start">
          <div className="space-y-6">

          </div>
          <button className=" min-w-full py-3 bg-cyan-600 hover:bg-cyan-700 rounded-2xl font-poppins font-medium text-white transition-colors duration-300">entrar</button>
          <p className="font-poppins text-xl font-medium leading-tight ">
            não tem uma conta? <a href="http://" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:text-cyan-700 transition-colors duration-300">registre-se</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;