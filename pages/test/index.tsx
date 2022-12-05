import styled from "@emotion/styled";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import InputTypeFile from "../../src/components/common/input/InputTypeFile";
import { useRef, useState } from "react";
import Layout1 from "@/components/layout/Layout1";
import Button from "@/components/common/button/Button";
import Spinners, { Spinner4 } from "@/components/common/spinner/Spinners";
/**
 * Author : Sukyung Lee
 * FileName: Test.tsx
 * Date: 2022-09-17 18:52:31
 * Description :
 */
const Test = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadData, setUploadData] = useState<any>();

  const uploadHandler = () => {
    let formData = new FormData();
    formData.append("files", uploadData[0].file);
    AxiosInstance({
      url: "/s3/image",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
      data: formData,
      withCredentials: true,
    })
      .then((response) => {
        console.log("index.tsx : ", response);
      })
      .catch((error) => {
        console.log("index.tsx : ", error.response);
      });
  };

  const onChangeUploadHandler = (e: any) => {
    const imageURLsArgs = uploadData ? uploadData : []; // 기존 파일
    const inputFileArgs = e.target.files || undefined; // 새로 넣어준 파일

    if (inputFileArgs.length + imageURLsArgs.length > 4) {
      alert("4개까지만 업로드가 가능합니다.");
    } else if (inputFileArgs !== undefined) {
      // 실제로 서버에 요청을 보내지 않고 임시로 사용하는 이미지 url과 실제 데이터 이미지를 객체로 저장한다.
      for (let i = 0; i < inputFileArgs.length; i++) {
        imageURLsArgs.push({
          tempPath: URL.createObjectURL(inputFileArgs[i]),
          file: inputFileArgs[i],
        });
        setUploadData(imageURLsArgs);
      }
    }
  };

  const onClickInputTypeFile = () => {
    fileRef.current?.click();
  };

  return (
    <Container>
      {/* <Button onClick={testHandler}> 제출 버튼 </Button> */}
      <Button onClick={uploadHandler}> 제출 버튼 </Button>
      <Button onClick={onClickInputTypeFile}> 버튼 </Button>
      <InputTypeFile
        fileRef={fileRef}
        onChange={onChangeUploadHandler}
        display="none"
      />
      <Spinner4 />
    </Container>
  );
};
export default Test;
Test.layout = Layout1;
const Container = styled.div`
  width: 100%;
`;
