import { useCursor } from "@hooks/useCursor";
import { useDragAndDropBlob } from "@hooks/useDragAndDropBlob";
import useFetchCSR from "@hooks/useFetchCSR";
import { useUndoRedo } from "@hooks/useUndoRedo";
import "@styles/customEditor.css";
import MarkdownPreview from "@utils/editor/MarkdownPreview";
import { convertToObjectUrl } from "@utils/function/convertToObjectUrl";
import { AWSS3Prefix } from "@utils/variables/s3url";
import React, { ClipboardEvent, useEffect, useRef, useState } from "react";
import BasicTextarea from "../textarea/BasicTextarea";

interface ICustomEditor {
  handleContentChange: (content: string) => void;
  addS3ImageUrl?: (keyPath: string) => void;
  defaultValue?: string;
  isPreview?: boolean;
}

const CustomEditor = (props: ICustomEditor) => {
  const [content, setContent] = useState(props.defaultValue || "");
  const [mode, setMode] = useState("all");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { moveCursor } = useCursor({ ref: textareaRef });
  const fetchCSR = useFetchCSR();
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
    if (props.addS3ImageUrl) {
      const markdownImage = `![image](${url})`;

      // 에디터 커서 위치에 임시 이미지 삽입
      insertContentAtCursor(markdownImage);

      // 업로드 처리 및 content 수정
      uploadImageAndReplaceContent({
        file,
        url,
        setContent: setContent,
      });
    }
  };

  const uploadImageAndReplaceContent = async ({
    file,
    url,
    setContent,
  }: {
    file: File;
    url: string;
    setContent?: (value: (prev: string) => string) => void;
    }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("directory", "blog2/basic");

    const result = await fetchCSR.requestWithHandler({
      url: "/api/image",
      method: "POST",
      formData: formData,
      showLoading: false,
    });

    if (result === undefined) {
      // 업로드 실패: 기존 임시 이미지 마크다운 제거
      setContent?.((prev) => prev.replace(`![image](${url})`, "이미지 업로드 실패"));
      return;
    }

    // 업로드 성공: 이미지 URL을 실제 S3 경로로 교체
    const uploadedUrl = `${result}`;
    setContent?.((prev) =>
      prev.replace(`![image](${url})`, `![image](${AWSS3Prefix}${uploadedUrl})`),
    );

    // BE에서 임시 이미지 DB에서 제거
    props.addS3ImageUrl!(result);
  };

  const {onDragEnter, onDragLeave, onDragOver, onDropOrInputEvent} =
    useDragAndDropBlob({
      fakeImageUpload,
    });

  // 붙여넣기 처리 함수
  const onPasteHandler = async (event: ClipboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    handleRedoSave();

    const textarea = textareaRef.current;
    if (!textarea) return;

    // 드래그 된 텍스트 삭제 처리
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentValue = textarea.value;
    const newValue = currentValue.slice(0, start) + currentValue.slice(end);
    textarea.value = newValue;
    textarea.selectionStart = start;

    const clipboardItems = event.clipboardData.items;
    let imageHandled = false;

    // 이미지가 존재하는 경우 처리
    for (const item of clipboardItems) {
      if (item.type.indexOf("image") === 0) {
        const file = item.getAsFile();
        if (file && props.addS3ImageUrl) {
          const url = await convertToObjectUrl(file);
          fakeImageUpload({file, url});
          imageHandled = true;
        }
      }
    }

    // 이미지가 붙여졌다면 텍스트 처리하지 않음
    if (imageHandled) return;

    // 텍스트 붙여넣기 처리
    const paste = event.clipboardData.getData("text");

    // ✅ 마크다운 이미지 중 S3 URL에 쿼리 추가
    let processedPaste = paste;
    const markdownImageRegex =
      /!\[.*?\]\((https:\/\/ssssksssblogbucket\.s3\.ap-northeast-2\.amazonaws\.com[^\)]*)\)/;

    // 링크로 이미지를 넣은 경우
    if (markdownImageRegex.test(paste)) {
      processedPaste = paste.replace(markdownImageRegex, (match, url) => {
        const hasQuery = url.includes("?");
        const finalUrl = hasQuery ? url + "&copy=true" : url + "?copy=true";
        return match.replace(url, finalUrl);
      });
    }

    const urlRegex = /^(https?:\/\/[^\s]+)/;
    const imageExtensions = [
      ".png",
      ".jpg",
      ".jpeg",
      ".gif",
      ".webp",
      ".bmp",
      ".svg",
    ];

    if (urlRegex.test(processedPaste)) {
      try {
        const url = new URL(processedPaste);
        const hostname = url.hostname.replace("www.", "");
        const lowerUrl = processedPaste.toLowerCase();

        const isImage = imageExtensions.some((ext) => lowerUrl.endsWith(ext));

        if (isImage) {
          const markdownImage = `![${hostname}](${processedPaste})`;
          insertContentAtCursor(markdownImage);
        } else {
          const markdownLink = `[${hostname}](${processedPaste})`;
          insertContentAtCursor(markdownLink);
        }
      } catch (e) {
        insertContentAtCursor(processedPaste);
      }
    } else {
      insertContentAtCursor(processedPaste);
    }
  };
  
  
  // const onPasteHandler = async (event: ClipboardEvent<HTMLTextAreaElement>) => {
  //   event.preventDefault();

  //   handleRedoSave();
  //   // 붙여넣기를 했을 때 드래그 된 요소가 있다면 드래그 된 요소는 제거해주고 붙여넣기를 해주는 로직
  //   const start = textareaRef.current!.selectionStart;
  //   const end = textareaRef.current!.selectionEnd;
  //   const currentValue = textareaRef.current!.value;
  //   const newValue = currentValue.slice(0, start) + currentValue.slice(end);
  //   textareaRef.current!.value = newValue;
  //   textareaRef.current!.selectionStart = start;

  //   // if (textareaRef.current == null) return;
  //   const item = event.clipboardData.items[0];
  //   // image로 판단된다면
  //   if (item.type.indexOf("image") === 0) {
  //     const file = item.getAsFile();
  //     if (file) {
  //       if (props.addS3ImageUrl) {
  //         const url = await convertToObjectUrl(file);
  //         fakeImageUpload({file, url});
  //       }
  //     }
  //   } else {
  //     const paste = event.clipboardData.getData("text");

  //     const urlRegex = /^(https?:\/\/[^\s]+)/;
  //     // https로 시작하면 링크 URL로 판단하여 링크로 변경해 줌
  //     if (urlRegex.test(paste)) {
  //       try {
  //         const url = new URL(paste);
  //         const hostname = url.hostname.replace("www.", "");
  //         const markdownLink = `[${hostname}](${paste})`;
  //         insertContentAtCursor(markdownLink);
  //       } catch (e) {
  //         // URL로 변환 실패 시 일반 텍스트로 삽입
  //         insertContentAtCursor(paste);
  //       }
  //     } else {
  //       insertContentAtCursor(paste);
  //     }
  //   }
  // };

  return (
    <div
      className={`grid h-[calc(100vh-10rem)] w-full max-w-[75rem] gap-x-2 pt-1 ${mode == "markdown" ? "" : mode == "preview" ? "" : "grid-cols-[1fr_1fr]"}`}
    >
      {/* 내용작성 */}
      <article
        className={`flex h-full w-full min-w-full max-w-full flex-col gap-y-2 overflow-scroll ${mode == "preview" && "hidden"}`}
      >
        <h3
          className="primary-border-radius py-2 rounded-[1rem] text-2xl font-bold default-flex"
          onClick={() => setMode(mode === "all" ? "markdown" : "all")}
        >
          내용작성
        </h3>
        <BasicTextarea
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
          className="rounded-[1rem] py-2 text-2xl font-bold primary-border-radius default-flex"
          onClick={() => setMode(mode === "all" ? "preview" : "all")}
        >
          미리보기
        </h3>
        <MarkdownPreview
          content={content}
          isPreview={props.isPreview}
          className={
            "h-full max-h-full w-full overflow-scroll break-all rounded-2xl border-2 border-primary-80 p-2"
          }
        />
      </article>
    </div>
  );
};

export default React.memo(CustomEditor);
