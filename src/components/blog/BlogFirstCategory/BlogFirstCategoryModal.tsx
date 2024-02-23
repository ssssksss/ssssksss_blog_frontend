import Button from '@/components/common/button/Button';
import { CC } from '@/styles/commonComponentStyle';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
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
  blogCategoryListResData: any;
}) => {
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
      {menu === 'add' && <BlogFirstCategoryCreateBox />}
      {menu === 'update' && (
        <BlogFirstCategoryUpdateBox
          blogCategoryListResData={props.blogCategoryListResData}
        />
      )}
      {menu === 'delete' && (
        <BlogFirstCategoryDeleteBox
          blogCategoryListResData={props.blogCategoryListResData}
        />
      )}
    </Container>
  );
};

const Container = styled(CC.ColumnDiv)`
  width: 100%;
  min-height: 400px;
  padding: 10px;
  gap: 16px;
  color: ${props => props.theme.colors.white80};
  font-size: 1.2rem;
  max-width: 400px;
  margin: auto;

  /* @media (min-width: ${props => props.theme.deviceSizes.tablet}) {
    ${props => props.theme.flex.row._};
  } */
`;

const BlogCategoryBox = styled(CC.ColumnDiv)`
  outline: solid ${props => props.theme.main.contrast} 4px;

  & > button:nth-of-type(1) {
    align-items: end;
  }
`;

const commonStyle = css`
  border: 1px solid #fff;
  background: rgba(0, 0, 0, 0.01);
  backdrop-filter: blur(1px);
`;

const Header = styled.header`
  ${props => props.theme.flex.column};
  padding: 16px;
  gap: 0.25rem;
  align-self: stretch;
  border-radius: ${props => props.theme.borderRadius.br10};
  ${commonStyle};

  span:nth-of-type(1) {
    font-family: ${props => props.theme.fontFamily.cookieRunRegular};
    font-size: 20px;
  }
`;
