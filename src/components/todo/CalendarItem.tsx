import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import { Input } from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';
import { Icons } from '@/components/common/icons/Icons';
import Image from 'next/image';
import { useState } from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file CalendarItem.tsx
 * @version 0.0.1 "2023-09-29 23:52:34"
 * @description 설명
 */
const CalendarItem = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Container isChecked={isChecked}>
      <TitleContainer w={'calc(100% - 70px)'} onClick={() => alert('test')}>
        <Title isChecked={isChecked}>
          제목 및 내용11111111111111111111111111111111111111111111111111{' '}
        </Title>
        <span className="date"> 날짜 </span>
      </TitleContainer>
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
export default CalendarItem;

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
  .date {
    font-family: ${props => props.theme.fontFamily.cookieRunRegular};
    color: ${props => props.theme.colors.black40};
    font-size: 12px;
  }
`;
const TitleContainer = styled(CC.ColumnDiv)`
  cursor: pointer;
`;
const Title = styled.span<{ isChecked: boolean }>`
  font-family: ${props => props.theme.fontFamily.cookieRunRegular};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: ${props => props.isChecked && 'line-through'};
`;
