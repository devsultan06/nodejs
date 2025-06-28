import express from "express";

const router = express.Router();

let posts = [
  { id: 1, title: "Post 1", content: "This is the first post" },
  { id: 2, title: "Post 2", content: "This is the second post" },
];

router.get("/", (req, res) => {
  console.log(req.query);
  const { limit } = req.query;
  if (limit) {
    const limitedPosts = posts.slice(0, parseInt(limit, 10));
    return res.status(200).json(limitedPosts);
  }
  res.status(200).json(posts);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const postId = parseInt(id, 10);
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    const error = new Error(`No post found with id ${id}`);
    error.status = 404;
    return next(error);
  }

  res.status(200).json(post);
});

router.post("/", (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    const error = new Error("Title and content are required");
    error.status = 400;
    return next(error);
  }
  const newPost = {
    id: posts.length + 1,
    title,
    content,
  };
  posts.push(newPost);
  res.status(201).json(posts);
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const postId = parseInt(id, 10);
  const postIndex = posts.findIndex((p) => p.id === postId);
  if (postIndex === -1) {
    const error = new Error(`No post found with id ${id}`);
    error.status = 404;
    return next(error);
  }

  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send({
      error: "Bad Request",
      message: "Title and content are required",
    });
  }

  posts[postIndex] = { id: postId, title, content };
  res.status(200).json(posts[postIndex]);
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  const postId = parseInt(id, 10);
  const postIndex = posts.findIndex((p) => p.id === postId);
  if (postIndex === -1) {
    const error = new Error(`No post found with id ${id}`);
    error.status = 404;
    return next(error);
  }

  posts.splice(postIndex, 1);
  res.status(204).send();
});

export default router;
