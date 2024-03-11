import TabMenu from '@components/common/tab/TabMenu';
import Footer from '@components/layout/Footer';
import Layout2 from '@components/layout/Layout2';
import MyStack from '@components/portfolio-component/MyStack';
import Portfolio2024 from '@components/portfolio-component/Portfolio2024';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import { AWSS3Prefix } from '@utils/variables/url';
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
          <CC.ColumnCenterCenterDiv minH={'240px'} gap={8} pd={'2px'}>
            <ImageBox w={'180px'} h={'240px'} bg={'transparent'} pd={'4px'}>
              <Image
                src={`${AWSS3Prefix}private/%EA%B0%9C%EC%9D%B8_%ED%94%84%EB%A1%9C%ED%95%84_%EC%82%AC%EC%A7%84_%EB%B0%B0%EA%B2%BD%EC%A0%9C%EA%B1%B0.png`}
                layout="fill"
              />
              {/* <ReactPlayer
                className="react-player"
                url={`${AWSS3Prefix}private/%EC%9B%90%EB%B3%B8+_+202403100358+_+%EA%B0%9C%EC%9D%B8_%ED%94%84%EB%A1%9C%ED%95%84_%EC%82%AC%EC%A7%84_%EB%B0%B0%EA%B2%BD%EC%A0%9C%EA%B1%B0_animation.mp4`} // 영상 url
                width="100%"
                height="100%"
                playing={true} // 자동 재생 on
                muted={true} // 음소거 on
                controls={false} // 플레이어 컨트롤 노출 여부
                light={false} // 플레이어 모드
                pip={false} // pip 모드 설정 여부
                loop={false} // 반복재생
              /> */}
            </ImageBox>
          </CC.ColumnCenterCenterDiv>
          <CC.GridRow4
            h={'240px'}
            gap={16}
            pd={'4px'}
            bg={'transparent'}
            fontFamily={'gmarketSansBold'}
            color={'white20'}
          >
            <CC.RowDiv pd={'0px 0px 0px 4px'} color={'white'}>
              이름 : 이수경
            </CC.RowDiv>
            <CC.RowDiv pd={'0px 0px 0px 4px'} color={'white'}>
              번호 : 010-7430-9809
            </CC.RowDiv>
            <CC.RowDiv pd={'0px 0px 0px 4px'} color={'white'}>
              메일 : ssssksss@naver.com
            </CC.RowDiv>
            <CC.RowDiv pd={'0px 0px 0px 4px'}>링크 : 깃허브, 블로그</CC.RowDiv>
          </CC.GridRow4>
        </CC.GridColumn2>
        <CC.GridColumn4 gap={8}>
          <CC.ColumnCenterCenterDiv h={'120px'} gap={8}>
            <CC.RowCenterDiv w={'80px'} h={'80px'} bg={'contrast'}>
              이미지
            </CC.RowCenterDiv>
            <div> 설명 </div>
          </CC.ColumnCenterCenterDiv>
          <CC.ColumnCenterCenterDiv h={'120px'} gap={8}>
            <CC.RowCenterDiv w={'80px'} h={'80px'} bg={'contrast'}>
              이미지
            </CC.RowCenterDiv>
            <div> 설명 </div>
          </CC.ColumnCenterCenterDiv>
          <CC.ColumnCenterCenterDiv h={'120px'} gap={8}>
            <CC.RowCenterDiv w={'80px'} h={'80px'} bg={'contrast'}>
              이미지
            </CC.RowCenterDiv>
            <div> 설명 </div>
          </CC.ColumnCenterCenterDiv>
          <CC.ColumnCenterCenterDiv h={'120px'} gap={8}>
            <CC.RowCenterDiv w={'80px'} h={'80px'} bg={'contrast'}>
              이미지
            </CC.RowCenterDiv>
            <div> 설명 </div>
          </CC.ColumnCenterCenterDiv>
        </CC.GridColumn4>
      </Section>
      <Section>
        <TabMenu
          bg={'transparent'}
          menu={[
            {
              tabName: '2024(1)',
              tabComponent: <Portfolio2024 />,
            },
            {
              tabName: '2022(0)',
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
Index.layout = Layout2;
export default Index;

const Container = styled(CC.ColumnDiv)`
  width: 100%;
  gap: 4px;
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
  padding: 8px;
  gap: 8px;
`;
