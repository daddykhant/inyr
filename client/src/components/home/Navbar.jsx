import { FaArrowRightFromBracket, FaXmark } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className=" p-5 flex justify-between md:justify-normal items-center gap-8 border-2 rounded-b-xl  bg-white/30 backdrop-blur-lg border-zinc-200">
      <div className=" text-xl font-semibold">ArtPrompt</div>
      <div className="flex justify-between items-center gap-5 w-full">
        <div className="  items-center gap-8 flex">
          <NavLink
            className={({ isActive }) =>
              `transition ${
                isActive
                  ? "border-b-2 border-black"
                  : "hover:border-b-2 border-pink-600"
              }`
            }
            to="/dashboard/control-panel"
          >
            Dashboard
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `transition ${
                isActive
                  ? "border-b-2 border-black"
                  : "hover:border-b-2 border-pink-600"
              }`
            }
            to="/dashboard/users"
          >
            Members
          </NavLink>
        </div>
        <Link to="/" className="">
          <FaArrowRightFromBracket />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
