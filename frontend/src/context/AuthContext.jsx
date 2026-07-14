import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, getCurrentUser } from "../services/auth.service";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function checkAuth() {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const response = await getCurrentUser();

      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    checkAuth();
  }, []);

  const login = async function login(data) {
    try {
      console.log("Login data:", data);
      const response = await loginUser(data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      return await checkAuth();
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setLoading(false);
  };
const updateUser = (updatedUser) => {
  setUser(updatedUser);
};
  return (
    <AuthContext.Provider
  value={{
    user,
    loading,
    isAuthenticated: !!user,

    login,
    logout,
    refreshUser: checkAuth,
    updateUser,
  }}
>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
