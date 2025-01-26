// filepath: /d:/web portfolios/MechCorner/client/src/App.jsx
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/home/Sidebar";
import UploadBookPage from "./pages/UploadBookPage";
import { GetBooksContextProvider } from "./contexts/GetBook";
import BookDetails from "./pages/BookDetails";
import Feedback from "./pages/Feedback";
import MajorDetails from "./pages/MajorDetails";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import BottomTab from "./components/home/BottomTab";
import AdminLayout from "./pages/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import AdminHeader from "./components/home/AdminHeader";
import Setting from "./pages/Setting";
import Categories from "./pages/Categories";

function App() {
  return (
    <GetBooksContextProvider>
      <AuthProvider>
        <div className="font-display flex w-full bg-white text-black">
          <Sidebar />
          <Routes>
            {/* Redirect default route to textbook */}
            <Route path="/" element={<Navigate to="/books/textbook" />} />
            <Route path="/category" element={<Categories />} />
            {/* Dynamic routes */}
            <Route path="/books/:bookType" element={<Home />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/major/:major" element={<MajorDetails />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/upload"
              element={
                <PrivateRoute>
                  <AdminLayout>
                    <AdminHeader />
                    <UploadBookPage />
                    <BottomTab />
                  </AdminLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <AdminLayout>
                    <AdminHeader />
                    <Dashboard />
                    <BottomTab />
                  </AdminLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <AdminLayout>
                    <AdminHeader />
                    <Setting />
                    <BottomTab />
                  </AdminLayout>
                </PrivateRoute>
              }
            />
            {/* Redirect unauthorized users */}
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </div>
      </AuthProvider>
    </GetBooksContextProvider>
  );
}

export default App;
