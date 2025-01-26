import { useContext } from "react";
import { menuIcon } from "../../assets";
import { GetBooksContext } from "../../contexts/GetBook";

const Navbar = () => {
  const { handleMenuClick } = useContext(GetBooksContext);
  return (
    <div className="flex px-5 md:px-10 py-3 justify-between items-center">
      <div className="font-bold text-xl md:text-3xl ">M E C H</div>
      <select name="" id="" className="flex items-center gap-2 ">
        <option value="textbook" className=" hover:bg-blue">
          Text Books
        </option>
        <option value="thesis" className=" hover:bg-blue">
          Thesis
        </option>
        <option value="other" className=" hover:bg-blue">
          Other
        </option>
      </select>

      <div className="flex items-center gap-5">
        <div className=" cursor-pointer w-5 md:w-8" onClick={handleMenuClick}>
          <img src={menuIcon} alt="" />
        </div>
      </div>
      <div className="hidden">
        <img src={menuIcon} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
