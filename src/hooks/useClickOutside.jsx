import { useEffect } from "react";

const useClickOutside = (refs, callback) => {
  useEffect(() => {
    const handleClickOutSide = (e) => {
      const isInsideOrButton = refs.some(
        (ref) => ref?.current && ref.current.contains(e.target)
      );
      if (!isInsideOrButton) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [refs, callback]);
};

export default useClickOutside;
