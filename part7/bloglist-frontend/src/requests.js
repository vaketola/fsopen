import axios from "axios";

const baseUrl = "/api/blogs";

export const getBlogs = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export const createBlog = (newBlog) => {
  const token = window.localStorage.getItem("loggedBlogAppUserToken");
  const config = { headers: { Authorization: token } };
  axios.post(baseUrl, newBlog, config).then((response) => response.data);
};

export const deleteBlog = (blogId) => {
  const token = window.localStorage.getItem("loggedBlogAppUserToken");
  const config = { headers: { Authorization: token } };
  axios
    .delete(`${baseUrl}/${blogId}`, config)
    .then((response) => response.data);
};

export const updateBlog = (newBlog) => {
  axios.put(`${baseUrl}/${newBlog.id}`, newBlog).then((response) => response.data);
};
