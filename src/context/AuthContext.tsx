import { createContext, useState } from "react";
import Cookies from "js-cookie";

import { Children } from "../types/Children";
import { TOKEN } from "../constants";

interface AuthContextType {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

// export const AuthContext = createContext<AuthContext | null>(null);
export const AuthContext = createContext({} as AuthContextType);

const AuthContextProvider = ({ children }: Children) => {
  const [isLogin, setIsLogin] = useState(Boolean(Cookies.get(TOKEN)));

  const state = {
    isLogin,
    setIsLogin,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
