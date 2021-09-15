exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      { title: 'First Post', content: 'This is my first post here' },
      { title: 'Second Post', content: 'This is my second post' }
    ]
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  //Create post in db
  res.status(201).json({
    message: 'Post created successfully!',
    post: { id: new Date().toISOString(), title: title, content: content }
  });
};
