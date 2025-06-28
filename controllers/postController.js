// @desc Get all posts with optional limit
// @route GET /api/posts
// @access Public

let posts = [
  { id: 1, title: "Post 1", content: "This is the first post" },
  { id: 2, title: "Post 2", content: "This is the second post" },
];

export const getPosts = (req, res) => {
  console.log(req.query);
  const { limit } = req.query;
  if (limit) {
    const limitedPosts = posts.slice(0, parseInt(limit, 10));
    return res.status(200).json(limitedPosts);
  }
  res.status(200).json(posts);
};

// @desc Get a single post by ID
// @route GET /api/posts/:id
export const getPostById = (req, res, next) => {
  const { id } = req.params;
  const postId = parseInt(id, 10);
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    const error = new Error(`No post found with id ${id}`);
    error.status = 404;
    return next(error);
  }

  res.status(200).json(post);
};

// @desc Create a new post
// @route POST /api/posts
export const createPost = (req, res, next) => {
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
};

// @desc Update a post by ID
// @route PUT /api/posts/:id
export const updatePost = (req, res, next) => {
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
    const error = new Error("Title and content are required");
    error.status = 400;
    return next(error);
  }

  posts[postIndex] = { id: postId, title, content };
  res.status(200).json(posts[postIndex]);
};

// @desc Delete a post by ID
// @route DELETE /api/posts/:id
export const deletePost = (req, res, next) => {
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
};
