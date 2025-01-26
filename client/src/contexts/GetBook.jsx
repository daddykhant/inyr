import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../utils/services";

export const GetBooksContext = createContext();

// eslint-disable-next-line react/prop-types
export const GetBooksContextProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isLineClampOpen, setIsLineClampOpen] = useState(true);
  const [filters, setFilters] = useState({
    bookType: "",
    year: "",
    semester: "",
    major: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Toggle menu open/close
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("Menu status:", isMenuOpen);
  };

  // Toggle line clamp open/close
  const handleLineClampClick = () => {
    setIsLineClampOpen(!isLineClampOpen);
  };

  // Navigate to the book detail page with the book id
  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  // Format strings (e.g., replace underscores with spaces)
  const formatString = (string) => {
    if (!string) return ""; // Return an empty string or a default value if string is undefined or null
    return string.split("_").join(" ");
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    setCurrentPage(1); // Reset to the first page when filters change
  };
  const handlePageChange = (page) => {
    setCurrentPage(page); // Update currentPage to trigger re-fetch
  };
  // Fetch filtered books based on filters
  const handleSubmit = async () => {
    // Ensure at least one filter is selected
    if (
      !filters.bookType &&
      !filters.year &&
      !filters.semester &&
      !filters.major
    ) {
      setError("Please select at least one filter!");
      return;
    }

    try {
      // Fetch books from the API
      const response = await axios.get(
        `${baseUrl}/books/major/${filters.major}/type/${filters.bookType}/year/${filters.year}/semester/${filters.semester}?page=${currentPage}`
      );

      setFilteredBooks(response.data.books || []); // Ensure books array is set
      setTotalPages(response.data.totalPages || 1); // Ensure total pages are set
      setError(""); // Clear any existing error
    } catch (error) {
      console.error("Error fetching filtered books:", error);
      setError("An error occurred while fetching books. Please try again.");
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/books/delete/${id}`);
      console.log(response.data);
      // Fetch books again after deleting
      handleSubmit();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
  return (
    <GetBooksContext.Provider
      value={{
        isMenuOpen,
        isLineClampOpen,
        handleMenuClick,
        handleLineClampClick,
        handleBookClick,
        formatString,
        filters,
        setFilters,
        currentPage,
        setCurrentPage,
        filteredBooks,
        totalPages,
        handleFilterChange,
        handleSubmit,
        handlePageChange,
        handleDelete,
        error,
      }}
    >
      {children}
    </GetBooksContext.Provider>
  );
};
