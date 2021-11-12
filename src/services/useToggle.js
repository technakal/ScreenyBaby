import { createSignal } from "solid-js";

const useToggle = (initialState) => {
  const [signal, setSignal] = createSignal(initialState);

  const toggle = (toggleValue) => {
    if (typeof toggleValue === "boolean") {
      return setSignal(toggleValue);
    }
    return setSignal((prev) => !prev);
  };

  return [signal, toggle];
};

export default useToggle;
