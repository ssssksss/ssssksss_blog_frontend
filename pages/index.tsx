import styled from "styled-components";
import Layout1 from "src/components/layout/Layout1";
import { CF } from "@/styles/commonComponentStyle";
import IntroduceChapter from "@/components/landingPage/IntroduceChapter";
import BasicCarousel from "@/components/common/carousel/BasicCarousel";
import theme from "@/styles/theme";

const HomePage = () => {
  const arr = [
    [
      "블로그",
      "이미지",
      "1. 개발 공부를 기록하기 위한 블로그 \n 2. CRUD 기능 \n 3. 카테고리 분류 \n 4. toast-ui-editor \n 5. 이미지 업로드 기능",
      "/blog",
    ],
    [
      "게시판",
      "이미지",
      "1. 검색기능 \n 2. 최신,조회수 정렬 \n 3. 페이지 네이션",
      "/board",
    ],
    [
      "할일, 일정",
      "이미지",
      "1. todo 기능 \n 2. 달력에 일정 기록 기능 \n 3. ????",
      "/todo",
    ],
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
        <Title> 토이 프로젝트 </Title>
        <BasicCarousel
          arr={arr}
          arrLength={arr.length}
          IntervalTime={6000}
          transitionTime={1000}
        />
      </Chapter>
      <Chapter>
        <Title> 기술 스택 </Title>
      </Chapter>
      <Chapter>
        <Title> 자기 소개 </Title>
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
`;
const Chapter = styled.section`
  background: #f6efe5;
  height: 600px;
  width: 100%;
  position: relative;
`;
const Title = styled(CF.RowCenterDiv)`
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px 0px;
  font-size: 32px;
  color: black;
  font-family: ${theme.customFonts.GmarketSansBold};
`;
