import express from 'express';
import { createComment, getCommentByID } from '../controller/comment.js';

const router = express.Router();

router.route('/:id/comment').post(createComment)
router.route('/:id/comment').get(getCommentByID)

export default router;