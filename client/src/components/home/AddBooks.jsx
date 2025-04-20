import axios from "axios";
import { baseUrl } from "../../utils/services";
import { useState } from "react";

const AddBooks = () => {
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
      const maxSize = 4 * 1024 * 1024; // 4MB
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        setMessage("Only JPG, PNG, or WEBP images are allowed.");
        return;
      }
      if (file.size > maxSize) {
        setMessage("File size should be less than 4MB.");
        return;
      }
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
    <form className=" w-full  py-5 scroll-auto " onSubmit={handleSubmit}>
      <div className=" font-semibold  text-2xl ">Add the infos</div>
      <div className=" mb-5">Fill all input fields.</div>
      {message && (
        <div className="mt-4 text-green-700 font-medium">{message}</div>
      )}
      <div className=" grid grid-flow-col grid-cols-4">
        <div className=" col-span-1 text-sm font-semibold">Book Name</div>
        <input
          type="text"
          name="bookname"
          onChange={handleInputChange}
          required
          className=" col-span-3 bg-slate-200 rounded-lg py-2 px-5 text-black"
          placeholder="Enter title"
          value={bookData.bookname}
        />
      </div>
      <div className=" grid grid-flow-col grid-cols-4 mt-3">
        <div className=" col-span-1 text-sm font-semibold">Academic Year</div>
        <select
          name="year"
          value={bookData.year}
          onChange={handleInputChange}
          className=" col-span-3 bg-slate-200 rounded-lg py-2 px-5 text-black"
        >
          <option value="first">First Year</option>
          <option value="second">Second Year</option>
          <option value="third">Third Year</option>
          <option value="fourth">Fourth Year</option>
          <option value="fifth">Fifth Year</option>
          <option value="final">Final Year</option>
        </select>
      </div>
      <div className=" grid grid-flow-col grid-cols-4 mt-3">
        <div className=" col-span-1 text-sm font-semibold">Semester</div>
        <select
          name="semester"
          value={bookData.semester}
          onChange={handleInputChange}
          className=" col-span-3 bg-slate-200 rounded-lg py-2 px-5 text-black"
        >
          <option value="1st_sem">1st Sem</option>
          <option value="2nd_sem">2nd Sem</option>
          <option value="full_sem">Full Sem</option>
        </select>
      </div>
      <div className=" grid grid-flow-col grid-cols-4 mt-3">
        <div className=" col-span-1 text-sm font-semibold">Major</div>
        <select
          name="major"
          value={bookData.major}
          onChange={handleInputChange}
          className=" col-span-3 bg-slate-200 rounded-lg py-2 px-5 text-black"
        >
          <option value="civil">Civil</option>
          <option value="ep">EP</option>
          <option value="ec">EC</option>
          <option value="mech">Mech</option>
        </select>
      </div>
      <div className=" grid grid-flow-col grid-cols-4 mt-3">
        <div className=" col-span-1 text-sm font-semibold">Book Type</div>
        <select
          name="bookType"
          value={bookData.bookType}
          onChange={handleInputChange}
          className=" col-span-3 bg-slate-200 rounded-lg py-2 px-5 text-black"
        >
          <option value="textbook">Textbook</option>
          <option value="thesis">Thesis</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className=" grid grid-flow-col grid-cols-4 mt-3">
        <div className=" col-span-1 text-sm font-semibold">Description</div>
        <textarea
          name="description"
          placeholder="Enter Details"
          onChange={handleInputChange}
          value={bookData.description}
          className=" col-span-3 bg-slate-200 rounded-lg py-2 px-5 text-black"
        ></textarea>
      </div>
      <div className=" grid grid-flow-col grid-cols-4 mt-3">
        <div className=" col-span-1 text-sm font-semibold">Drive Link</div>
        <input
          type="url"
          name="driveLink"
          onChange={handleInputChange}
          required
          className="  col-span-3 bg-slate-200 rounded-lg py-2 px-5 text-black"
          placeholder="Enter Google Drive Link"
          value={bookData.driveLink}
        />
      </div>
      {/* Thumbnail */}
      <div className=" ">
        <label className="  text-sm font-semibold">Thumbnails</label>
        <input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={handleThumbnailChange}
          className="col-span-3 bg-slate-200 my-3 rounded-lg py-2 px-5 text-black"
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

      <button
        type="submit"
        disabled={loading}
        className=" py-2 px-5 bg-black text-white inline-block rounded-lg mt-3"
      >
        {loading ? "Uploading..." : "Save"}
      </button>
    </form>
  );
};

export default AddBooks;

// Drag and Drop

//  <div
//    // onDrop={handleDrop}
//    onDragOver={(e) => e.preventDefault()}
//    className="border-slate-400 mt-10 border-2 border-dashed p-10 mb-10 cursor-pointer flex flex-col items-center justify-center rounded-2xl text-gray-800"
//  >
//    <svg
//      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
//      aria-hidden="true"
//      xmlns="http://www.w3.org/2000/svg"
//      fill="none"
//      viewBox="0 0 20 16"
//    >
//      <path
//        stroke="currentColor"
//        strokeLinecap="round"
//        strokeLinejoin="round"
//        strokeWidth="2"
//        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//      />
//    </svg>
//    <p className="text-2xl font-bold mb-2">Click to upload or drag and drop</p>
//    <p className="mb-3">or</p>
//    {/* File input field as an alternative */}
//    <div className="flex items-center">
//      <label className="w-full cursor-pointer">
//        <span className="block py-2 px-4 bg-gray-700 text-white rounded-full mb-3">
//          Choose File
//        </span>
//        <input
//          type="file"
//          // onChange={handleFileChange}
//          multiple
//          className="hidden"
//          id="fileInput"
//          accept=".jpg,.jpeg,.png,.gif" // File Limitation
//        />
//      </label>
//    </div>
//    <p>JPG, PNG or Webp ( MAX. 800 * 600 px & BELOW 4 MB )</p>
//    <p>* Webp is recommended *</p>
//  </div>;
