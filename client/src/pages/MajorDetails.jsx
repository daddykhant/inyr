import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { baseUrl } from "../utils/services";
import { GetBooksContext } from "../contexts/GetBook";
import Pagination from "../components/home/Pagination";
import { leftIcon } from "../assets";

const MajorDetails = () => {
  const [filters, setFilters] = useState({
    bookType: "",
    year: "",
    semester: "",
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const { major } = useParams();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { handleBookClick, formatString } = useContext(GetBooksContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!name) return;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!filters.bookType && !filters.year && !filters.semester) {
      setError("Please select at least one filter!");
      return;
    }
    try {
      const response = await axios.get(
        `${baseUrl}/books//major/${major}/type/${filters.bookType}/year/${filters.year}/semester/${filters.semester}?page=${currentPage}`
      );

      setFilteredBooks(response.data.books);
      setTotalPages(response.data.totalPages);
      console.log(response.data);
    } catch (error) {
      setMessage("Fetch error!");
      setTimeout(() => setMessage(""), 5000);
      console.log("Error fetching filtered books:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update currentPage to trigger re-fetch
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/books/major/${major}?page=${currentPage}`
        );
        setBooks(response.data.books);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, [major, currentPage]);

  // Define button color based on major
  const buttonColor =
    major === "ep"
      ? "bg-gradient-to-r from-blue-200 to-cyan-200  "
      : major === "ec"
      ? "bg-gradient-to-r from-amber-200 to-yellow-500 "
      : major === "mech"
      ? "bg-gradient-to-r from-teal-200 to-teal-500 "
      : " bg-gradient-to-r  from-violet-200 to-pink-200 ";
  return (
    <div className="w-full h-[100vh] overflow-y-auto">
      <div className="px-3 md:px-5 py-3 md:py-5">
        <div className=" flex items-center justify-center md:grid grid-cols-3 w-full">
          <Link to="/books/textbook" className="hidden md:block">
            <img src={leftIcon} alt="" className="" />
          </Link>
          <div className="capitalize font-bold text-2xl mb-5 w-full text-center">
            {major === "ep"
              ? "Electrical Power"
              : major === "ec"
              ? "Electronics and Communication"
              : major === "mech"
              ? "Mechanical Engineering"
              : "Civil Engineering"}
          </div>
          <div className="flex-1 "></div>
        </div>
        <form
          className={`${buttonColor} shadow-md p-5 rounded-xl`}
          onSubmit={handleSubmit}
        >
          <h1 className="mb-3 font-semibold">Filter</h1>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex flex-wrap justify-between text-slate-700">
            <select
              className="rounded-xl py-2 px-5 border mb-3"
              onChange={handleInputChange}
              name="bookType"
              value={filters.bookType}
              aria-label="Select book type"
            >
              <option value="">Select book type ...</option>
              <option value="textbook">Textbooks</option>
              <option value="thesis">Thesis</option>
              <option value="other">Others</option>
            </select>
            <select
              name="year"
              value={filters.year}
              className="rounded-xl py-2 px-5 border mb-3"
              onChange={handleInputChange}
              aria-label="Select year"
            >
              <option value="">Select year ...</option>
              <option value="first">First Year</option>
              <option value="second">Second Year</option>
              <option value="third">Third Year</option>
              <option value="fourth">Fourth Year</option>
              <option value="fifth">Fifth Year</option>
              <option value="final">Final Year</option>
            </select>
            <select
              name="semester"
              value={filters.semester}
              className="rounded-xl py-2 px-5 border mb-3"
              onChange={handleInputChange}
              aria-label="Select semester"
            >
              <option value="">Select semester ...</option>
              <option value="1st_sem">First Semester</option>
              <option value="2nd_sem">Second Semester</option>
              <option value="full_sem">Full Semester</option>
            </select>
            <button
              type="submit"
              className={`bg-gray-100 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-2 border-zinc-100
 px-7 py-2  font-semibold text-black shadow-xl `}
            >
              Find
            </button>
          </div>
        </form>
        {message && <p className="text-green-500">{message}</p>}
        <div className="p-5 mt-5">
          <div className="">
            <ul className="flex flex-wrap gap-5 w-full overflow-auto">
              {(filteredBooks.length > 0 ? filteredBooks : books).map(
                (book) => (
                  <li
                    key={book._id}
                    onClick={() => handleBookClick(book._id)}
                    className="cursor-pointer"
                  >
                    <div className="w-24 h-36 md:w-44 md:h-60 mb-4 overflow-hidden object-contain shadow-xl rounded-lg">
                      <img
                        src={`data:image/jpeg;base64,${book.thumbnail}`}
                        alt={book.bookname}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="text-sm md:text-base font-semibold">
                      {book.bookname}
                    </div>
                    <div className="text-xs capitalize">
                      {formatString(book.semester) || "N/A"}
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default MajorDetails;
