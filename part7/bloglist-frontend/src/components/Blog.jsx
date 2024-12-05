import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";

export const IndividualBlog = ({ blogs, handleLike, handleComment }) => {
  const id = useParams().id;
  const blog = blogs.find((b) => b.id === id);

  const [likes, setLikes] = useState(blog.likes);
  const [comment, setComment] = useState("");

  const [comments, setComments] = useState(blog.comments || []);

  const onLike = () => {
    const newBlog = {
      ...blog,
      likes: likes + 1,
    };
    handleLike(newBlog);
    setLikes(likes + 1);
  };

  const addComment = (event) => {
    event.preventDefault();
    setComments((state) => [...state, comment]);
    handleComment(blog.id, comment);
    setComment("");
  };

  if (!blog) return null;

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {likes} likes <button onClick={onLike}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button id="add comment">add comment</button>
      </form>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export const Blog = ({ blog, user, handleDelete }) => {
  const onDelete = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}?`)) {
      handleDelete(blog.id);
    }
  };

  return (
    <td className="blog">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>{" "}
      {blog.user.username === user.username ? (
        <button onClick={onDelete}>remove</button>
      ) : null}
    </td>
  );
};

Blog.displayName = "Blog";

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
