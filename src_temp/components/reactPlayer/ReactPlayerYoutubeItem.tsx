import Button from '@components/common/button/Button';
import { ConfirmButton } from '@components/common/button/ConfirmButton';
import Input from '@components/common/input/Input';
import styled from '@emotion/styled';
import { animationKeyFrames } from '@styles/animationKeyFrames';
import { CC } from '@styles/commonComponentStyle';
import { commonTheme } from '@styles/theme';
import { useState } from 'react';
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
  UpdateCacheStorageHandler: () => void;
  DeleteCacheStorageHandler: () => void;
  ChoiceYoutubePlayLinkHandler: () => void;
}

const ReactPlayerYoutubeItem = (props: IReactPlayerYoutubeItemProps) => {
  const [inputValue, setInputValue] = useState({
    url: props.url,
    name: props.name,
  });

  return (
    <Container active={props.url === props.choiceYoutubeLink.url}>
      <CC.ColumnDiv width="60%" gap={8} padding={'0rem 0rem 0rem 0.8rem'}>
        <CC.RowBetweenDiv gap={4}>
          <CC.RowDiv width="5rem"> url : </CC.RowDiv>
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
          <CC.RowDiv width="5rem"> 이름 : </CC.RowDiv>
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
        <ConfirmButton
          onClick={() => {
            props.DeleteCacheStorageHandler(props);
          }}
          color="red"
        >
          삭제
        </ConfirmButton>
      </CC.RowRightDiv>
    </Container>
  );
};
export default ReactPlayerYoutubeItem;

const Container = styled(CC.RowDiv)<{ active: boolean }>`
  animation: ${(props) =>
    props.active && `${animationKeyFrames.rainbowColors} 1s infinite`} 
  background: ${commonTheme.linearGradientColors.skyblue};
  z-index: 10;
  height: 6rem;
  gap: 1.2rem;
  padding: '0rem 0.4rem';
  font-size: ${commonTheme.fontSize.sm};
`;
