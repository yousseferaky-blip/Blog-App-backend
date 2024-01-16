const PostSchema = require("../models/Post");

exports.CreatePost = async (req, res) => {
  try {
    const { title, desc, categories, username, userId } = req.body;
    const photo = req.file ? req.file.filename : null;

    const newPost = await PostSchema.create({
      title,
      desc,
      username,
      userId,
      categories,
      photo,
    });
    await newPost.save();
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.UpdatePost = async (req, res) => {
  try {
    const updatedPost = await PostSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.DeletePost = async (req, res) => {
  try {
    const DeletePost = await PostSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted Successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.GetPost = async (req, res) => {
  try {
    const post = await PostSchema.findById(req.params.id);
    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.GetPosts = async (req, res) => {
  const query = req.query;
  try {
    const searchFilter = {
      title: { $regex: query.search, $options: "i" },
    };
    const posts = await PostSchema.find(query.search ? searchFilter : null);
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.UserPost = async (req, res) => {
  try {
    const posts = await PostSchema.find({ userId: req.params.userId });
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json(err);
  }
};
