// filepath: /d:/web portfolios/MechCorner/client/src/App.jsx
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/home/Sidebar";

import { GetBooksContextProvider } from "./contexts/GetBook";
import BookDetails from "./pages/BookDetails";
import Feedback from "./pages/Feedback";
import MajorDetails from "./pages/MajorDetails";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";

import Dashboard from "./pages/Dashboard";
import User from "./pages/User";

import Categories from "./pages/Categories";
import NavBar from "./components/home/Navbar";

function App() {
  return (
    <GetBooksContextProvider>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<ClientLayout />} />
          <Route path="/dashboard/*" element={<DashboardLayout />} />
          {/* Redirect unauthorized users */}
        </Routes>
      </AuthProvider>
    </GetBooksContextProvider>
  );
}
function ClientLayout() {
  return (
    <div className="font-display flex w-full bg-white text-black">
      <Sidebar />

      <main className="p-4">
        <Routes>
          {/* Redirect default route to textbook */}
          <Route path="/" element={<Navigate to="/books/textbook" />} />
          <Route path="/category" element={<Categories />} />
          {/* Dynamic routes */}
          <Route path="/books/:bookType" element={<Home />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/major/:major" element={<MajorDetails />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </main>
    </div>
  );
}
function DashboardLayout() {
  return (
    <div className="relative min-h-screen px-2 md:px-5 lg:px-10 bg-zinc-100 ">
      <NavBar />

      <main className="p-4">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="control-panel" element={<Dashboard />} />

          <Route path="users" element={<User />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
