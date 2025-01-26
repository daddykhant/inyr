const express = require("express");
const multer = require("multer");
const bookController = require("../controllers/bookController");

const router = express.Router();

// Multer configuration for file upload
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

// Define routes
router.post("/create", upload.single("thumbnail"), bookController.createBook);
router.get("/", bookController.getAllBooks);
router.get("/find/:id", bookController.getBookById);
router.put(
  "/update/:id",
  upload.single("thumbnail"),
  bookController.updateBook
);
router.delete("/delete/:id", bookController.deleteBook);
router.get(
  "/major/:major/type/:bookType",
  bookController.findBooksByMajorAndType
);
router.get("/major/:major", bookController.findBooksByMajor);
router.get("/type/:bookType", bookController.findBooksByType);
router.get(
  "/major/:major/type/:bookType/year/:year/semester/:semester",
  bookController.findBooksByMajorTypeYearAndSemester
);
router.get("/books/search", bookController.findBooksByBookname);

module.exports = router;
