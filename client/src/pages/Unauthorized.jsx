import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="unauthorized">
      <h1>Unauthorized Access</h1>
      <p>You do not have permission to view this page.</p>
      <Link to="/upload">Go back to Home</Link>
    </div>
  );
};

export default Unauthorized;
