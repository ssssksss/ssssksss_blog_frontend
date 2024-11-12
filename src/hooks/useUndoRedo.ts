import { useEffect, useState } from "react";

/**
 *  사용예시
 const { handleRedoSave } = useUndoRedo({   
    content: content,
    changeContent: (value: string) => {setContent(value);}
  });

  handleRedoSave();
 */

interface IUseUndoRedo {
  content: string;
  changeContent: (value: string) => void;
}
export const useUndoRedo = (props: IUseUndoRedo) => {
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const prevState = undoStack.pop(); // Get the last state
      if (prevState) {
        setRedoStack((prevStack) => [...prevStack, props.content]); // Push current state to redo stack
        props.changeContent(prevState);
      }
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack.pop(); // Get the last state from redo stack
      if (nextState) {
        setUndoStack((prevStack) => [...prevStack, props.content]); // Push current state to undo stack
        props.changeContent(nextState);
      }
    }
  };

  const handleRedoSave = () => {
    setUndoStack((prevStack) => [...prevStack, props.content]);
    setRedoStack([]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        handleUndo();
      } else if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        handleRedo();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [undoStack, redoStack, props.content]);

  return {
    handleRedoSave,
  };
};
