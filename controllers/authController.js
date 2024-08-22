import User from "../models/User.js";
import bcryptjs from "bcryptjs";

// Register a new user
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Correct instantiation of a new User
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.redirect("/login");
  } catch (error) {
    console.log(error);
    // Send an error response
    return res.status(500).json({ message: "Server error" });
  }
};

// Login a user
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Compare hashed password
    const isMatch = await bcryptjs.compare(password, findUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Handle successful login (e.g., send a token, set a cookie, etc.)
    return res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Render login page
export const renderLogin = (req, res) => {
  res.render("login");
};

// Render register page
export const renderRegister = (req, res) => {
  res.render("register");
};
