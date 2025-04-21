import { Link } from "react-router-dom";
import { rightIcon } from "../assets";

const Categories = () => {
  return (
    <div className="w-full py-5 pe-3 md:pe-0 md:py-5 flex flex-col justify-center items-center ">
      <span className="text-2xl mb-5 font-bold md:hidden"> Categories</span>
      {/* Categories Section */}
      <div className="grid grid-cols-4  text-gray-600 w-full gap-4">
        {[
          {
            link: "/major/civil",
            label: "Civil",
            color: "bg-gradient-to-r from-violet-200 to-pink-200",
          },
          {
            link: "/major/ep",
            label: "EP",
            color: "bg-gradient-to-r from-blue-200 to-cyan-200",
          },
          {
            link: "/major/ec",
            label: "EC",
            color: "bg-gradient-to-r from-amber-200 to-yellow-500 to-pink-400",
          },
          {
            link: "/major/mech",
            label: "Mech",
            color: "bg-gradient-to-r from-teal-200 to-teal-500",
          },
        ].map((category, index) => (
          <Link key={index} to={category.link}>
            <div
              className={`  h-full w-full   px-2 py-3  ${category.color} rounded-xl shadow-lg transform hover:scale-95 transition-all duration-300`}
            >
              <div className="text-sm md:text-lg font-bold mb-5">
                {category.label}
              </div>
              <div className=" flex justify-end items-center">
                <div className="text-xs">more</div>
                <img
                  src={rightIcon}
                  alt={category.label}
                  className="w-4 lg:w-7"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
