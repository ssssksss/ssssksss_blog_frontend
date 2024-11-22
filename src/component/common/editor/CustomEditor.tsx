import { useCursor } from "@hooks/useCursor";
import { useDragAndDropBlob } from "@hooks/useDragAndDropBlob";
import { useUndoRedo } from "@hooks/useUndoRedo";
import "@styles/customEditor.css";
import MarkdownPreview from "@utils/editor/MarkdownPreview";
import { convertToObjectUrl } from "@utils/function/convertToObjectUrl";
import { ClipboardEvent, useEffect, useRef, useState } from "react";

interface ICustomEditor {
  handleContentChange: (content: string) => void;
  handleFileChange?: (url: string, file: File) => void;
  defaultValue?: string;
}

const CustomEditor = (props: ICustomEditor) => {
  const [content, setContent] = useState(props.defaultValue || "");
  const [mode, setMode] = useState("all");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const {moveCursor} = useCursor({ref: textareaRef});
  const {handleRedoSave} = useUndoRedo({
    content: content,
    changeContent: (value: string) => {
      setContent(value);
    },
  });

  // 텍스트가 변경되면 뒤로가기 저장 후 텍스트값 변경
  const handleTextareaChange = (value: string) => {
    handleRedoSave();
    setContent(value);
  };

  // 에디터 외부에서 내용을 사용함으로 변경이 되면 외부로 content를 보냄
  useEffect(() => {
    props.handleContentChange(content);
  }, [content]);

  // 붙여넣기하면 과정을 거쳐 최종으로 나온 텍스트 만큼 커서의 위치를 이동시킴
  const insertContentAtCursor = (textToInsert: string) => {
    const startPosition = textareaRef.current?.selectionStart || 0;
    const _content = textareaRef.current!.value;

    const newContent =
      _content.substring(0, startPosition) +
      textToInsert +
      _content.substring(startPosition, _content.length);

    setContent(newContent);
    moveCursor(startPosition + textToInsert.length);
  };

  // 이미지 업로드시 이미지 url 처리하는 함수
  const fakeImageUpload = ({file, url}: {file: File; url: string}) => {
    if (props.handleFileChange) {
      const markdownImage = `![image](${url})`;
      insertContentAtCursor(markdownImage);
      props.handleFileChange(url, file);
    }
  };

  const {onDragEnter, onDragLeave, onDragOver, onDropOrInputEvent} =
    useDragAndDropBlob({
      fakeImageUpload,
    });

  // 붙여넣기 처리 함수
  const onPasteHandler = async (event: ClipboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    handleRedoSave();
    // 붙여넣기를 했을 때 드래그 된 요소가 있다면 드래그 된 요소는 제거해주고 붙여넣기를 해주는 로직
    const start = textareaRef.current!.selectionStart;
    const end = textareaRef.current!.selectionEnd;
    const currentValue = textareaRef.current!.value;
    const newValue = currentValue.slice(0, start) + currentValue.slice(end);
    textareaRef.current!.value = newValue;
    textareaRef.current!.selectionStart = start;

    if (textareaRef.current == null) return;
    const item = event.clipboardData.items[0];
    if (item.type.indexOf("image") === 0) {
      const file = item.getAsFile();
      if (file) await handleFileUpload(file);
    } else {
      const paste = event.clipboardData.getData("text");
      insertContentAtCursor(paste);
    }
  };

  // 이미지 blob 업로드 처리 함수
  const handleFileUpload = async (file: File) => {
    if (props.handleFileChange) {
      const url = await convertToObjectUrl(file);
      const markdownImage = `![image](${url})`;
      insertContentAtCursor(markdownImage);
      props.handleFileChange(url, file);
    }
  };

  return (
    <div
      className={`grid h-[calc(100vh-12rem)] w-full max-w-[75rem] gap-x-2 ${mode == "markdown" ? "" : mode == "preview" ? "" : "grid-cols-[1fr_1fr]"}`}
    >
      {/* 내용작성 */}
      <article
        className={`flex h-full w-full min-w-full max-w-full flex-col gap-y-2 overflow-scroll ${mode == "preview" && "hidden"}`}
      >
        <h3
          className="rounded-[1rem] bg-primary-20 py-2 text-2xl font-bold default-flex"
          onClick={() => setMode(mode === "all" ? "markdown" : "all")}
        >
          내용작성
        </h3>
        <textarea
          id="editor"
          placeholder="여기에 마크다운을 입력하세요..."
          className={
            "h-full w-full resize-none overflow-scroll rounded-2xl border-2 border-primary-80 p-2"
          }
          onChange={(e) => handleTextareaChange(e.target.value)}
          value={content}
          onPaste={onPasteHandler}
          ref={textareaRef}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDropOrInputEvent}
        />
      </article>
      {/* 미리보기 */}
      <article
        className={`flex h-full w-full min-w-full max-w-full flex-col gap-y-2 overflow-scroll ${mode == "markdown" && "hidden"}`}
      >
        <h3
          className="rounded-[1rem] bg-primary-20 py-2 text-2xl font-bold default-flex"
          onClick={() => setMode(mode === "all" ? "preview" : "all")}
        >
          미리보기
        </h3>
        <MarkdownPreview
          content={content}
          className={
            "h-full max-h-full w-full overflow-scroll break-all rounded-2xl border-2 border-primary-80 p-2"
          }
        />
      </article>
    </div>
  );
};

export default CustomEditor;
