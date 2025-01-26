import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/services";

const UploadBookPage = () => {
  const defaultData = {
    bookname: "",
    year: "first",
    semester: "1st_sem",
    description: "",
    bookType: "textbook",
    major: "civil",
    driveLink: "",
  };
  const [bookData, setBookData] = useState(defaultData);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("bookname", bookData.bookname);
    formData.append("year", bookData.year);
    formData.append("semester", bookData.semester);
    formData.append("description", bookData.description);
    formData.append("bookType", bookData.bookType);
    formData.append("major", bookData.major);
    formData.append("driveLink", bookData.driveLink);
    if (thumbnail) formData.append("thumbnail", thumbnail);
    console.log([...formData.entries()]);

    try {
      const response = await axios.post(`${baseUrl}/books/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Check if the response includes a message property
      if (response.data && response.data.message) {
        setMessage(response.data.message);
        setTimeout(() => setMessage(""), 5000);
      } else {
        setMessage("Book uploaded successfully!");
      }
    } catch (error) {
      // More detailed error handling
      console.error("Error uploading book:", error);
      setMessage(
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "Error uploading book. Please try again."
      );
    } finally {
      setLoading(false);
      setBookData(defaultData);
      setThumbnail(null);
    }
  };

  const handleThumbnailCancel = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
  };
  return (
    <div className=" mb-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload New Book</h2>
      {message && (
        <div className="mb-4 text-center text-white py-2 px-4 rounded-lg bg-green-500">
          {message}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {/* Book Name */}
        <div>
          <label className="block font-medium text-gray-700">Book Name</label>
          <input
            type="text"
            name="bookname"
            value={bookData.bookname}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Year */}
        <div>
          <label className="block font-medium text-gray-700">
            Academic Year
          </label>
          <select
            name="year"
            value={bookData.year}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="first">First Year</option>
            <option value="second">Second Year</option>
            <option value="third">Third Year</option>
            <option value="fourth">Fourth Year</option>
            <option value="fifth">Fifth Year</option>
            <option value="final">Final Year</option>
          </select>
        </div>

        {/* Semester */}
        <div>
          <label className="block font-medium text-gray-700">Semester</label>
          <select
            name="semester"
            value={bookData.semester}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="1st_sem">1st Sem</option>
            <option value="2nd_sem">2nd Sem</option>
            <option value="full_sem">Full Sem</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={bookData.description}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Book Type */}
        <div>
          <label className="block font-medium text-gray-700">Book Type</label>
          <select
            name="bookType"
            value={bookData.bookType}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="textbook">Textbook</option>
            <option value="thesis">Thesis</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Major */}
        <div>
          <label className="block font-medium text-gray-700">Major</label>
          <select
            name="major"
            value={bookData.major}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="civil">Civil</option>
            <option value="ep">EP</option>
            <option value="ec">EC</option>
            <option value="mech">Mech</option>
          </select>
        </div>

        {/* Google Drive Link */}
        <div>
          <label className="block font-medium text-gray-700">Drive Link</label>
          <input
            type="url"
            name="driveLink"
            value={bookData.driveLink}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block font-medium text-gray-700">
            Thumbnail (Image under 5MB)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="mt-1 block w-full"
          />
        </div>
        <div className="">
          {thumbnailPreview && (
            <div
              className=" mt-2 w-32 h-36 rounded-md overflow-hidden"
              onClick={handleThumbnailCancel}
            >
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          {loading ? "Uploading..." : "Upload Book"}
        </button>
      </form>
    </div>
  );
};

export default UploadBookPage;
