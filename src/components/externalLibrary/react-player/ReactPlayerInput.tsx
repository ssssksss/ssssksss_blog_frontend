import Input from "@/components/common/input/Input";
import { CC } from "@/styles/commonComponentStyle";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import Button from "@/components/common/button/Button";
import { keyframes } from "@emotion/css";
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ReactPlayerInput.tsx
 * @version 0.0.1 "2023-06-14 16:27:49"
 * @description 설명
 */

interface IReactPlayerInputProps {
  url?: string;
  name?: string;
  choiceYoutubeLink?: string;
  UpdateCacheStorageHandler: (input: any, props: any) => void;
  DeleteCacheStorageHandler: (props: any) => void;
  ChoiceYoutubePlayLinkHandler: (input: any, props: any) => void;
}

const ReactPlayerInput = (props: IReactPlayerInputProps) => {
  const [inputValue, setInputValue] = useState({
    url: props.url,
    name: props.name,
  });

  return (
    <Container height="60px" gap={12} border={"solid 2px black"} active={props.url === props.choiceYoutubeLink.url}>
      <CC.ColumnDiv width="60%" gap={8}>
        <CC.RowBetweenDiv gap={4}>
          <CC.RowDiv width="50px"> url : </CC.RowDiv>
          <Input
            value={inputValue.url}
            onChange={(e) => {
              setInputValue({
                ...inputValue,
                url: e.target.value,
              });
            }}
          />
        </CC.RowBetweenDiv>
        <CC.RowBetweenDiv gap={4}>
          <CC.RowDiv width="50px"> 이름 : </CC.RowDiv>
          <Input
            value={inputValue.name}
            onChange={(e) => {
              setInputValue({
                ...inputValue,
                name: e.target.value,
              });
            }}
          />
        </CC.RowBetweenDiv>
      </CC.ColumnDiv>
      <CC.RowRightDiv width="40%" padding={"0px 4px 0px 0px"} gap={4}>
        <Button
          width="50px"
          height="50px"
          onClick={() => props.ChoiceYoutubePlayLinkHandler(inputValue, props)}
          disabled={props.url === props.choiceYoutubeLink.url}>
          선택
        </Button>
        <Button
          width="50px"
          height="50px"
          onClick={() => props.UpdateCacheStorageHandler(inputValue, props)}
          disabled={props.url === inputValue.url && props.name === inputValue.name}>
          수정
        </Button>
        <Button width="50px" height="50px" onClick={() => props.DeleteCacheStorageHandler(props)}>
          삭제
        </Button>
      </CC.RowRightDiv>
    </Container>
  );
};
export default ReactPlayerInput;

const rotation = keyframes`
  0% {
    background-image: linear-gradient(
      90deg,
      rgba(174, 84, 242, 1) 0%,
      rgba(247, 84, 34, 1) 20%,
      rgba(247, 167, 46, 1) 40%,
      rgba(195, 245, 189, 1) 60%,
      rgba(250, 238, 167, 1) 80%
    );
  }
  20% {
    background-image: linear-gradient(
      90deg,
      rgba(174, 84, 242, 1) 0%,
      rgba(247, 84, 34, 1) 20%,
      rgba(247, 167, 46, 1) 40%,
      rgba(195, 245, 189, 1) 60%,
      rgba(250, 238, 167, 1) 80%
    );
  }
  40% {
    background-image: linear-gradient(
      90deg,
      rgba(247, 84, 34, 1)    0%,
      rgba(247, 167, 46, 1)   20%,
      rgba(195, 245, 189, 1)  40%,
      rgba(250, 238, 167, 1)  60%,
      rgba(174, 84, 242, 1)  80%
    );
  }
  60% {
    background-image: linear-gradient(
      90deg,
      rgba(247, 167, 46, 1)   0%,
      rgba(195, 245, 189, 1)  20%,
      rgba(250, 238, 167, 1)  40%,
      rgba(174, 84, 242, 1)   60%,
      rgba(247, 84, 34, 1)   80%
      );
  }
  80% {
    background-image: linear-gradient(
      90deg,
      rgba(195, 245, 189, 1)  0%,
      rgba(250, 238, 167, 1)  20%,
      rgba(174, 84, 242, 1)   40%,
      rgba(247, 84, 34, 1)    60%,
      rgba(247, 167, 46, 1)    80%
      );
  }
  100% {
    background-image: linear-gradient(
      90deg,
    rgba(250, 238, 167, 1)  0%,
    rgba(174, 84, 242, 1)   20%,
    rgba(247, 84, 34, 1)    40%,
    rgba(247, 167, 46, 1)   60%,
    rgba(195, 245, 189, 1)   80%
    );
  }
  `;

const Container = styled(CC.RowDiv)<{ active: boolean }>`
  background: ${(props) => props.active && "red"};
  animation: ${(props) => props.active && `${rotation} 1s infinite`};
`;
