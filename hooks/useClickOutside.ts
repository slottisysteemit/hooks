import { useEffect, useRef } from "react";

export function useClickOutside(onClickOutside: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!e.target) return;

      const targetNode = e.target as Node;

      if (ref.current && !ref.current.contains(targetNode)) {
        onClickOutside();
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return ref;
}
