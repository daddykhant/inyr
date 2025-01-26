import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/services";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [creating, setCreating] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/auth/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
          },
        });
        setUsers(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${baseUrl}/auth/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
        },
      });

      alert(response.data.message);
      setUsers(users.filter((user) => user._id !== userId)); // Update state after successful deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(
        error.response?.data?.error ||
          "An error occurred while deleting the user."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError("");

    if (!username || !password) {
      setError("Please provide both username and password.");
      setCreating(false);
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/auth/register`,
        { username, password, role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
          },
        }
      );
      alert(response.data.message);
      setUsers([...users, response.data.user]); // Assuming the response contains the created user
      setUsername("");
      setPassword("");
      setRole("");
      setOpenForm(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create user");
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }
  const handleAddAcc = () => {
    setOpenForm(!openForm);
  };

  return (
    <div className="p-6 lg:w-[80vw] mx-auto bg-gray-50 ">
      {/* Create a new user */}
      {openForm ? (
        <div className=" mt-8">
          <div className="text-3xl font-semibold mb-5 text-center">
            Create New User
          </div>
          {error && <div className="text-red-500 ">{error}</div>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Username"
              className="bg-orange-50 rounded-xl border-2 p-3 "
              required
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <select
              name="semester"
              value={role}
              className="rounded-xl py-2 px-5 border "
              onChange={(e) => setRole(e.target.value)}
              aria-label="Select semester"
            >
              <option value="">Select role ...</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              className="bg-orange-50 rounded-xl border-2 p-3 "
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="bg-gradient-to-b from-primary to-secondary rounded-xl p-3 text-white"
              disabled={creating}
            >
              {creating ? "Creating..." : "Create User"}
            </button>
            <div
              className=" text-center bg-slate-200 rounded-xl p-3"
              onClick={() => setOpenForm(false)}
            >
              Back
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold text-center mb-6">
            Admin Dashboard
          </h1>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold mb-4">All Accounts</h2>
            <div
              className="  p-2 bg-primary rounded-xl text-white font-semibold mb-4 cursor-pointer"
              onClick={handleAddAcc}
            >
              + Add
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-4 text-left">Username</th>
                  <th className="py-3 px-4 text-left">Role</th>

                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-light">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-4 text-left">{user.username}</td>
                    <td className="py-3 px-4 text-left">{user.role}</td>

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
