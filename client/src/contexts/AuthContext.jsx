import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/services";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: null, role: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to log in
  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        username,
        password,
      }); // Adjust the endpoint if necessary
      const { token, role } = response.data;

      // Set auth state
      setAuth({ user: username, token, role });

      // Store token and role in localStorage for persistence
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Navigate based on role
      if (role === "editor") {
        navigate("/upload");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      // Handle errors and set error state
      setError(err.response?.data?.error || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  // Function to log out
  const logout = () => {
    setAuth({ user: null, token: null, role: null });
    localStorage.removeItem("token"); // Clear token from localStorage
    localStorage.removeItem("role"); // Clear role from localStorage
  };

  // Function to verify the token
  const verifyToken = async () => {
    if (!auth.token) return false;

    try {
      const response = await axios.get(`${baseUrl}/auth/verify`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      return response.status === 200;
    } catch (err) {
      logout(); // Logout if token is invalid
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ auth, login, logout, verifyToken, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
