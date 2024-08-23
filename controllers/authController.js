import passport from "passport";
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
export const login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      // Render login page with an error message if user is not found
      return res.render("login", {
        title: "Login",
        user: req.user, // Make sure you're using req.body for email
        error: info.message,
      });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      // Redirect to homepage on successful login
      return res.redirect("/");
    });
  })(req, res, next); // This is the correct way to call it
};

// Render login page
export const renderLogin = (req, res) => {
  res.render("login", {
    title: "Login",
    user: req.user,

    error: "",
  });
};

// Render register page
export const renderRegister = (req, res) => {
  res.render("register", {
    title: "Register",
    user: req.user,
    error: "",
  });
};

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }
  });
  res.redirect("/");
};
