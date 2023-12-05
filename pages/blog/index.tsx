import styled from '@emotion/styled';
import Layout1 from '@/components/layout/Layout1';
import BlogFirstCategoryContainer from '@/components/blog/BlogFirstCategoryContainer';
import BlogMainContainer from '@/components/blog/BlogMainContainer';
import { CC } from '@/styles/commonComponentStyle';
import BlogSearchContainer from '@/components/blog/BlogSearchContainer';
import BlogSecondCategoryContainer from '@/components/blog/BlogSecondCategoryContainer';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file index.tsx
 * @version 0.0.1 "2023-09-25 00:05:43"
 * @description 설명
 */
const Index = () => {
  return (
    <CC.ColumnDiv
      gap={16}
      w={'100%'}
      bg={'contrast'}
      brR={'10px'}
      h={'calc(100vh - 66px)'}
      pd={'8px 4px 4px 4px'}
    >
      <BlogSearchContainer />
      {typeof window !== 'undefined' && (
        <Container>
          <BlogFirstCategoryContainer />
          <BlogSecondCategoryContainer />
        </Container>
      )}
      <BlogMainContainer />
    </CC.ColumnDiv>
  );
};
export default Index;
Index.layout = Layout1;

const Container = styled.section`
  ${props => props.theme.flex.column};
  width: 100%;
  padding: 4px;
  border-radius: 0.625rem;
  border: 1px solid ${props => props.theme.main.primary100};
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
  gap: 4px;
`;
