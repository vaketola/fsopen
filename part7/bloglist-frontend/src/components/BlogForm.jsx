import { useState } from "react";
import { Table, Form } from "react-bootstrap";
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
      <Form onSubmit={createBlog}>
        <Table>
          <tbody>
            <tr>
              <td>
                <Form.Label>title:</Form.Label>
              </td>
              <td>
                <Form.Control
                  type="text"
                  id="title"
                  placeholder="title"
                  value={title}
                  name="title"
                  onChange={({ target }) => setTitle(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>author:</Form.Label>
              </td>
              <td>
                <Form.Control
                  type="text"
                  id="author"
                  placeholder="name"
                  value={author}
                  name="author"
                  onChange={({ target }) => setAuthor(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>url:</Form.Label>
              </td>
              <td>
                <Form.Control
                  type="text"
                  id="url"
                  placeholder="url"
                  value={url}
                  name="url"
                  onChange={({ target }) => setUrl(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <Button id="createButton" type="submit" variant="primary">
                  Create
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Form>
    </>
  );
};

export default BlogForm;
