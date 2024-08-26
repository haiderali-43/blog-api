import Comment from '../models/commentModel.js';
import asyncHandler from 'express-async-handler';
import Post from '../models/Post.js';

// @desc    Create new comment
// @route   POST /api/comments

export const createComment = asyncHandler(async (req, res) => {
    const { comment} = req.body;
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }
    
    const newComment = new Comment({
        comment,
        postId,
        author: req.user._id,
    });
    
    const createdComment = await newComment.save();
    
    res.status(201).json(createdComment);

    post.comment.push(createdComment._id);



    }
);



// @desc    Get all comments