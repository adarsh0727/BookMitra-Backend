import User from "../models/User.js";
import { verifyToken } from "../utils/jwt.utils.js";

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = verifyToken(token); 

            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: "Not authorized, invalid token" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

export const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ message: "You don't have permission to perform this action!" });
    }
    next();
};
