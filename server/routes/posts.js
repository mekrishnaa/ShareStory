import express from 'express';
import {getPosts,createPost,updatePost,deletePost,likePost} from '../controllers/posts.js'

const router = express.Router();

import auth from '../middleware/auth.js';

//http://localhost:5000/posts

router.get('/',getPosts);
router.post('/',auth,createPost);   // Here auth is the middleware. First auth is called the the next function will call the createPost method.
router.patch('/:id',auth,updatePost);
router.delete('/:id',auth,deletePost);
router.patch('/:id/likePost',auth,likePost)

export default router;
//module.exports = router;