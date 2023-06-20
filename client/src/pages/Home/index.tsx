import React from "react";

import { useAuth } from "../../contexts/AuthContext";


const Home: React.FC = () => {
  const { signOut } = useAuth();

  return <div>
    <h1 className="text-black-secondary">Home</h1>
    <button
      className="min-w-full py-3 bg-cyan-600 hover:bg-cyan-700 rounded-2xl font-poppins font-medium text-white transition-colors duration-300"
      type="submit"
      onClick={signOut}
    >
      sair
    </button>
  </div>;
};

export default Home;
