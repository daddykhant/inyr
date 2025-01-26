const Book = require("../models/Book");
const sharp = require("sharp");
// Create a new book
exports.createBook = async (req, res) => {
  try {
    const {
      bookname,
      year,
      semester,
      description,
      bookType,
      major,
      driveLink,
    } = req.body;
    let thumbnail = null;
    if (req.file) {
      const webpBuffer = await sharp(req.file.buffer).webp().toBuffer();
      thumbnail = webpBuffer.toString("base64");
    }

    const book = new Book({
      bookname,
      year,
      semester,
      description,
      bookType,
      major,
      driveLink,
      thumbnail,
    });

    await book.save();
    res.status(201).json({ message: "Successfully Uploaded", book });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ message: "Get all books.", books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Get a single book by ID", book });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
  try {
    const {
      bookname,
      year,
      semester,
      description,
      bookType,
      major,
      driveLink,
    } = req.body;
    const updateData = {
      bookname,
      year,
      semester,
      description,
      bookType,
      major,
      driveLink,
    };

    if (req.file) {
      updateData.thumbnail = req.file.buffer.toString("base64");
    }

    const book = await Book.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findBooksByType = async (req, res) => {
  try {
    const { bookType } = req.params; // Extract bookType from the URL

    if (!bookType) {
      return res
        .status(400)
        .json({ error: "bookType is required in the URL parameters" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = 25;

    // Query the correct field (bookType) instead of defaulting to _id
    const books = await Book.find({ bookType })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalBooks = await Book.countDocuments({ bookType });
    const totalPages = Math.ceil(totalBooks / limit);

    res.status(200).json({
      message: `Books found for type: ${bookType}`,
      currentPage: page,
      totalPages,
      totalBooks,
      books,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Find books by year
exports.findBooksByYear = async (req, res) => {
  try {
    const { year } = req.params;
    const books = await Book.find({ year });
    res.status(200).json({ message: `Books found for year: ${year}`, books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Find books by major
exports.findBooksByMajor = async (req, res) => {
  try {
    const { major } = req.params;
    const { page = 1 } = req.query; // Parse page number from query params
    const limit = 25;

    // Remove `bookType` if not necessary or define it explicitly
    const books = await Book.find({ major }) // Removed `bookType`
      .skip((page - 1) * limit)
      .limit(limit);

    const totalBooks = await Book.countDocuments({ major }); // Removed `bookType`
    const totalPages = Math.ceil(totalBooks / limit);

    res.status(200).json({
      message: `Books found for major: ${major}`,
      currentPage: page,
      totalPages,
      totalBooks,
      books,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Find books by major and type with pagination (25 per page)
exports.findBooksByMajorAndType = async (req, res) => {
  try {
    const { major, bookType } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = 25;

    const books = await Book.find({ major, bookType })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalBooks = await Book.countDocuments({ major, bookType });
    const totalPages = Math.ceil(totalBooks / limit);

    res.status(200).json({
      message: `Books found for major: ${major} and type: ${bookType}`,
      currentPage: page,
      totalPages,
      totalBooks,
      books,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.findBooksByMajorTypeYearAndSemester = async (req, res) => {
  try {
    const { major, bookType, year, semester } = req.params; // Extract parameters
    const page = parseInt(req.query.page) || 1;
    const limit = 25;

    // Query the database with filters for major, bookType, year, and semester
    const books = await Book.find({ major, bookType, year, semester })
      .skip((page - 1) * limit)
      .limit(limit);

    // Check if books were found
    if (books.length === 0) {
      return res.status(200).json({
        message: `No books found for major: ${year} ${semester} ${major} ${bookType} `,
      });
    }

    const totalBooks = await Book.countDocuments({
      major,
      bookType,
      year,
      semester,
    });
    const totalPages = Math.ceil(totalBooks / limit);

    // Send response with paginated results
    res.status(200).json({
      message: `Books found for major: ${major}, type: ${bookType}, year: ${year}, and semester: ${semester}`,
      currentPage: page,
      totalPages,
      totalBooks,
      books,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Find books by bookname with pagination
exports.findBooksByBookname = async (req, res) => {
  try {
    const { bookname } = req.query; // Get the bookname from query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = 25;

    if (!bookname || bookname.trim() === "") {
      return res
        .status(400)
        .json({ error: "bookname query parameter is required" });
    }

    // Use a regex search for case-insensitive matching of bookname
    const books = await Book.find({
      bookname: { $regex: bookname, $options: "i" },
    })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalBooks = await Book.countDocuments({
      bookname: { $regex: bookname, $options: "i" },
    });
    const totalPages = Math.ceil(totalBooks / limit);

    if (books.length === 0) {
      return res
        .status(200)
        .json({ message: `No books found matching: ${bookname}` });
    }

    res.status(200).json({
      message: `Books found matching: ${bookname}`,
      currentPage: page,
      totalPages,
      totalBooks,
      books,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
