const Post = require("../models/post.model");
const User = require("../models/user.model");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    const postsWithWritter = await Promise.all(
      posts.map(async (post) => {
        post.writter = await User.findById(post.writter);
        post.writter.password = undefined;
        return post;
      })
    );
    res.status(200).json({
      success: true,
      message: "Successfully retrieved all posts",
      data: postsWithWritter,
    });
    console.log("posts:", postsWithWritter);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.query.id).populate(
      "writter",
      "username"
    );
    res.status(200).json({
      success: true,
      message: "Successfully retrieved post",
      data: post,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  if (!req.body.content) {
    return res.status(400).json({ message: "Content required" });
  }
  try {
    const post = new Post({
      writter: req.user._id,
      content: req.body.content,
    });
    await post.save();

    post.writter = req.user;
    post.writter.password = undefined;

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
