import Post from "../models/Post.js";
import User from "../models/User.js";

export const getUserProfile = asynchandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.render("login", {
        title: "Login",
        user: req.user,
        error: "User not found",
      });
    }

    //fetch posts
    const posts = await Post.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    


  } catch (error) {
    console.log(error);
  }
});
