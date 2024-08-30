import Post from "../models/Post.js";
import File from "../models/File.js";
import aysncHandler from "express-async-handler";

export const createPost = aysncHandler(async (req, res) => {
  try {
    const { title, content } = req.body;

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

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.log(error);
  }
});

export const updatePost = aysncHandler(async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.findById(req.params.id);

    post.title = title;
    post.content = content;

    await post.save();

    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    console.log(error);
  }
});

export const getAllPosts = aysncHandler(async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
});

export const getPostbyId = aysncHandler(async (req, res) => {
  try {
    const postbyid = await Post.findById(req.params.id)
      .populate("author", "username")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "User",
        },
      });
    res.status(200).json(postbyid);
  } catch (error) {
    console.log(error);
  }
});

export const deletePost = aysncHandler(async (req, res) => {
  try {
    const Post = await Post.findById(req.params.id);

    await Promise.all(
      Post.images.map(async (image) => {
        await File.findByIdAndDelete(image._id);
      })
    );

    await Post.remove();
  } catch (error) {
    console.log(error);
  }
});
