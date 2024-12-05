import axios from "axios";

const baseUrl = "/api/blogs";

export const getBlogs = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export const createBlog = (newBlog) => {
  axios.post(baseUrl, newBlog).then((response) => response.data);
};
