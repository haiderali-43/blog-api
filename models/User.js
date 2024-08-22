import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilepic: {
    type: String,
    public_id: String,
  },
  bio: {
    type: String,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      Ref: "Post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      Ref: "Follow",
    },
  ],
},
{
  timestamps: true,
});


const User = mongoose.model("User", userSchema);
export default User;