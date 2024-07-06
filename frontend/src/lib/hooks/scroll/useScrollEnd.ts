import { RefObject, useEffect } from "react";

const useScrollEnd = (ref: RefObject<HTMLElement>) => {
  const scrollToBottom = () => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth", // Changed from 'instant' to 'smooth' for a smoother scrolling effect
        block: "end", // Ensures the bottom of the element is aligned to the viewport
      });
    }
  };

  return scrollToBottom;
};
export default useScrollEnd;
