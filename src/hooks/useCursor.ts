import { useEffect, useState } from "react";

interface IUseCursor<T extends HTMLElement> {
  ref: React.RefObject<T>;
}

export const useCursor = <T extends HTMLInputElement | HTMLTextAreaElement>({
  ref,
}: IUseCursor<T>) => {
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    if (ref.current && cursor != 0) {
      ref.current.setSelectionRange(cursor, cursor);
      setCursor(0);
    }
  }, [cursor, ref]);

  const moveCursor = (position: number) => {
    setCursor(position);
  };

  return { moveCursor };
};
