import User from "../models/User.js";

export const registerUser = async (req, res) => {
    try {
        console.log("Registering User:", req.body);

        const newUser = new User({
            userType: req.body.userType,
            userFullName: req.body.userFullName,
            admissionId: req.body.admissionId?.toString(),
            employeeId: req.body.employeeId,
            age: req.body.age,
            dob: req.body.dob,
            gender: req.body.gender,
            address: req.body.address,
            mobileNumber: req.body.mobileNumber,
            email: req.body.email,
            password: req.body.password, 
            isAdmin: req.body.isAdmin,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ message: "Registration failed" });
    }
};

/* User Login */
export const loginUser = async (req, res) => {
    try {
        console.log("Login Request Data:", req.body);

        const admissionId = req.body.admissionId?.toString();
        const employeeId = req.body.employeeId?.toString();

        const user = admissionId
            ? await User.findOne({ admissionId })
            : await User.findOne({ employeeId });

        console.log("User Found:", user);

        if (!user) return res.status(404).json({ message: "User not found" });

        if (req.body.password !== user.password) {
            console.log("Password mismatch");
            return res.status(400).json({ message: "Wrong password" });
        }

        console.log("Login Successful:", user);
        res.status(200).json(user);
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Login failed" });
    }
};
