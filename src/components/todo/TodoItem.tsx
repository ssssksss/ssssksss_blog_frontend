import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import { Input } from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';
import { Icons } from '@/components/common/icons/Icons';
import Image from 'next/image';
import { useState } from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file TodoItem.tsx
 * @version 0.0.1 "2023-09-29 23:47:39"
 * @description 설명
 */
const TodoItem = ({ children, props }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Container isChecked={isChecked}>
      <Title isChecked={isChecked} onClick={() => alert('test')}>
        제목 및 내용111111111111111111111111111111111111111111111111111111111{' '}
      </Title>
      <CC.RowDiv gap={4}>
        <Input
          type="checkbox"
          outline={true}
          color={'red100'}
          w={'28px'}
          h={'28px'}
          onClick={() => setIsChecked(prev => !prev)}
        />
      </CC.RowDiv>
    </Container>
  );
};
export default TodoItem;

const Container = styled.div<{ isChecked: boolean }>`
  background: ${props =>
    props.isChecked
      ? props.theme.colors.black20
      : props.theme.main.secondary20};
  width: 100%;
  padding: 4px;
  border-radius: 4px;
  font-size: 0.8rem;
  gap: 8px;
  ${props => props.theme.flex.row.between.center};
  .title {
    font-family: ${props => props.theme.fontFamily.cookieRunRegular};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Title = styled.span<{ isChecked: boolean }>`
  font-family: ${props => props.theme.fontFamily.cookieRunRegular};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: ${props => props.isChecked && 'line-through'};
  cursor: pointer;
`;
