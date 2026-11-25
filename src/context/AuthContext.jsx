import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const VALID_EMAIL = "user@mail.com";
const VALID_PASSWORD = "123";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("challenge06_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    if (cleanEmail === VALID_EMAIL && password === VALID_PASSWORD) {
      const userData = {
        email: cleanEmail,
        username: "user",
      };
      setUser(userData);
      localStorage.setItem("challenge06_user", JSON.stringify(userData));
      return { ok: true };
    }

    return {
      ok: false,
      message: "Credenciales inválidas. Usa user@mail.com y contraseña 123.",
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("challenge06_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}