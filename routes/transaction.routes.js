import express from "express";
import {
    addTransaction,
    getAllTransactions,
    updateTransaction,
    removeTransaction
} from "../controllers/transactions.controller.js";
import { protect, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add-transaction",addTransaction);
router.get("/all-transactions", getAllTransactions);
router.put("/update-transaction/:id", updateTransaction);
router.delete("/remove-transaction/:id", removeTransaction);

export default router;
