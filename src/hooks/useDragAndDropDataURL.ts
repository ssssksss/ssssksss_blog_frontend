import { ChangeEvent, useCallback, useState } from "react";

interface UseDragAndDropProps {
  fakeImageUpload: ({ file, url }: { file: File; url: string }) => void;
}
export const useDragAndDropDataURL = ({
  fakeImageUpload,
}: UseDragAndDropProps) => {
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
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  }, []);

  const onDropOrInputEvent = async (
    e: ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLElement>,
  ) => {
    let file;
    // input 태그를 이용해서 파일을 받아온 경우
    if ("target" in e && e.target instanceof HTMLInputElement) {
      file = e.target.files?.[0];
    }

    // drag and drop을 이용해서 파일을 받아온 경우
    if ("dataTransfer" in e) {
      e.preventDefault();
      e.stopPropagation();
      file = e.dataTransfer.files?.[0];
    }
    if (!file) {
      alert("파일이 없습니다!");
      return;
    }
    const url = await readFile(file); // 파일 변환

    // 파일과 변형 url 반환
    fakeImageUpload({
      file,
      url,
    });

    // input 태그에 똑같은 이미지를 넣을 경우 안들어가는 문제를 해결
    if ("target" in e && e.target instanceof HTMLInputElement) {
      e.target.value = "";
    }
    setIsDragging(false);
  };

  const readFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  };

  return {
    isDragging,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDropOrInputEvent,
  };
};
