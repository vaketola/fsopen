import { useState, useEffect, useRef, useContext } from "react";
import { Blog, IndividualBlog } from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { UserInformation, IndividualUser } from "./components/UserInformation";
import Notification from "./components/Notification";
import NotificationContext from "./NotificationContext";
import UserContext from "./UserContext";
import loginService from "./services/login";
import "./styles.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
  getUsers,
} from "./requests";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [notification, dispatch] = useContext(NotificationContext);
  const [user, userDispatch] = useContext(UserContext);

  const togglableFormRef = useRef();

  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  const { data: userData } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      refetch();
    },
  });
  const updateBlogMutation = useMutation({ mutationFn: updateBlog });
  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      refetch();
    },
  });

  const padding = { padding: 5 };

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

      userDispatch({ type: "LOGIN", payload: user });

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

  const handleLike = (blogObject) => {
    try {
      updateBlogMutation.mutate(blogObject);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      deleteBlogMutation.mutate(blogId);
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
    } catch (error) {
      console.error("Error creating blog:", error);
      dispatch({
        type: "ON",
        payload: {
          message: "failed to create blog",
          type: "error",
        },
      });
      setTimeout(() => {
        dispatch({ type: "OFF" });
      }, 5000);
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON);
      if (newUser) userDispatch({ type: "LOGIN", payload: newUser });
    }
  }, []);

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
    <Router>
      <div>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
      </div>
      <h2>blogs</h2>
      <Notification />
      <div>{user.name} logged in</div>
      <button
        onClick={() => {
          window.localStorage.removeItem("loggedBlogAppUser");
          window.localStorage.removeItem("loggedBlogAppUserToken");
          userDispatch({ type: "LOGOUT" });
        }}
      >
        logout
      </button>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Togglable buttonLabel="create new" ref={togglableFormRef}>
                <BlogForm handleCreate={handleCreate} />
              </Togglable>
              <div>
                {data
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
            </>
          }
        />
        <Route path="/users" element={<UserInformation />} />
        <Route
          path="/users/:id"
          element={<IndividualUser users={userData} />}
        />
        <Route
          path="/blogs/:id"
          element={<IndividualBlog blogs={data} handleLike={handleLike} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
