import { useState } from "react";

export const useToggle = (initial) => {
  const [show, setShow] = useState(!!initial || false);

  const toggle = () => setShow((prev) => !prev);
  const open = () => setShow(true);
  const close = () => setShow(false);

  return { show, toggle, open, close };
};
