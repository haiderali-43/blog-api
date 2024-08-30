import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getEditPostForm,
  renderPosts,
} from "../controllers/postController.js";
import uploadfile from "../config/multer.js";
import { isAuthenicated } from "../middlewares/auth.js";

const postRouter = express.Router();


postRouter.post(
  "/create",
  isAuthenicated,
  uploadfile.array("images", 5),
  createPost
);
postRouter.get("/allposts", renderPosts);

// fetch post by id
postRouter.get("/post/:id", getPostbyId);

// edit post
postRouter.get("/post/:id/edit", getEditPostForm);

// fetch all posts
postRouter.get("/allposts", getAllPosts);


//delete post
postRouter.delete("/post/:id", deletePost);

export default postRouter;
