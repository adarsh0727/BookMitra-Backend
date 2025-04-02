import express from "express";
import {
    getUserById,
    getAllUsers,
    updateUser,
    moveToActiveTransactions,
    moveToPrevTransactions,
    deleteUser
} from "../controllers/users.controller.js";

import { protect, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/getuser/:id", protect, getUserById);
router.get("/allmembers", protect, isAdmin, getAllUsers);

router.put("/updateuser/:id", protect, updateUser);
router.put("/:id/move-to-activetransactions", protect, isAdmin, moveToActiveTransactions);
router.put("/:id/move-to-prevtransactions", protect, isAdmin, moveToPrevTransactions);

router.delete("/deleteuser/:id", protect, deleteUser);

export default router;
