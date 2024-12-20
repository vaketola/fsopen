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
  addComment,
} from "./requests";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Table, Form } from "react-bootstrap";
import styled from "styled-components";

const Button = styled.button`
  background: LightGray;
  border-radius: 10px;
  margin: 0.25em;
  padding: 0.25em 0.5em;
`;
const Button2 = styled.button`
  background: White;
  border-radius: 10px;
  padding: 0.1em 0.25em;
`;

const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
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
  const addCommentMutation = useMutation({ mutationFn: addComment });

  const padding = { padding: 5 };

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

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

      notificationDispatch({
        type: "ON",
        payload: {
          message: `welcome ${user.name}`,
          type: "success",
        },
      });
      setTimeout(() => {
        notificationDispatch({ type: "OFF" });
      }, 5000);
    } catch (exception) {
      notificationDispatch({
        type: "ON",
        payload: { message: "wrong login credentials", type: "warning" },
      });
      setTimeout(() => {
        notificationDispatch({ type: "OFF" });
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

  const handleComment = (blogId, comment) => {
    try {
      addCommentMutation.mutate({ blogId, comment });
    } catch (error) {
      console.error("Error adding comment:", error);
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
      notificationDispatch({
        type: "ON",
        payload: { message: "title and url are required", type: "warning" },
      });
      setTimeout(() => {
        notificationDispatch({ type: "OFF" });
      }, 5000);
      return;
    }

    try {
      newBlogMutation.mutate(blogObject);

      togglableFormRef.current.toggleVisibility();

      notificationDispatch({
        type: "ON",
        payload: {
          message: `a new blog ${blogObject.title} by ${blogObject.author} was created`,
          type: "success",
        },
      });
      setTimeout(() => {
        notificationDispatch({ type: "OFF" });
      }, 5000);
    } catch (error) {
      console.error("Error creating blog:", error);
      notificationDispatch({
        type: "ON",
        payload: {
          message: "failed to create blog",
          type: "warning",
        },
      });
      setTimeout(() => {
        notificationDispatch({ type: "OFF" });
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
      <div className="container">
        <Notification />
        <h2>blogs</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control type="text" name="username" />
          </Form.Group>
          <Form.Group>
            <Form.Label>password:</Form.Label>
            <Form.Control type="text" name="password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form>
      </div>
    );
  }
  return (
    <div className="container">
      <Router>
        <Notification />
        <div style={{ backgroundColor: "lightgray", padding: "5px" }}>
          <Link style={padding} to="/">
            blogs
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
          {user.name} logged in{" "}
          <Button2
            onClick={() => {
              window.localStorage.removeItem("loggedBlogAppUser");
              window.localStorage.removeItem("loggedBlogAppUserToken");
              userDispatch({ type: "LOGOUT" });
            }}
          >
            logout
          </Button2>
        </div>
        <h2>blogs</h2>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Togglable buttonLabel="create new" ref={togglableFormRef}>
                  <BlogForm handleCreate={handleCreate} />
                </Togglable>
                <div>
                  <Table striped>
                    <tbody>
                      {data
                        .slice()
                        .sort((x, y) => y.likes - x.likes)
                        .map((blog) => (
                          <tr key={blog.id}>
                            <Blog
                              key={blog.id}
                              blog={blog}
                              user={user}
                              handleDelete={handleDelete}
                            />
                          </tr>
                        ))}
                    </tbody>
                  </Table>
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
            element={
              <IndividualBlog
                blogs={data}
                handleLike={handleLike}
                handleComment={handleComment}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
