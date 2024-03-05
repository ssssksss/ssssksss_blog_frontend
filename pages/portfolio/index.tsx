import TabMenu from '@components/common/tab/TabMenu';
import Footer from '@components/layout/Footer';
import Layout1 from '@components/layout/Layout1';
import MyStack from '@components/portfolio/MyStack';
import Portfolio2024 from '@components/portfolio/Portfolio2024';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file index.tsx
 * @version 0.0.1 "2024-03-03 23:54:02"
 * @description 설명
 */

const StackList = [
  'Frontend',
  'Backend',
  'Design',
  'Database',
  'Server',
  // 'Etc',
].map((i) => {
  return {
    tabName: i,
    tabComponent: <MyStack active={i} />,
  };
});

const Index = () => {
  return (
    <Container>
      <Section>
        <CC.GridColumn2 gap={8}>
          <CC.ColumnCenterCenterDiv
            minH={'240px'}
            gap={8}
            outline={true}
            pd={'2px'}
          >
            <CC.RowCenterDiv w={'160px'} h={'160px'} bg={'contrast'} pd={'4px'}>
              이미지
            </CC.RowCenterDiv>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the
            </div>
          </CC.ColumnCenterCenterDiv>
          <CC.GridRow4 h={'240px'} gap={16} outline={true} pd={'4px'}>
            <CC.RowDiv bg={'contrast'} pd={'0px 0px 0px 4px'}>
              이름 : 이수경
            </CC.RowDiv>
            <CC.RowDiv bg={'contrast'} pd={'0px 0px 0px 4px'}>
              번호 : 010-7430-9809
            </CC.RowDiv>
            <CC.RowDiv bg={'contrast'} pd={'0px 0px 0px 4px'}>
              메일 : ssssksss@naver.com
            </CC.RowDiv>
            <CC.RowDiv bg={'contrast'} pd={'0px 0px 0px 4px'}>
              링크 : 깃허브, 블로그
            </CC.RowDiv>
          </CC.GridRow4>
        </CC.GridColumn2>
        <CC.GridColumn4 gap={8}>
          <CC.ColumnCenterCenterDiv h={'120px'} gap={8} outline={true}>
            <CC.RowCenterDiv w={'80px'} h={'80px'} bg={'contrast'}>
              이미지
            </CC.RowCenterDiv>
            <div> 설명 </div>
          </CC.ColumnCenterCenterDiv>
          <CC.ColumnCenterCenterDiv h={'120px'} gap={8} outline={true}>
            <CC.RowCenterDiv w={'80px'} h={'80px'} bg={'contrast'}>
              이미지
            </CC.RowCenterDiv>
            <div> 설명 </div>
          </CC.ColumnCenterCenterDiv>
          <CC.ColumnCenterCenterDiv h={'120px'} gap={8} outline={true}>
            <CC.RowCenterDiv w={'80px'} h={'80px'} bg={'contrast'}>
              이미지
            </CC.RowCenterDiv>
            <div> 설명 </div>
          </CC.ColumnCenterCenterDiv>
          <CC.ColumnCenterCenterDiv h={'120px'} gap={8} outline={true}>
            <CC.RowCenterDiv w={'80px'} h={'80px'} bg={'contrast'}>
              이미지
            </CC.RowCenterDiv>
            <div> 설명 </div>
          </CC.ColumnCenterCenterDiv>
        </CC.GridColumn4>
      </Section>
      <Section>
        <TabMenu
          menu={[
            {
              tabName: '2024(1)',
              tabComponent: <Portfolio2024 />,
            },
            {
              tabName: '2022(0)',
              tabComponent: <div> {'테스트중'} </div>,
            },
            {
              tabName: '2021(0)',
              tabComponent: <div> {'테스트중'} </div>,
            },
          ]}
        ></TabMenu>
        <TabMenu menu={[...StackList]} tabMenuMinH={'240px'} />
      </Section>
      <Footer />
    </Container>
  );
};
Index.layout = Layout1;
export default Index;

const Container = styled(CC.ColumnDiv)`
  width: 100%;
  gap: 4px;
  overflow-y: scroll;
`;

const Section = styled.section`
  ${(props) => props.theme.flex.column};
  background: ${(props) => props.theme.main.primary40};
  padding: 8px;
  gap: 8px;
`;
