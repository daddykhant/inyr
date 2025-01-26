import { useContext } from "react";

import { GetBooksContext } from "../contexts/GetBook";
import Pagination from "../components/home/Pagination";
import { trash } from "../assets";

const Dashboard = () => {
  const { formatString } = useContext(GetBooksContext); // Context function for formatting
  const {
    filteredBooks,
    totalPages,
    handleFilterChange,
    handleSubmit,
    handlePageChange,
    currentPage,
    filters,
    handleDelete,
  } = useContext(GetBooksContext);

  return (
    <div className="p-5 lg:w-[80vw] mx-auto">
      <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>

      {/* Filters */}
      <form
        className="bg-slate-200 shadow-md p-5 rounded-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-3 font-semibold">Filter</h1>

        <div className="flex flex-wrap justify-between">
          <select
            className="rounded-xl py-2 px-5 border mb-3"
            onChange={handleFilterChange}
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
            name="major"
            value={filters.major}
            className="rounded-xl py-2 px-5 border mb-3"
            onChange={handleFilterChange}
            aria-label="Select major"
          >
            <option value="">Select major ...</option>
            <option value="civil">Civil</option>
            <option value="ep">EP</option>
            <option value="ec">EC</option>
            <option value="mech">Mech</option>
          </select>
          <select
            name="year"
            value={filters.year}
            className="rounded-xl py-2 px-5 border mb-3"
            onChange={handleFilterChange}
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
            onChange={handleFilterChange}
            aria-label="Select semester"
          >
            <option value="">Select semester ...</option>
            <option value="1st_sem">First Semester</option>
            <option value="2nd_sem">Second Semester</option>
            <option value="full_sem">Full Semester</option>
          </select>
          <button
            type="submit"
            className="bg-primary px-7 py-2 rounded-full font-semibold text-white"
          >
            Find
          </button>
        </div>
      </form>

      {/* Books Grid */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <li
              key={book._id}
              className="cursor-pointer p-5 bg-slate-200 rounded-lg flex  items-center justify-between gap-2"
            >
              <div className="">
                <div className="text-sm md:text-base font-semibold">
                  {book.bookname}
                </div>
                <div className="text-xs">
                  {formatString(book.semester) || "N/A"} - {book.year} Year
                </div>
              </div>
              <button onClick={() => handleDelete(book._id)}>
                <img src={trash} alt="" />
              </button>
            </li>
          ))
        ) : (
          <li className="col-span-full text-center text-gray-500">
            No books found for the selected filters.
          </li>
        )}
      </ul>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Dashboard;
