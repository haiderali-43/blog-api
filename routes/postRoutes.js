import express from "express";
import {
  createPost,
  getAllPosts,
  renderPostform,
  renderPosts,
} from "../controllers/postController.js";
import uploadfile from "../config/multer.js";
import { isAuthenicated } from "../middlewares/auth.js";

const postRouter = express.Router();

postRouter.get("/postform", renderPostform);
postRouter.post(
  "/create",
  isAuthenicated,
  uploadfile.array("images", 5),
  createPost
);
postRouter.get("/allposts", renderPosts);



// fetch all posts
postRouter.get("/allposts", getAllPosts);

export default postRouter;
