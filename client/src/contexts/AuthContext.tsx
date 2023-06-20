import React, { createContext, useState, useContext, useCallback } from "react";
import { api } from "../services/api";

interface Admin {
  id: string;
  name: string;
  email: string;
}


interface AuthState {
  token: string;
  admin: Admin;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  admin: Admin;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type Props = {
  children?: React.ReactNode;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@trade-tracker:token");
    const admin = localStorage.getItem("@trade-tracker:admin");

    if (token && admin) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return {
        token,
        admin: JSON.parse(admin),
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post("/admins/auth/login", { email, password });
    const { token, admin } = response.data;

    console.log(response.data)

    localStorage.setItem("@trade-tracker:token", token);
    localStorage.setItem("@trade-tracker:admin", JSON.stringify(admin));

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setData({ token, admin });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@trade-tracker:token");
    localStorage.removeItem("@trade-tracker:admin");

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ admin: data.admin, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used ithin a AuthProvideru");
  }

  return context;
}

// eslint-disable-next-line import/no-anonymous-default-export
export { AuthProvider, useAuth };