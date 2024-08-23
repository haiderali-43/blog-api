import express from "express";
import { createPost, renderPostform, renderPosts } from "../controllers/postController.js";

const postRouter = express.Router();


postRouter.get("/postform", renderPostform  );
postRouter.post("/create", createPost);
postRouter.get("/posts", renderPosts);



export default postRouter;