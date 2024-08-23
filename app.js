import express from "express";
import dbConfig from "./config/dbConfig.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import passportConfig from "./config/passportConfig.js";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import postRoutes from "./routes/postRoutes.js";

// dotenv
dotenv.config();

// Initialize the app
const app = express();

// Set view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret", // Consider using an environment variable for the session secret
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

// Initialize Passport and Passport session
passportConfig(passport);
app.use(passport.initialize()); // Initialize Passport middleware
app.use(passport.session()); // Use Passport session

// Database configuration
dbConfig();

// Routes
app.use("/", authRoutes);
app.use("/posts", postRoutes);



//home route
app.get("/", (req, res) => {
  res.render("home", {
    title: "Home",
    user: req.user,
  });
});

// Port configuration
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
