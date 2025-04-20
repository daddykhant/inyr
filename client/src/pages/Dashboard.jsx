import { useContext, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { FaTrashCan, FaXmark } from "react-icons/fa6";
import Pagination from "../components/home/Pagination";
import AddBooks from "../components/home/AddBooks";
import AddProjects from "../components/home/AddProjects";
import { GetBooksContext } from "../contexts/GetBook";
import axios from "axios";
import { baseUrl } from "../utils/services";

const Dashboard = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [filterAddPage, setFilterAddPage] = useState("info");
  const [showPage, setShowPage] = useState("books");
  const [bookname, setBookname] = useState("");
  const [searchPage, setSearchPage] = useState(1);
  const [searchTotalPages, setSearchTotalPages] = useState(1);
  const [searchBooks, setSearchBooks] = useState([]);
  const {
    books,
    getBooks,
    handleDelete,
    currentPage,
    totalPages,
    handlePageChange,
  } = useContext(GetBooksContext);
  const handleBooksTabClick = () => {
    setShowPage("books");
    getBooks();
  };

  // const handleAdminsTabClick = () => {
  //   setShowPage("admins");
  //   getUsers();
  // };

  const handleSearch = async (pageNum = 1) => {
    if (!bookname.trim()) {
      return;
    }

    try {
      const res = await axios.get(
        `${baseUrl}/books/search?bookname=${bookname}&page=${pageNum}`
      );
      setSearchBooks(res.data.books);
      setSearchPage(res.data.currentPage);
      setSearchTotalPages(res.data.totalPages);
      console.log(res.data.message);
    } catch (error) {
      setSearchBooks([]);
      setBookname("");
      error(error.response?.data?.message || "No books found.");
    }
  };

  const handleSearchPageChange = (newPage) => {
    handleSearch(newPage);
  };
  return (
    <div className="">
      <div className=" flex items-center gap-5">
        <h1 className=" font-semibold text-2xl my-8">INYR.Com </h1>
        <p className=" text-sm text-gray-500">
          developed by{" "}
          <a
            href="https://kthz.vercel.app"
            target="_blank"
            className=" text-blue-500 underline-offset-1 underline "
          >
            Khant Thiha Zaw
          </a>
        </p>
      </div>

      <div className=" border-2  rounded-xl">
        <div className=" flex justify-between items-center p-5 border-b-2">
          <div className="">
            <div className=" font-semibold text-lg">Attached files</div>
            <div className="">
              Add books and thesis to the system and manage them.
            </div>
          </div>
          <div
            className=" flex items-center gap-3 px-5 py-2 border-2 rounded-xl cursor-pointer hover:bg-slate-200"
            onClick={() => setIsAddOpen(!isAddOpen)}
          >
            <FaPlus />
            <span>Add</span>
          </div>
        </div>

        <div className="px-5 py-2 border-b-2 md:flex items-center justify-between ">
          <div className=" flex items-center border-2 rounded-xl">
            <div
              onClick={() => handleBooksTabClick()}
              className={` px-3 py-2 border-r-2 text-center cursor-pointer ${
                showPage == "book"
                  ? "bg-slate-300 rounded-s-lg"
                  : "hover:bg-slate-200 hover:rounded-s-lg"
              } `}
            >
              Books
            </div>
            {/* <div
              onClick={() => handleAdminsTabClick()}
              className={` px-3 py-2 border-r-2 text-center cursor-pointer ${
                showPage == "admins"
                  ? "bg-slate-300 rounded-e-lg"
                  : "hover:bg-slate-200 hover:rounded-s-lg"
              } `}
            >
              Admins
            </div> */}
          </div>

          <div className="flex items-center justify-center">
            <input
              type="text"
              className="  focus:outline-none bg-slate-200 px-3 py-2 rounded-xl my-3 md:my-0"
              placeholder="Search"
              value={bookname}
              onChange={(e) => setBookname(e.target.value)}
            />

            <button
              onClick={() => handleSearch(1)}
              className=" py-3 px-3 bg-slate-200 rounded-xl ml-3"
            >
              <FaSearch />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {searchBooks.length > 0 && (
              <>
                <div className="" onClick={() => setSearchBooks([])}>
                  <FaXmark />
                </div>
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left px-5 py-3 ">Name</th>
                    <th className="text-left px-5 py-3 ">Type</th>
                    <th className="text-left px-5 py-3 ">Description</th>
                    <th className="text-left px-5 py-3 ">Major</th>
                    <th className="text-left px-5 py-3 ">Year</th>
                    <th className="text-left px-5 py-3 ">Semester</th>

                    <th className="text-right px-5 py-3 ">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {searchBooks.map((data, index) => {
                    return (
                      <tr key={index} className="border-b-2 hover:bg-gray-100">
                        <td className="px-5 py-3 text-left font-medium border-r-2">
                          {data.bookname}
                        </td>
                        <td className="px-5 py-3 text-left border-r-2 ">
                          {data.bookType}
                        </td>
                        <td className="px-5 py-3 text-left truncate max-w-xs border-r-2">
                          {data.description}
                        </td>
                        <td className="px-5 py-3 text-left truncate max-w-xs border-r-2">
                          {data.major}
                        </td>
                        <td className="px-5 py-3 text-left truncate max-w-xs border-r-2">
                          {data.year}
                        </td>
                        <td className="px-5 py-3 text-left truncate max-w-xs border-r-2">
                          {data.semester}
                        </td>

                        <td className="px-5 py-3 text-right flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleDelete(data._id)}
                            className="bg-red-600 py-2 px-5 rounded-lg text-white hover:bg-red-700"
                          >
                            <FaTrashCan className="text-white" />
                          </button>
                          {/* <button className="bg-black py-2 px-5 rounded-lg text-white hover:bg-gray-800">
                            <FaPenToSquare className="text-white" />
                          </button> */}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <Pagination
                  currentPage={searchPage}
                  totalPages={searchTotalPages}
                  onPageChange={handleSearchPageChange}
                />
              </>
            )}

            {showPage === "books" && (
              <>
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left px-5 py-3 ">Name</th>
                    <th className="text-left px-5 py-3 ">Type</th>
                    <th className="text-left px-5 py-3 ">Description</th>
                    <th className="text-left px-5 py-3 ">Major</th>
                    <th className="text-left px-5 py-3 ">Year</th>
                    <th className="text-left px-5 py-3 ">Semester</th>

                    <th className="text-right px-5 py-3 ">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((data, index) => {
                    return (
                      <tr key={index} className="border-b-2 hover:bg-gray-100">
                        <td className="px-5 py-3 text-left font-medium border-r-2">
                          {data.bookname}
                        </td>
                        <td className="px-5 py-3 text-left border-r-2 ">
                          {data.bookType}
                        </td>
                        <td className="px-5 py-3 text-left truncate max-w-xs border-r-2">
                          {data.description}
                        </td>
                        <td className="px-5 py-3 text-left truncate max-w-xs border-r-2">
                          {data.major}
                        </td>
                        <td className="px-5 py-3 text-left truncate max-w-xs border-r-2">
                          {data.year}
                        </td>
                        <td className="px-5 py-3 text-left truncate max-w-xs border-r-2">
                          {data.semester}
                        </td>

                        <td className="px-5 py-3 text-right flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleDelete(data._id)}
                            className="bg-red-600 py-2 px-5 rounded-lg text-white hover:bg-red-700"
                          >
                            <FaTrashCan className="text-white" />
                          </button>
                          {/* <button className="bg-black py-2 px-5 rounded-lg text-white hover:bg-gray-800">
                            <FaPenToSquare className="text-white" />
                          </button> */}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>
      {isAddOpen && (
        <div className=" absolute top-0 right-0 w-full md:w-[50vw] shadow-lg overflow-hidden overflow-y-auto bg-white h-full z-10 text-black px-5">
          <div className="flex justify-between items-center py-5 ">
            <div className="flex items-center ">
              <div
                className={` ${
                  filterAddPage === "info" ? "bg-black text-white" : " border-2"
                } rounded-full px-5 py-2 cursor-pointer`}
                onClick={() => setFilterAddPage("info")}
              >
                Add Info
              </div>
              {/* <div
                className={`text-lg   ${
                  filterAddPage === "project"
                    ? "bg-black text-white"
                    : " border-2"
                } rounded-full px-5 py-2 cursor-pointer`}
                onClick={() => setFilterAddPage("project")}
              >
                Add Project
              </div> */}
            </div>
            <div
              className=" cursor-pointer"
              onClick={() => setIsAddOpen(!isAddOpen)}
            >
              <FaXmark size={24} />
            </div>
          </div>
          {filterAddPage === "info" ? <AddBooks /> : <AddProjects />}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Dashboard;
