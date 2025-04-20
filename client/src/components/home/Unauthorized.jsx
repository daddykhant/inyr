import { FaArrowLeft } from "react-icons/fa";

import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { useContext } from "react";

const Unauthorized = ({ error, link }) => {
  const { setAuthAlert } = useContext(AuthContext);
  return (
    <div className="text-center">
      {error == "401" && (
        <div className=" ">
          <div className=" font-extrabold text-9xl text-red-600">401</div>
          <h1 className=" font-bold text-2xl mb-5">UNAUTHORIZED ACCESS!</h1>
          <p>You do not have permission to do this...</p>
          <Link
            to="/dashboard/control-panel"
            className=" flex items-center justify-center gap-3 mt-5"
            onClick={() => setAuthAlert(false)}
          >
            <FaArrowLeft />
            <span className=" font-semibold">back to home</span>
          </Link>
        </div>
      )}
      {error == "404" && (
        <div className=" ">
          <div className=" font-extrabold text-9xl text-red-600">404</div>
          <h1 className=" font-bold text-2xl mb-5">NOT FOUND!</h1>
          <p>Oops!There is nothing here...</p>
          <Link
            to={link}
            className=" flex items-center justify-center gap-3 mt-5"
          >
            <FaArrowLeft />
            <span className=" font-semibold">back to home</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Unauthorized;
