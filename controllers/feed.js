exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: '1',
        title: 'First Post',
        content: 'This is my first post here',
        imageUrl: 'images/bulldozer.jpeg',
        creator: {
          name: 'Ibrahim'
        },
        createdAt: new Date()
      },
      {
        _id: '2',
        title: 'Second Post',
        content: 'This is my second post here',
        imageUrl: 'images/bulldozer.jpeg',
        creator: {
          name: 'Ibrahim'
        },
        createdAt: new Date()
      }
    ]
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  //Create post in db
  console.log('Post created successfully!');
  res.status(201).json({
    message: 'Post created successfully!',
    post: {
      _id: new Date().toISOString(),
      title: title,
      content: content,
      creator: { name: 'Ibrahim' },
      createdAt: new Date()
    }
  });
};
