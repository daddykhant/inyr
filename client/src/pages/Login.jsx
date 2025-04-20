import { useState } from "react";

import { useAuth } from "../hooks/useAuth";
import AuthContext from "../contexts/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error } = useAuth(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 min-h-screen bg-slate-200 font-poppin">
      <div className="bg-white p-12 rounded-lg  container flex flex-col justify-between ">
        <div className="  flex gap-3 items-center">
          <div className=" w-3 h-3 rounded-full bg-black"></div>
          <div className=" text-lg font-semibold">ArtPrompt</div>
        </div>

        <form onSubmit={handleSubmit} className=" px-3 md:px-12 lg:px-20 ">
          <h2 className="text-2xl font-bold mb-6">Welcome Admin !</h2>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 mb-3">Email</label>
            <div className="flex items-center border rounded-lg p-2 bg-gray-50">
              <input
                type="text"
                className="ml-2 w-full bg-transparent focus:outline-none"
                placeholder="Enter your email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-3">Password</label>
            <div className="flex items-center border rounded-lg p-2 bg-gray-50">
              <input
                type="password"
                className="ml-2 w-full bg-transparent focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className=" text-sm"> @2025 ArtPrompt</div>
      </div>
      <div className=" relative w-full h-full hidden md:flex">
        <div className="flex items-center justify-center w-full h-full">
          <div className="  w-52 h-52 bg-gray-800 rounded-full m-auto"></div>
        </div>
        <div className=" absolute bottom-0 bg-white/30 backdrop-blur-lg flex-1 w-full h-[50%]"></div>
      </div>
    </div>
  );
};

export default Login;
