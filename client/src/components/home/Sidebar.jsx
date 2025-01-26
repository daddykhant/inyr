import { Link, NavLink } from "react-router-dom";
import { category, helpIcon, homeIcon, logo } from "../../assets";

const Sidebar = () => {
  return (
    <div className=" flex justify-center px-1 py-5 md:p-5 h-[100vh] relative">
      <div className="flex flex-col gap-2">
        <Link to="/">
          <div className=" w-full bg-blue-200 rounded-xl p-5 hidden md:flex flex-col justify-center cursor-pointer mb-5">
            <div className=" w-10 h-10 shadow-lg mb-4 ">
              <img
                src={logo}
                alt=""
                className={`bg-primary w-full h-full p-1 rounded-lg object-cover `}
              />
            </div>
            <p className=" text-xs">
              Welcome <br /> from
            </p>
            <div className=" font-bold text-2xl text-stone-800">INYR</div>
          </div>
          <div className=" items-center justify-center gap-4 cursor-pointer mb-5 flex md:hidden">
            <div className=" w-7 h-7 md:w-10 md:h-10 shadow-lg ">
              <img
                src={logo}
                alt=""
                className={`bg-primary w-full h-full p-1 rounded-lg object-cover `}
              />
            </div>
          </div>
        </Link>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? " border-primary  rounded-full shadow md:rounded-none md:border-b-2 "
              : " border-none"
          }
          to="/books/textbook"
        >
          <div className="flex items-center  gap-2 w-full cursor-pointer  px-3">
            <div className=" w-9 h-9 md:w-10 md:h-10 ">
              <img
                src={homeIcon}
                alt=""
                className={` w-full h-full p-2 rounded-lg object-cover `}
              />
            </div>
            <div className="  text-stone-800 hidden md:flex">Home</div>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? " border-primary  rounded-full shadow-md md:rounded-none md:border-b-2 md:hidden "
              : " border-none md:hidden"
          }
          to="/category"
        >
          <div className="flex items-center  gap-2 w-full cursor-pointer  px-3">
            <div className=" w-9 h-9 md:w-10 md:h-10 ">
              <img
                src={category}
                alt=""
                className={` w-full h-full p-2 rounded-lg object-cover `}
              />
            </div>
            <div className="  text-stone-800 hidden md:flex">Category</div>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? " border-primary  rounded-full shadow-md md:rounded-none md:border-b-2 "
              : " border-none"
          }
          to="/feedback"
        >
          <div className="flex items-center  gap-2 w-full cursor-pointer  px-3">
            <div className=" w-9 h-9 md:w-10 md:h-10 ">
              <img
                src={helpIcon}
                alt=""
                className={` w-full h-full p-2 rounded-lg object-cover `}
              />
            </div>
            <div className="  text-stone-800 hidden md:flex">Feedback</div>
          </div>
        </NavLink>
      </div>

      <a
        href="#"
        className=" text-xs hidden md:flex flex-col items-center justify-center bottom-5 absolute "
      >
        <div className="">Product of </div>
        <div className=" font-bold text-lg"> K T H Z</div>
      </a>
    </div>
  );
};

export default Sidebar;
