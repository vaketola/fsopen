import { useState, forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";

const Button = styled.button`
  background: LightGray;
  border-radius: 10px;
  margin: 0.1em;
  padding: 0 0.5em;
`;

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
