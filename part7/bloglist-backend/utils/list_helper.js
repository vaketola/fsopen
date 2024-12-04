const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const blogsWithLikes = blogs.filter((blog) => blog.likes > 0);
  const total = blogsWithLikes.reduce((total, blog) => total + blog.likes, 0);
  return total;
};

const favoriteBlog = (blogs) => {
  if (!blogs[0]) return null;

  const compareLikes = (oldBlog, newBlog) => {
    if (!oldBlog.likes) return newBlog;
    if (newBlog.likes > oldBlog.likes) {
      return newBlog;
    } else {
      return oldBlog;
    }
  };

  const favorite = blogs.reduce(
    (currentFavorite, blog) => compareLikes(currentFavorite, blog),
    blogs[0],
  );

  return favorite;
};

const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => blog.author).sort();
  if (authors.length === 0) return null;

  const state = {
    currentAuthor: authors[0],
    currentBlogs: 0,
    maxAuthor: authors[0],
    maxBlogs: 0,
  };

  const compareAuthors = (state, author) => {
    if (state.currentAuthor === author) {
      state.currentBlogs += 1;
    } else {
      if (state.currentBlogs > state.maxBlogs) {
        state.maxAuthor = state.currentAuthor;
        state.maxBlogs = state.currentBlogs;
      }
      state.currentAuthor = author;
      state.currentBlogs = 1;
    }
    return state;
  };

  authors.reduce(compareAuthors, state);

  if (state.currentBlogs > state.maxBlogs) {
    state.maxAuthor = state.currentAuthor;
    state.maxBlogs = state.currentBlogs;
  }

  if (!state.maxAuthor) state.maxAuthor = null;

  return { author: state.maxAuthor, blogs: state.maxBlogs };
};

const mostLikes = (blogs) => {
  const authorLikes = blogs
    .map((blog) => ({ author: blog.author, likes: blog.likes }))
    .sort();
  if (authorLikes.length === 0) return null;

  const state = {
    currentAuthor: authorLikes[0].author,
    currentLikes: 0,
    maxAuthor: authorLikes[0].author,
    maxLikes: 0,
  };

  const compareAuthorLikes = (state, authorLike) => {
    if (state.currentAuthor === authorLike.author) {
      state.currentLikes += authorLike.likes;
    } else {
      if (state.currentLikes > state.maxLikes) {
        state.maxAuthor = state.currentAuthor;
        state.maxLikes = state.currentLikes;
      }
      state.currentAuthor = authorLike.author;
      state.currentLikes = authorLike.likes;
    }
    return state;
  };

  // console.log(state)
  authorLikes.reduce(compareAuthorLikes, state);

  if (state.currentLikes > state.maxLikes) {
    state.maxAuthor = state.currentAuthor;
    state.maxLikes = state.currentLikes;
  }

  if (!state.maxAuthor) state.maxAuthor = null;
  if (!state.maxLikes) state.maxLikes = 0;

  return { author: state.maxAuthor, likes: state.maxLikes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
