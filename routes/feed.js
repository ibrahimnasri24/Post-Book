const express = require('express');
const feedCotroller = require('../controllers/feed');
const router = express.Router();

router.get('/posts', feedCotroller.getPosts);

router.get('/post', feedCotroller.createPost);

module.exports = router;
