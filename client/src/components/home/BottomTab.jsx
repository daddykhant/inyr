import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const BottomTab = () => {
  const { auth } = useAuth();
  return (
    <div className="max-w-2xl mx-auto rounded-full fixed bottom-4 left-0 right-0 bg-blue-200 text-black font-bold flex justify-around p-4">
      {auth.role === "admin" ? (
        <>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-primary rounded-full md:rounded-none border-b-2"
                : "border-none"
            }
            to="/dashboard"
          >
            Dashboard
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-primary rounded-full md:rounded-none border-b-2"
                : "border-none"
            }
            to="/upload"
          >
            Upload Book
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-primary rounded-full md:rounded-none border-b-2"
                : "border-none"
            }
            to="/settings"
          >
            Settings
          </NavLink>
        </>
      ) : (
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border-primary rounded-full md:rounded-none border-b-2"
              : "border-none"
          }
          to="/upload"
        >
          Upload Book
        </NavLink>
      )}
    </div>
  );
};

export default BottomTab;
