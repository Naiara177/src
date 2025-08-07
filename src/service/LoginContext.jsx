import { createContext, useState } from "react";

export const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(email, password) {
    // simulação simples de login
    if (email === "admin@email.com" && password === "1234") {
      setUser({ email });
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
  }

  return (
    <LoginContext.Provider value={{ user, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
}
