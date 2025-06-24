const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
  const posts = await Post.find({ user: req.userId });
  res.json(posts);
};

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  const post = await Post.create({ title, content, user: req.userId });
  res.status(201).json(post);
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findOneAndUpdate(
    { _id: id, user: req.userId },
    req.body,
    { new: true }
  );
  res.json(post);
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  await Post.findOneAndDelete({ _id: id, user: req.userId });
  res.json({ msg: 'Deleted' });
};
