import TabMenu from '@components/common/tab/TabMenu';
import Footer from '@components/layout/Footer';
import Layout2 from '@components/layout/Layout2';
import MyStack from '@components/portfolio-component/MyStack';
import Portfolio2022 from '@components/portfolio-component/Portfolio2022';
import Portfolio2024 from '@components/portfolio-component/Portfolio2024';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import Image from 'next/image';
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
          <CC.ColumnCenterCenterDiv minH={'24rem'} gap={8} pd={'0.2rem'}>
            <ImageBox w={'18rem'} h={'24rem'} bg={'transparent'} pd={'0.4rem'}>
              <Image
                src={`https://ssssksssblogbucket.s3.ap-northeast-2.amazonaws.com/private/private_profile.png`}
                layout="fill"
              />
            </ImageBox>
          </CC.ColumnCenterCenterDiv>
          <CC.GridRow4
            h={'24rem'}
            gap={16}
            pd={'0.4rem'}
            bg={'transparent'}
            fontFamily={'gmarketSansBold'}
            color={'white20'}
          >
            <CC.RowDiv pd={'0rem 0rem 0rem 0.4rem'} color={'white'}>
              이름 : 이수경
            </CC.RowDiv>
            <CC.RowDiv pd={'0rem 0rem 0rem 0.4rem'} color={'white'}>
              번호 :
            </CC.RowDiv>
            <CC.RowDiv pd={'0rem 0rem 0rem 0.4rem'} color={'white'}>
              메일 : ssssksss@naver.com
            </CC.RowDiv>
            <CC.RowDiv pd={'0rem 0rem 0rem 0.4rem'}>
              링크 : 깃허브, 블로그
            </CC.RowDiv>
          </CC.GridRow4>
        </CC.GridColumn2>
        <CC.GridColumn4 gap={8}>
          <CC.ColumnCenterCenterDiv h={'12rem'} gap={8}>
            <CC.RowCenterDiv w={'8rem'} h={'8rem'} bg={'contrast'}>
              이미지
            </CC.RowCenterDiv>
            <div> 설명 </div>
          </CC.ColumnCenterCenterDiv>
          <CC.ColumnCenterCenterDiv h={'12rem'} gap={8}>
            <CC.RowCenterDiv w={'8rem'} h={'8rem'} bg={'contrast'}>
              이미지
            </CC.RowCenterDiv>
            <div> 설명 </div>
          </CC.ColumnCenterCenterDiv>
          <CC.ColumnCenterCenterDiv h={'12rem'} gap={8}>
            <CC.RowCenterDiv w={'8rem'} h={'8rem'} bg={'contrast'}>
              이미지
            </CC.RowCenterDiv>
            <div> 설명 </div>
          </CC.ColumnCenterCenterDiv>
          <CC.ColumnCenterCenterDiv h={'12rem'} gap={8}>
            <CC.RowCenterDiv w={'8rem'} h={'8rem'} bg={'contrast'}>
              이미지
            </CC.RowCenterDiv>
            <div> 설명 </div>
          </CC.ColumnCenterCenterDiv>
        </CC.GridColumn4>
      </Section>
      <Section>
        <TabMenu
          minH={'40rem'}
          bg={'transparent'}
          menu={[
            {
              tabName: '2024(1)',
              tabComponent: <Portfolio2024 />,
            },
            {
              tabName: '2022(0)',
              tabComponent: <Portfolio2022 />,
            },
          ]}
        ></TabMenu>
        <TabMenu menu={[...StackList]} tabMenuMinH={'24rem'} />
      </Section>
      <Footer />
    </Container>
  );
};
Index.layout = Layout2;
export default Index;

const Container = styled(CC.ColumnDiv)`
  width: 100%;
  height: 100vh;
  gap: 0.4rem;
  ${(props) => props.theme.scroll.hidden};
`;

const ImageBox = styled(CC.RowCenterDiv)`
  position: relative;
  & > * {
    background: transparent;
  }
`;

const Section = styled.section`
  ${(props) => props.theme.flex.column};
  padding: 0.8rem;
  gap: 0.8rem;
`;
