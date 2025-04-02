import BookTransaction from "../models/BookTransaction.js";
import Book from "../models/Book.js";

/* Add a New Transaction */
export const addTransaction = async (req, res) => {
    try {
        const newTransaction = new BookTransaction({
            bookId: req.body.bookId,
            borrowerId: req.body.borrowerId,
            bookName: req.body.bookName,
            borrowerName: req.body.borrowerName,
            transactionType: req.body.transactionType,
            fromDate: req.body.fromDate,
            toDate: req.body.toDate
        });

        const transaction = await newTransaction.save();
        const book = await Book.findById(req.body.bookId);
        
        if (!book) return res.status(404).json({ message: "Book not found" });

        await book.updateOne({ $push: { transactions: transaction._id } });

        res.status(200).json(transaction);
    } catch (err) {
        res.status(500).json({ message: "Error adding transaction", error: err });
    }
};

/* Get All Transactions */
export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await BookTransaction.find({}).sort({ _id: -1 });
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ message: "Error fetching transactions", error: err });
    }
};

/* Update a Transaction */
export const updateTransaction = async (req, res) => {
    try {
        await BookTransaction.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json({ message: "Transaction updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error updating transaction", error: err });
    }
};

/* Remove a Transaction */
export const removeTransaction = async (req, res) => {
    try {
        const transaction = await BookTransaction.findByIdAndDelete(req.params.id);
        
        if (!transaction) return res.status(404).json({ message: "Transaction not found" });

        const book = await Book.findById(transaction.bookId);
        
        if (!book) return res.status(404).json({ message: "Book not found" });

        await book.updateOne({ $pull: { transactions: req.params.id } });

        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting transaction", error: err });
    }
};
