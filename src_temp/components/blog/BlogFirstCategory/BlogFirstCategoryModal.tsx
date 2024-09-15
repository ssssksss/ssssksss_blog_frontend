import Button from '@components/common/button/Button';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import { useState } from 'react';
import BlogFirstCategoryCreateBox from './BlogFirstCategoryCreateBox';
import BlogFirstCategoryDeleteBox from './BlogFirstCategoryDeleteBox';
import BlogFirstCategoryUpdateBox from './BlogFirstCategoryUpdateBox';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogFirstCategoryModal.tsx
 * @version 0.0.1 "2023-10-03 02:15:03"
 * @description 설명
 */

export const BlogFirstCategoryModal = (props: {
  closeModal?: () => void;
}) => {
  const [menu, setMenu] = useState('add');
  return (
    <Container>
      <CC.RowDiv gap={4}>
        <Button
          w={'100%'}
          active={menu === 'add'}
          onClick={() => setMenu('add')}
          outline={1}
          >
          추가
        </Button>
        <Button
          w={'100%'}
          active={menu === 'update'}
          onClick={() => setMenu('update')}
          outline={1}
          >
          수정
        </Button>
        <Button
          w={'100%'}
          active={menu === 'delete'}
          onClick={() => setMenu('delete')}
          outline={1}
        >
          삭제
        </Button>
      </CC.RowDiv>
      {menu === 'add' && (
        <BlogFirstCategoryCreateBox closeModal={props.closeModal} />
      )}
      {menu === 'update' && (
        <BlogFirstCategoryUpdateBox
          closeModal={props.closeModal}
        />
      )}
      {menu === 'delete' && (
        <BlogFirstCategoryDeleteBox
          closeModal={props.closeModal}
        />
      )}
    </Container>
  );
};

const Container = styled(CC.ColumnDiv)`
  width: 100%;
  max-width: 40rem;
  min-height: 40rem;
  padding: 1rem;
  gap: 1.6rem;
  color: ${(props) => props.theme.colors.white80};
  font-size: 1.2rem;
  margin: auto;
`;
