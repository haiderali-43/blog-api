import Post from "../models/Post.js";
import File from "../models/File.js";
import aysncHandler from "express-async-handler";

export const renderPostform = aysncHandler((req, res) => {
  res.render("newPost", {
    title: "New Post",
    user: req.user,
    error: "",
  });
});

export const createPost = aysncHandler(async (req, res) => {
  try {
    const { title, content } = req.body;
    // validation
    if (!req.files || req.files.length === 0) {
      res.render("newPost", {
        title: "New Post",
        user: req.user,
        success: "",

        errorMessage: "Please upload at least one image",
      });
    }

    const images = await Promise.all(
      req.files.map(async (file) => {
        const newFile = new File({
          url: file.path,
          public_id: file.filename,
          uploaded_by: req.user._id,
          error: "",
        });
        await newFile.save();
        return {
          url: file.path,
          public_id: file.filename,
        };
      })
    );

    const newPost = new Post({
      title,
      content,
      author: req.user._id,
      images,
    });

    await newPost.save();
    res.render("newPost", {
      title: "New Post",
      user: req.user,
      successMessage: "Post created successfully",
    });
    res.redirect("/allposts");
  } catch (error) {
    console.log(error);
  }
});

export const renderPosts = aysncHandler(async (req, res) => {
  try {
    const posts = await Post.find();
    res.render("allposts", {
      title: "Posts",
      user: req.user,
      posts,
    });
  } catch (error) {
    console.log(error);
  }
});

export const getAllPosts = aysncHandler(async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.render("allposts", {
      title: "Posts",
      user: req.user,
      posts,
      success: "",
      error: "",
    });
  } catch (error) {
    console.log(error);
  }
});
