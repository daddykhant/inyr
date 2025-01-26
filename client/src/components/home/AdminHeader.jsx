import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

const AdminHeader = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className=" flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="">
        <span>Welcome, {auth.role}!</span>
      </div>

      <div className="">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;
