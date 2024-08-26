import express from 'express';
import { isAuthenicated } from '../middlewares/auth.js';
import { createComment } from '../controllers/commentController.js';

const commentRouter = express.Router();

commentRouter.post('/post/:id/comment', isAuthenicated, createComment);


export default commentRouter;