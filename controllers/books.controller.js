import Book from "../models/Book.js";
import BookCategory from "../models/BookCategory.js";

/* Get all books */
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({}).populate("transactions").sort({ _id: -1 });
        res.status(200).json(books);
    } catch (err) {
        res.status(504).json(err);
    }
};

/* Get book by ID */
export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("transactions");
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json(err);
    }
};

/* Get books by category */
export const getBooksByCategory = async (req, res) => {
    try {
        const category = req.query.category;
        const books = await BookCategory.findOne({ categoryName: category }).populate("books");
        res.status(200).json(books);
    } catch (err) {
        res.status(504).json(err);
    }
};

/* Add a new book */
export const addBook = async (req, res) => {
    try {
        const newBook = new Book({
            bookName: req.body.bookName,
            alternateTitle: req.body.alternateTitle,
            author: req.body.author,
            bookCountAvailable: req.body.bookCountAvailable,
            language: req.body.language,
            publisher: req.body.publisher,
            bookStatus: req.body.bookStatus,  // Fixed typo from bookSatus
            categories: req.body.categories
        });

        const book = await newBook.save();
        await BookCategory.updateMany({ _id: book.categories }, { $push: { books: book._id } });

        res.status(200).json(book);
    } catch (err) {
        res.status(504).json(err);
    }
};

/* Update book */
export const updateBook = async (req, res) => {
    try {
        await Book.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json({ message: "Book details updated successfully" });
    } catch (err) {
        res.status(504).json(err);
    }
};

/* Delete book */
export const removeBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        await book.deleteOne();
        await BookCategory.updateMany({ _id: book.categories }, { $pull: { books: book._id } });

        res.status(200).json({ message: "Book has been deleted" });
    } catch (err) {
        res.status(504).json(err);
    }
};
