import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/services";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: null, role: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [authAlert, setAuthAlert] = useState(false);
  const navigate = useNavigate();

  // Function to log in
  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        username,
        password,
      });
      const { token, role } = response.data;

      // Set auth state
      setAuth({ user: username, token, role });

      // Store token and role in localStorage for persistence
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Navigate

      navigate("/dashboard/control-panel");
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
      console.log(err);
      return false;
    }
  };
  //handle delete user
  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    if (auth.role == "admin") {
      try {
        const response = await axios.delete(
          `${baseUrl}/auth/delete/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
            },
          }
        );

        alert(response.data.message);
        setUsers(users.filter((user) => user._id !== userId)); // Update state after successful deletion
      } catch (error) {
        console.error("Error deleting user:", error);
        alert(
          error.response?.data?.error ||
            "An error occurred while deleting the user."
        );
      }
    } else {
      setAuthAlert(true);
    }
  };
  //Get Users

  const getUsers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/auth/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
        },
      });
      setUsers(response.data);
      console.log(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch users");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
        verifyToken,
        loading,
        error,
        users,
        getUsers,
        handleDeleteUser,
        authAlert,
        setAuthAlert,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
