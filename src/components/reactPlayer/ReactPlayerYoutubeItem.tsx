import Input from '@/components/common/input/Input';
import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import Button from '@/components/common/button/Button';
import { keyframes } from '@emotion/css';
import { commonTheme } from '@/styles/theme';
import { animationKeyFrames } from '@/styles/animationKeyFrames';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ReactPlayerYoutubeItem.tsx
 * @version 0.0.1 "2023-06-14 16:27:49"
 * @description 설명
 */

interface IReactPlayerYoutubeItemProps {
  url?: string;
  name?: string;
  choiceYoutubeLink?: string;
  UpdateCacheStorageHandler: (input: any, props: any) => void;
  DeleteCacheStorageHandler: (props: any) => void;
  ChoiceYoutubePlayLinkHandler: (input: any, props: any) => void;
}

const ReactPlayerYoutubeItem = (props: IReactPlayerYoutubeItemProps) => {
  const [inputValue, setInputValue] = useState({
    url: props.url,
    name: props.name,
  });

  return (
    <Container active={props.url === props.choiceYoutubeLink.url}>
      <CC.ColumnDiv width="60%" gap={8} padding={'0px 0px 0px 8px'}>
        <CC.RowBetweenDiv gap={4}>
          <CC.RowDiv width="50px"> url : </CC.RowDiv>
          <Input
            value={inputValue.url}
            onChange={e => {
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
            onChange={e => {
              setInputValue({
                ...inputValue,
                name: e.target.value,
              });
            }}
          />
        </CC.RowBetweenDiv>
      </CC.ColumnDiv>
      <CC.RowRightDiv width="40%" gap={4}>
        <Button
          onClick={() => props.ChoiceYoutubePlayLinkHandler(inputValue, props)}
          disabled={props.url === props.choiceYoutubeLink.url}
          color="green"
        >
          선택
        </Button>
        <Button
          onClick={() => props.UpdateCacheStorageHandler(inputValue, props)}
          disabled={
            props.url === inputValue.url && props.name === inputValue.name
          }
        >
          수정
        </Button>
        <Button
          onClick={() => {
            if (!confirm('확인(예) 또는 취소(아니오)를 선택해주세요.')) {
            } else {
              props.DeleteCacheStorageHandler(props);
            }
          }}
          color="red"
        >
          삭제
        </Button>
      </CC.RowRightDiv>
    </Container>
  );
};
export default ReactPlayerYoutubeItem;

const Container = styled(CC.RowDiv)<{ active: boolean }>`
  animation: ${props =>
    props.active && `${animationKeyFrames.rainbowColors} 1s infinite`} 
  background: ${commonTheme.linearGradientColors.skyblue};
  z-index: 10;
  height: 60px;
  gap: 12px;
  padding: '0px 4px';
  font-size: ${commonTheme.fontSize.sm};
`;
