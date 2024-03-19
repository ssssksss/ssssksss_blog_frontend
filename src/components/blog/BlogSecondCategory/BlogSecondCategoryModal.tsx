import Button from '@components/common/button/Button';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import { useState } from 'react';
import BlogSecondCategoryCreateBox from './BlogSecondCategoryCreateBox';
import BlogSecondCategoryDeleteBox from './BlogSecondCategoryDeleteBox';
import BlogSecondCategoryUpdateBox from './BlogSecondCategoryUpdateBox';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogSecondCategoryModal.tsx
 * @version 0.0.1 "2024-01-08 17:33:35"
 * @description 설명
 */
const BlogSecondCategoryModal = (props) => {
  const [menu, setMenu] = useState('add');

  return (
    <Container>
      <CC.RowDiv gap={4}>
        <Button
          w={'100%'}
          active={menu === 'add'}
          onClick={() => setMenu('add')}
        >
          추가
        </Button>
        <Button
          w={'100%'}
          active={menu === 'update'}
          onClick={() => setMenu('update')}
        >
          수정
        </Button>
        <Button
          w={'100%'}
          active={menu === 'delete'}
          onClick={() => setMenu('delete')}
        >
          삭제
        </Button>
      </CC.RowDiv>
      {menu === 'add' && (
        <BlogSecondCategoryCreateBox closeModal={props.closeModal} />
      )}
      {menu === 'update' && (
        <BlogSecondCategoryUpdateBox closeModal={props.closeModal} />
      )}
      {menu === 'delete' && (
        <BlogSecondCategoryDeleteBox closeModal={props.closeModal} />
      )}
    </Container>
  );
};
export default BlogSecondCategoryModal;

const Container = styled(CC.ColumnDiv)`
  width: 100%;
  min-height: 40rem;
  padding: 1rem;
  gap: 1.6rem;
  color: ${(props) => props.theme.colors.white80};
  font-size: 1.2rem;
  max-width: 40rem;
  margin: auto;
`;
