import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("himsama_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const register = ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem("himsama_users") || "[]");
    const exists = users.find((u) => u.email === email);
    if (exists) return { error: "An account with this email already exists." };

    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem("himsama_users", JSON.stringify(users));

    const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(sessionUser);
    localStorage.setItem("himsama_user", JSON.stringify(sessionUser));
    return { success: true };
  };

  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem("himsama_users") || "[]");
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { error: "Invalid email or password." };

    const sessionUser = { id: found.id, name: found.name, email: found.email };
    setUser(sessionUser);
    localStorage.setItem("himsama_user", JSON.stringify(sessionUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("himsama_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
