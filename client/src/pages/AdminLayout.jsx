// filepath: /d:/web portfolios/MechCorner/client/src/components/layouts/AdminLayout.jsx

import BottomTab from "../components/home/BottomTab";

const AdminLayout = ({ children }) => {
  return (
    <div className="m-auto ">
      {children}
      <BottomTab />
    </div>
  );
};

export default AdminLayout;
