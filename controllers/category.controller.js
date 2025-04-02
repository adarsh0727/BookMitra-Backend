import BookCategory from "../models/BookCategory.js";

/* Get all categories */
export const getAllCategories = async (req, res) => {
    try {
        const categories = await BookCategory.find({});
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: "Error fetching categories", error: err });
    }
};

/* Add a new category */
export const addCategory = async (req, res) => {
    try {
        const newCategory = new BookCategory({
            categoryName: req.body.categoryName,
        });

        const category = await newCategory.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ message: "Error adding category", error: err });
    }
};
