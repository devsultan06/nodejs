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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const postId = parseInt(id, 10);
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    return res.status(404).send({
      error: "Post not found",
      message: `No post found with id ${id}`,
    });
  }

  res.status(200).json(post);
});

router.post("/", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send({
      error: "Bad Request",
      message: "Title and content are required",
    });
  }
  const newPost = {
    id: posts.length + 1,
    title,
    content,
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

export default router;
