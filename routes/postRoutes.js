const express = require('express');
const auth = require('../middleware/authMiddleware');
const { getPosts, createPost, updatePost, deletePost } = require('../controllers/postController');

const router = express.Router();

router.use(auth); // All below routes are protected

router.get('/', getPosts);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
