import express from "express";
import User from "../models/User.js";

const router = express.Router();

/* User Registration */
router.post("/register", async (req, res) => {
  try {
    console.log("Registering User:", req.body);

    /* Create a new user */
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
      password: req.body.password, // Store plain password for now
      isAdmin: req.body.isAdmin,
    });

    /* Save User and Return */
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json("Registration failed");
  }
});

/* User Login */
router.post("/signin", async (req, res) => {
  try {
    console.log("Login Request Data:", req.body);

    // Ensure that admissionId and employeeId are properly formatted
    const admissionId = req.body.admissionId?.toString();
    const employeeId = req.body.employeeId?.toString();

    // Find user by admissionId or employeeId
    const user = admissionId
      ? await User.findOne({ admissionId })
      : await User.findOne({ employeeId });

    console.log("User Found:", user);

    if (!user) return res.status(404).json("User not found");

    // Direct password comparison
    if (req.body.password !== user.password) {
      console.log("Password mismatch");
      return res.status(400).json("Wrong Password");
    }

    console.log("Login Successful:", user);
    res.status(200).json(user);
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json("Login failed");
  }
});

export default router;
