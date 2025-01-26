import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { login, loading, error } = useAuth(); // Use the login function from AuthContext
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password); // Call the login function
  };

  return (
    <div className="m-auto">
      <div className="px-16">
        <div className="text-3xl font-semibold mb-5 text-center">Login</div>

        {error && <div className="text-red-500 mb-5">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username"
            className="bg-orange-50 rounded-xl border-2 p-3 mb-5"
            required
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-orange-50 rounded-xl border-2 p-3 mb-5"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-b from-primary to-secondary rounded-xl p-3"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
