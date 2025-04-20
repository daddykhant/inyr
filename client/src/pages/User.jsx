import { useContext, useEffect, useState } from "react";
import { FaTrashCan, FaUserPlus, FaXmark } from "react-icons/fa6";
import { baseUrl } from "../utils/services";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import Unauthorized from "../components/home/Unauthorized";

const User = () => {
  const [isOpenAdd, setIsAddOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth, users, getUsers, authAlert, setAuthAlert, handleDeleteUser } =
    useContext(AuthContext);
  useEffect(() => {
    getUsers();
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!username || !password) {
      setError("Please provide both username and password.");
      setLoading(false);
      return;
    }

    if (auth.role === "admin") {
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
        setMessage(response.data.message);

        setUsername("");
        setPassword("");
        setRole("");
      } catch (err) {
        setError(err.response?.data?.error || "Failed to create user");
      } finally {
        setLoading(false);
      }
    } else {
      setAuthAlert(true);
      setIsAddOpen(false);
    }
  };

  return (
    <div className="w-full  ">
      <div className=" flex items-center gap-5">
        <h1 className=" font-semibold text-2xl my-8">INYR.Com </h1>
        <p className=" text-sm text-gray-500">
          developed by{" "}
          <a
            href="https://kthz.vercel.app"
            target="_blank"
            className=" text-blue-500 underline-offset-1 underline "
          >
            Khant Thiha Zaw
          </a>
        </p>
      </div>
      <div className="border-2 rounded-xl">
        <div className="border-b-2 p-5 flex justify-between items-center">
          <div className="font-semibold text-lg">Create Users and Roles</div>
          <div
            className="bg-black py-2 px-3 rounded-xl flex items-center gap-3 cursor-pointer"
            onClick={() => setIsAddOpen(!isOpenAdd)}
          >
            <FaUserPlus style={{ color: "#ffffff" }} />
            <div className="text-white">Add</div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 border-b-2 text-left">
                <th className="px-5 py-3">Username</th>

                <th className="px-5 py-3">Role</th>
                {auth.role === "admin" && (
                  <th className="px-5 py-3 text-center">Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-b text-left">
                  <td className="px-5 py-3">{user.username}</td>

                  <td className="px-5 py-3">{user.role}</td>

                  {auth.role === "admin" && (
                    <td className="px-5 py-3 text-center">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-red-600 p-2 rounded-lg"
                      >
                        <FaTrashCan style={{ color: "#ffffff" }} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sidebar for Adding User */}
        {isOpenAdd && (
          <div className="absolute top-0 right-0 w-[50vw] shadow-lg bg-white  h-full z-10 text-black px-10">
            <div className="flex justify-between items-center py-5">
              <div className="font-semibold text-xl">Add User</div>
              <div
                className="cursor-pointer"
                onClick={() => setIsAddOpen(!isOpenAdd)}
              >
                <FaXmark size={24} />
              </div>
            </div>

            <form className="w-full py-5" onSubmit={handleSubmit}>
              {error && <div className="text-red-500 ">{error}</div>}
              <div className="mt-3">
                <label className="block font-semibold">Username</label>
                <input
                  type="text"
                  className="w-full bg-slate-200 rounded-lg py-2 px-5 mt-2"
                  placeholder="Enter username"
                  required
                  autoComplete="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <label className="block font-semibold">Role</label>
                <select
                  className="w-full bg-blue-100 rounded-lg py-2 px-5 mt-2"
                  name="role"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select role ...</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                </select>
              </div>

              <div className="mt-5">
                <label className="block font-semibold">Password</label>
                <input
                  type="password"
                  className="w-full bg-slate-200 rounded-lg py-2 px-5 mt-2"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="py-2 px-5 bg-black text-white block rounded-lg mt-5"
              >
                {loading ? "Creating..." : "Create"}
              </button>
              {message && <div className=" text-green-500">{message}</div>}
            </form>

            {/* Authorization Alert */}
            <div className="bg-zinc-200 rounded-xl p-5 mt-5">
              <div className="flex items-center">
                <span className="px-2 rounded-full bg-black text-white text-sm mr-1">
                  !
                </span>
                <span className="text-lg font-semibold">
                  Authorization Alert
                </span>
              </div>
              <div className="mt-3">
                <p className="text-sm">
                  <strong>Admin:</strong> Full access to Create, Read, Update,
                  and Delete data.
                </p>
                <p className="text-sm mt-2">
                  <strong>Editor:</strong> Can only Write and Read data.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {authAlert && (
        <div className=" absolute top-0 w-full h-full bg-white backdrop-blur-md bg-opacity-25 flex justify-center items-center">
          <Unauthorized error={401} />
        </div>
      )}
    </div>
  );
};

export default User;
