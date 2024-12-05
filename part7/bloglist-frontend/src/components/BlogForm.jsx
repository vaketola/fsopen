import { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  background: LightGray;
  border-radius: 10px;
  margin: 0.1em;
  padding: 0 0.5em;
`;

const BlogForm = ({ handleCreate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createBlog = (event) => {
    event.preventDefault();
    handleCreate({ title: title, author: author, url: url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title:{" "}
          <input
            type="text"
            id="title"
            placeholder="title"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{" "}
          <input
            type="text"
            id="author"
            placeholder="author"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{" "}
          <input
            type="text"
            id="url"
            placeholder="url"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button id="createButton">create</Button>
      </form>
    </>
  );
};

export default BlogForm;
