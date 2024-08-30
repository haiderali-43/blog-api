import passport from "passport";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import aysncHandler from "express-async-handler";

// Register a new user
export const register = aysncHandler(async (req, res) => {
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

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    // Send an error response
    return res.status(500).json({ message: "Server error" });
  }
});

// Login a user
export const login = aysncHandler(async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: "User logged in successfully" });
    });
  })(req, res, next); // This is the correct way to call it
});

// Render login page

// Render register page

export const logout = aysncHandler((req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }
  });
  res.redirect("/");
});
