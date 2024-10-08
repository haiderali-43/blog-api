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
import errohandler from "./middlewares/errorhandler.js";
import commentRoutes from "./routes/commentRoutes.js";
import methodOverride from "method-override";
import userRoutes from "./routes/userRoutes.js";

// dotenv
dotenv.config();

// Initialize the app
const app = express();



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(methodOverride("_method"));

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
app.use('/', commentRoutes);
app.use('/user', userRoutes);



//home route
app.get("/", (req, res) => {
  res.send("Welcome to the blog app");
});


// Error handler
ap.use(errohandler);
// Port configuration
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
