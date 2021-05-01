import { useEffect, useState } from "react";

function useDebounce(text, delay) {
  const [debounce, setDebounce] = useState(text);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(text);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [text, delay]);
  return debounce;
}

export default useDebounce;
