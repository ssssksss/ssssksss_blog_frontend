import { useCallback, useState } from "react";

interface UseDragAndDropProps<T> {
  handler: (e: React.DragEvent<HTMLElement>, data: T) => void;
}

export const useDragAndDrop = <T>(props: UseDragAndDropProps<T>) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDragEnter = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDrop = async (e: React.DragEvent<HTMLElement>, data: T) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    props.handler(e, data);
  };

  return {
    isDragging,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
  };
};
