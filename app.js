import express from "express";
import dbConfig from "./config/dbConfig.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
// initilize new app
const app = express();

//ejs

app.set("view engine", "ejs");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes

app.use("/", authRoutes);

// port
const PORT = process.env.PORT || 3000;

//db
dbConfig();

// start a server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



  