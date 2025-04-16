import express from "express";
import {
    getAllBooks,
    getBookById,
    getBooksByCategory,
    addBook,
    updateBook,
    removeBook
} from "../controllers/books.controller.js";

import { protect, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/allbooks", getAllBooks);
router.get("/getbook/:id", getBookById);
router.get("/", getBooksByCategory);

router.post("/addbook", addBook);
router.put("/updatebook/:id",  updateBook);
router.delete("/removebook/:id", removeBook);

export default router;
