import styled from "styled-components";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import "react-quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { useFormContext } from "react-hook-form";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface ITextareaReactQuillSpaceProps {
  placeholder?: string;
  register?: any;
  height?: any;
  title1?: string;
  errors?: string;
  defaultValue?: string;
  editorOnchange?: any;
}

const TextareaReactQuillSpace = ({
  title1,
  errors,
  height,
  editorOnchange,
  defaultValue,
}: ITextareaReactQuillSpaceProps) => {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"], // toggled buttons
          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ align: [] }],
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          [{ direction: "rtl" }], // text direction
          ["clean"], // remove formatting button
          ["blockquote", "link", "code-block", "formula", "image", "video"], // media
        ],
        // handlers: {
        //   image: imageHandler,
        // },
      },
    }),
    []
  );

  const { setValue, trigger } = useFormContext();

  const onChangeContents = (value: string) => {
    setValue("contents", value === "<p><br></p>" ? "" : value);
    // trigger("contents");
  };

  console.log("defaultValue : " + defaultValue);

  return (
    <Container>
      {title1 && <Title1Div> {title1} </Title1Div>}
      {defaultValue !== undefined && (
        <CustomReactQuill
          id="editor"
          onChange={onChangeContents}
          modules={modules}
          // theme="bubble"
          height={height}
          placeholder="내용을 입력해주세요."
          defaultValue={defaultValue}
        />
      )}
      <Error> {errors} </Error>
    </Container>
  );
};
export default TextareaReactQuillSpace;

const Container = styled.div`
  resize: none;
  width: 100%;
  gap: 16px;
  margin-bottom: 40px;
`;
const CustomReactQuill = styled(ReactQuill)<{ height: string }>`
  overflow-y: scroll;
  .ql-container {
    height: ${(props) => props.height || "300px"};
  }

  .ql-toolbar {
    background-color: red;
  }
`;

const Title1Div = styled.div`
  font-weight: 800;
  font-size: 1.4em;
`;
const Error = styled.span`
  color: red;
  font-size: 0.9em;
`;
