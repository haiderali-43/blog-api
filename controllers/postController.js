import Post from "../models/Post.js";

export const renderPostform = (req, res) => {
  res.render("newPost", {
    title: "New Post",
    user: req.user,
  });
};

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Post({
      title,
      content,
      author: req.user._id,
    });
    await newPost.save();
    res.redirect("/posts");
  } catch (error) {
    console.log(error);
  }
};

export const renderPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.render("posts", {
      title: "Posts",
      user: req.user,
      posts,
    });
  } catch (error) {
    console.log(error);
  }
};
