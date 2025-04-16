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

router.get("/getuser/:id", getUserById);
router.get("/allmembers", getAllUsers);

router.put("/updateuser/:id", updateUser);
router.put("/:id/move-to-activetransactions",moveToActiveTransactions);
router.put("/:id/move-to-prevtransactions", moveToPrevTransactions);

router.delete("/deleteuser/:id", protect, deleteUser);

export default router;
