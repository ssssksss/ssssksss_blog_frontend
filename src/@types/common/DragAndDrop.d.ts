import { ChangeEvent } from "react";

declare interface dragAndDropProps {
  isDragging: boolean;
  onDragEnter: (e: React.DragEvent<HTMLLabelElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLLabelElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLLabelElement>) => void;
  onDropOrInputEvent: (
        e: ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLElement>,
    ) => void;
};