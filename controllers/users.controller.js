import User from "../models/User.js";

/* Get User by ID */
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate("activeTransactions")
            .populate("prevTransactions");

        if (!user) return res.status(404).json({ message: "User not found" });

        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
};

/* Get All Users */
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
            .populate("activeTransactions")
            .populate("prevTransactions")
            .sort({ _id: -1 });

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

/* Update User */
export const updateUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json({ message: "Account updated successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
};

/* Move Transaction to Active */
export const moveToActiveTransactions = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        await user.updateOne({ $push: { activeTransactions: req.params.id } });
        res.status(200).json({ message: "Added to Active Transactions" });
    } catch (err) {
        res.status(500).json(err);
    }
};

/* Move Transaction to Previous */
export const moveToPrevTransactions = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        await user.updateOne({ $pull: { activeTransactions: req.params.id } });
        await user.updateOne({ $push: { prevTransactions: req.params.id } });
        res.status(200).json({ message: "Added to Previous Transactions" });
    } catch (err) {
        res.status(500).json(err);
    }
};

/* Delete User */
export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Account deleted successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
};
