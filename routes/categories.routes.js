import express from "express";
import { getAllCategories, addCategory } from "../controllers/category.controller.js";
import { protect, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/allcategories", getAllCategories);
router.post("/addcategory", addCategory);

export default router;
