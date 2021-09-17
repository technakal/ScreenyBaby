import { children } from "solid-js";

const Label = (props) => {
  const c = children(() => props.children);
  return (
    <label style={{ "font-weight": 700 }} {...props}>
      {c()}
    </label>
  );
};

export default Label;
