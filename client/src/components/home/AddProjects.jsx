const AddProjects = () => {
  return (
    <form className=" w-full py-5">
      <div className=" font-semibold  text-2xl ">Add the projects</div>
      <div className=" mb-5">Fill all input fields.</div>
      <div className=" grid grid-flow-col grid-cols-4">
        <div className=" col-span-1">Title</div>
        <input
          type="text"
          className=" col-span-3 bg-slate-200 rounded-lg py-2 px-5 text-black"
          placeholder="Enter title"
        />
      </div>
      <div className=" grid grid-flow-col grid-cols-4 mt-3">
        <div className=" col-span-1">Subtitle</div>
        <input
          type="text"
          className=" col-span-3 bg-slate-200 rounded-lg py-2 px-5 text-black"
          placeholder="Enter Subtitle"
        />
      </div>
      <div className=" grid grid-flow-col grid-cols-4 mt-3">
        <div className=" col-span-1">Description</div>
        <textarea
          name="detail"
          placeholder="Enter Details"
          className=" col-span-3 bg-slate-200 rounded-lg py-2 px-5 text-black"
        ></textarea>
      </div>

      <div
        // onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-slate-400 mt-10 border-2 border-dashed p-10 mb-10 cursor-pointer flex flex-col items-center justify-center rounded-2xl text-gray-800"
      >
        <svg
          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        <p className="text-2xl font-bold mb-2">
          Click to upload or drag and drop
        </p>
        <p className="mb-3">or</p>
        {/* File input field as an alternative */}
        <div className="flex items-center">
          <label className="w-full cursor-pointer">
            <span className="block py-2 px-4 bg-gray-700 text-white rounded-full mb-3">
              Choose File
            </span>
            <input
              type="file"
              // onChange={handleFileChange}
              multiple
              className="hidden"
              id="fileInput"
              accept=".jpg,.jpeg,.png,.gif" // File Limitation
            />
          </label>
        </div>
        <p>JPG, PNG or Webp ( MAX. 800 * 600 px & BELOW 4 MB )</p>
        <p>* Webp is recommended *</p>
      </div>
      <div className=" py-2 px-5 bg-black text-white inline-block rounded-lg mt-3">
        Save
      </div>
    </form>
  );
};

export default AddProjects;
