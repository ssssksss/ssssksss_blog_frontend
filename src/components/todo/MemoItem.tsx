import styled from '@emotion/styled';
import { CC } from '@/styles/commonComponentStyle';
import { Icons } from '@/components/common/icons/Icons';
import Image from 'next/image';
import { Input } from '@/components/common/input/Input';
import Textarea from '../common/textarea/Textarea';
import { useRef } from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file MemoItem.tsx
 * @version 0.0.1 "2023-10-02 16:50:32"
 * @description 설명
 */
const MemoItem = ({ text }) => {
  return (
    <Container>
      <Header>
        <Image src={Icons.ExitIcon} alt="" onClick={() => alert('test')} />
      </Header>
      <Textarea defaultValue={text} submit={() => alert('test')} />
    </Container>
  );
};
export default MemoItem;

const Container = styled.div`
  height: max-content;
  word-wrap: break-word;
  word-break: break-all;
  padding: 4px;
  background: ${props => props.theme.main.primary20};
  border-radius: 4px;

  textarea {
    margin-top: 4px;
    height: max-content;
    background: transparent;
    border: none;
    appearance: none;
    resize: none;
  }
`;
const Header = styled(CC.RowRightDiv)`
  img {
    cursor: pointer;
  }
`;
