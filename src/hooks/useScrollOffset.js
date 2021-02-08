import { useState, useEffect } from "react";

export const useScrollOffset = (offset) => {
  const [isBelow, setIsBelow] = useState(false);

  useEffect(() => {
    const scrollEvent = () => setIsBelow(window.pageYOffset > offset);

    window.addEventListener("scroll", scrollEvent);

    return () => window.removeEventListener("scroll", scrollEvent);
  }, [offset]);

  return isBelow;
};
