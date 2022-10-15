import styled from "styled-components";
import Layout1 from "src/components/layout/Layout1";
import { CF } from "@/styles/commonComponentStyle";
import IntroduceChapter from "@/components/landingPage/IntroduceChapter";
import BasicCarousel from "@/components/common/carousel/BasicCarousel";
import theme from "@/styles/theme";
import Stack from "@/components/intro/stack";

const HomePage = () => {
  const arr = [
    [
      "1. 블로그",
      "https://ssssksssblogbucket.s3.ap-northeast-2.amazonaws.com/blog/introduce/%EB%B8%94%EB%A1%9C%EA%B7%B8+%EC%86%8C%EA%B0%9C.gif",
      "/blog",
    ],
    [
      "2. 게시판",
      "https://ssssksssblogbucket.s3.ap-northeast-2.amazonaws.com/blog/introduce/%EA%B2%8C%EC%8B%9C%ED%8C%90+%EC%86%8C%EA%B0%9C.gif",
      "/board",
    ],
    // [
    //   "게시판",
    //   "이미지",
    //   "1. 검색기능 \n 2. 최신,조회수 정렬 \n 3. 페이지 네이션",
    //   "/board",
    // ],
    // [
    //   "할일, 일정",
    //   "이미지",
    //   "1. plan 기능 \n 2. 달력에 일정 기록 기능 \n 3. ????",
    //   "/plan",
    // ],
    // ["대시보드", "temp", "1. \n 2.  \n 3. ", "/"],
    // ["예약", "temp", "1. \n 2.  \n 3. ", "/"],
    // ["톡방", "temp", "1. \n 2.  \n 3. ", "/"],
    // ["알림", "temp", "1. \n 2.  \n 3. ", "/"],
    // ["팝업", "temp", "1. \n 2.  \n 3. ", "/"],
    // ["영상", "temp", "1. \n 2.  \n 3. ", "/"],
    // ["지도", "temp", "1. \n 2.  \n 3. ", "/"],
  ];
  return (
    <Container>
      <Chapter>
        <IntroduceChapter />
      </Chapter>
      {/* <Chapter> 자기소개 및 포트폴리오 </Chapter> */}
      <Chapter>
        <Title> Project </Title>
        <BasicCarousel
          arr={arr}
          arrLength={arr.length}
          IntervalTime={15000}
          transitionTime={1000}
        />
      </Chapter>
      <Chapter>
        <Title> Stack </Title>
        <Stack />
      </Chapter>
      <Chapter>
        <Title> Introduce </Title>
      </Chapter>
      <Chapter>
        <Title> Contact Me </Title>
      </Chapter>
    </Container>
  );
};
HomePage.layout = Layout1;
export default HomePage;

const Container = styled(CF.ColumnDiv)`
  gap: 10px;
  background: black;
  padding-bottom: 10px;
`;
const Title = styled(CF.RowCenterDiv)`
  /* position: absolute; */
  /* top: 0; */
  /* left: 0; */
  padding-top: 20px;
  font-size: 32px;
  color: black;
  font-family: ${theme.customFonts.GmarketSansBold};
`;
const Chapter = styled.section`
  background: ${theme.backgroundColors.background2};
  min-height: 600px;
  width: 100%;
`;
