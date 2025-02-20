import { useCallback, useEffect } from "react";

const useLockScroll = (lock) => {
  const preventScroll = useCallback((e) => {
    e.preventDefault();
    return false;
  }, []);

  useEffect(() => {
    if (lock) {
      document.body.style.overflowY = "scroll";
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      window.addEventListener("keydown", preventScroll, { passive: false });
    } else {
      window.removeEventListener("wheel", preventScroll, { passive: false });
      window.removeEventListener("touchmove", preventScroll, {
        passive: false,
      });
      window.removeEventListener("keydown", preventScroll, { passive: false });
    }

    return () => {
      window.removeEventListener("wheel", preventScroll, { passive: false });
      window.removeEventListener("touchmove", preventScroll, {
        passive: false,
      });
      window.removeEventListener("keydown", preventScroll, { passive: false });
    };
  }, [lock, preventScroll]);
};

export default useLockScroll;
