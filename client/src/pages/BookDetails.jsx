import { Link, useParams } from "react-router-dom";
import { leftIcon } from "../assets";
import { useContext, useEffect, useState } from "react";
import { GetBooksContext } from "../contexts/GetBook";
import { baseUrl } from "../utils/services";
import axios from "axios";
import Pagination from "../components/home/Pagination";

const BookDetails = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [suggestBooks, setSuggestBooks] = useState([]);
  const { handleLineClampClick, isLineClampOpen, formatString } =
    useContext(GetBooksContext);
  const { id } = useParams();
  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        const response = await axios.get(`${baseUrl}/books/find/${id}`);

        setBook(response.data.book);
        setTotalPages(response.data.totalPages || 1);
        if (response.data.book) {
          fetchSuggestBooks(
            response.data.book.major,
            response.data.book.bookType,
            response.data.book._id // Pass the current book's ID
          );
        }
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const fetchSuggestBooks = async (major, bookType, currentBookId) => {
    try {
      const response = await axios.get(
        `${baseUrl}/books/major/${major}/type/${bookType}`
      );

      // Exclude the current book from suggestions
      const filteredBooks = response.data.books.filter(
        (suggestedBook) => suggestedBook._id !== currentBookId
      );
      setSuggestBooks(filteredBooks);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to fetch suggest books"
      );
    }
  };

  // Handle pagination change
  const handlePageChange = (page) => {
    setCurrentPage(page); // Update currentPage to trigger re-fetch
  };

  return (
    <div className="h-[100vh] w-full  overflow-y-auto ">
      <div className="pe-3 ps-3 md:ps-5 md:pe-5 py-3 md:py-5 relative">
        {/* Book showcase  */}
        {loading && (
          <div className="text-center w-full h-[100vh]">Loading...</div>
        )}
        {error && <div className="text-center text-red-500">{error}</div>}
        <div className="">
          <div className=" w-6 md:w-8 object-cover overflow-hidden absolute ">
            <Link to="/books/textbook" className="">
              <img src={leftIcon} alt="" className=" w-full" />
            </Link>
          </div>
          <div className="block lg:grid grid-cols-2">
            <div className=" w-32 md:w-64 lg:w-52 lg:h-72 object-cover overflow-hidden rounded-lg mx-auto mb-10 md:mb-3">
              <img
                src={`data:image/jpeg;base64,${book.thumbnail}`}
                alt={book.bookname}
                className=" w-full h-full"
              />
            </div>

            <div className=" ">
              <div className=" text-2xl md:text-3xl font-bold md:mb-3 font-title capitalize">
                {book.bookname}
              </div>
              <div className="grid grid-flow-col grid-cols-5 gap-3 ">
                <div className=" font-bold col-span-2 md:col-span-1">
                  <div className=" capitalize">Major : </div>
                  <div className="capitalize">Year :</div>
                  <div className="mb-3 capitalize">Semester :</div>
                </div>
                <div className=" col-span-3 md:col-span-4">
                  <div className=" capitalize">{book.major}</div>

                  <div className=" capitalize">{book.year} Year</div>
                  <div className="mb-3 capitalize">
                    ({formatString(book.semester)})
                  </div>
                </div>
              </div>
              <div className="font-bold"> Description :</div>
              <p
                className={`text-sm mb-5 md:mb-10 ${
                  isLineClampOpen ? "line-clamp-none" : "line-clamp-3"
                } `}
                onClick={handleLineClampClick}
              >
                {book.description}
              </p>

              <a
                href={book.driveLink}
                className=" px-5 py-3 mb-5 font-semibold bg-primary text-white shadow-2xl rounded-full justify-self-center cursor-pointer"
              >
                Download
              </a>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="font-semibold text-lg mb-3">Other</div>
          <ul className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-between overflow-auto">
            {suggestBooks.length > 0 ? (
              suggestBooks.map((suggestedBook) => (
                <li key={suggestedBook._id} className="w-32 md:w-48 mb-5">
                  <Link to={`/book/${suggestedBook._id}`}>
                    <div className="w-32 h-48 md:w-44 md:h-60 mb-2 overflow-hidden object-contain rounded-lg">
                      <img
                        src={`data:image/jpeg;base64,${suggestedBook.thumbnail}`}
                        alt={suggestedBook.bookname}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="font-semibold line-clamp-3 font-title capitalize">
                      {suggestedBook.bookname}
                    </div>
                    <div className="text-sm capitalize">
                      {suggestedBook.year},
                      {formatString(suggestedBook.semester)}
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <p>No suggestions available for this book.</p>
            )}
          </ul>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BookDetails;
