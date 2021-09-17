import { children } from "solid-js";

const Button = (props) => (
  <button type={props.type ?? "button"} onClick={props.onClick} {...props}>
    {children(() => props.children)}
  </button>
);

export default Button;
