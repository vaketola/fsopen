import { useState, useEffect, useRef, useContext } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import NotificationContext from "./NotificationContext";
import loginService from "./services/login";
import "./styles.css";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getBlogs, createBlog, deleteBlog, updateBlog } from "./requests";

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [blogs, setBlogs] = useState([]);

  const [notification, dispatch] = useContext(NotificationContext);
  const newBlogMutation = useMutation({ mutationFn: createBlog });
  const deleteBlogMutation = useMutation({ mutationFn: deleteBlog });
  const updateBlogMutation = useMutation({ mutationFn: updateBlog });

  const togglableFormRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      // I know this is not great
      const token = `Bearer ${user.token}`;
      window.localStorage.setItem(
        "loggedBlogAppUserToken",
        JSON.stringify(token),
      );

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch({
        type: "ON",
        payload: { message: "wrong login credentials", type: "error" },
      });
      setTimeout(() => {
        dispatch({ type: "OFF" });
      }, 5000);
    }
  };

  const handleLike = (blogId, blogObject) => {
    try {
      updateBlogMutation.mutate(blogId, blogObject);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      deleteBlogMutation.mutate(blogId);
      setBlogs(blogs.filter((b) => b.id !== blogId));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleCreate = async (blogObject) => {
    if (!blogObject.title || !blogObject.url) {
      dispatch({
        type: "ON",
        payload: { message: "title and url are required", type: "error" },
      });
      setTimeout(() => {
        dispatch({ type: "OFF" });
      }, 5000);
      return;
    }

    try {
      newBlogMutation.mutate(blogObject);
      setBlogs(blogs.concat(blogObject));

      togglableFormRef.current.toggleVisibility();

      dispatch({
        type: "ON",
        payload: {
          message: `a new blog ${blogObject.title} by ${blogObject.author} was created`,
          type: "success",
        },
      });
      setTimeout(() => {
        dispatch({ type: "OFF" });
      }, 5000);
    } catch (exception) {
      // console.log(exception);
      dispatch({
        type: "ON",
        payload: { message: "failed to create blog", type: "error" },
      });
      setTimeout(() => {
        dispatch({ type: "OFF" });
      }, 5000);
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  useEffect(() => {
    if (data) setBlogs(data);
  }, [data]);

  if (isLoading) return <div>loading blogs...</div>;
  if (isError) return <div>server error</div>;

  if (user === null) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username{" "}
            <input
              type="text"
              id="username"
              value={username}
              name="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password{" "}
            <input
              type="text"
              id="password"
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button>login</button>
        </form>
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>{user.name} logged in</div>
      <button
        onClick={() => {
          window.localStorage.removeItem("loggedBlogAppUser");
          window.localStorage.removeItem("loggedBlogAppUserToken");
          setUser(null);
        }}
      >
        logout
      </button>
      <Togglable buttonLabel="create new" ref={togglableFormRef}>
        <BlogForm handleCreate={handleCreate} />
      </Togglable>
      <div>
        {blogs
          .slice()
          .sort((x, y) => y.likes - x.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleLike={handleLike}
              handleDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
