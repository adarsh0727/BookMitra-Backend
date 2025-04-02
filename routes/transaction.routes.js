import express from "express";
import {
    addTransaction,
    getAllTransactions,
    updateTransaction,
    removeTransaction
} from "../controllers/transactions.controller.js";
import { protect, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add-transaction", protect, isAdmin, addTransaction);
router.get("/all-transactions", protect, getAllTransactions);
router.put("/update-transaction/:id", protect, isAdmin, updateTransaction);
router.delete("/remove-transaction/:id", protect, isAdmin, removeTransaction);

export default router;
