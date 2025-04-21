import { useContext, useEffect, useState } from "react";

import { baseUrl } from "../utils/services";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Pagination from "../components/home/Pagination";
import { GetBooksContext } from "../contexts/GetBook";
import { banner } from "../assets";
import Categories from "./Categories";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const { bookType } = useParams(); // Get bookType from the URL
  const { handleBookClick, formatString } = useContext(GetBooksContext);

  useEffect(() => {
    const fetchBooksByType = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${baseUrl}/books/type/${bookType}?page=${currentPage}`
        );

        setBooks(response.data.books || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooksByType();
  }, [bookType, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full  overflow-y-auto">
      <div className="px-3 md:px-5 py-3 md:py-5">
        {/* Header Section */}
        <div className="lg:flex ">
          <div className=" px-3 md:px-10 py-3 lg:py-8 text-white bg-banner shadow-xl rounded-xl relative overflow-hidden w-full">
            <div className="absolute right-0 bottom-0 w-[28%] z-40 hidden lg:block">
              <img src={banner} alt="" />
            </div>
            <div className="flex flex-col justify-center z-50 text-xs md:text-sm text-gray-600">
              <div className="text-lg md:text-3xl font-bold mb-1 md:mb-2">
                INYR.Com
              </div>
              <div className="text-xs md:text-sm mb-2 md:mb-5 font-title ">
                Find accessible, and reliable textbooks for Technology
                University courses.
              </div>
              <span className=" inline-block md:hidden">
                <Link
                  to="/category"
                  className=" bg-white text-black px-3 py-1 rounded-lg  "
                >
                  Explore Books
                </Link>
              </span>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <Categories />
        </div>
        {/* Book List Section */}
        <div className="mt-5">
          <div className="font-semibold text-lg mb-3">Textbooks</div>
          {loading && <p>Loading books...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 w-full">
            {books.map((book) => (
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
                <div className="text-xs">
                  {formatString(book.semester) || "N/A"}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Home;
