import BasicCarousel from "@/components/common/carousel/BasicCarousel";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import BlogFirstMenu from "@/components/blog/BlogUI/BlogFirstMenu";
import theme from "@/styles/theme";

/**
 * Author : Sukyung Lee
 * FileName: ModalAdvertise.tsx
 * Date: 2022-10-14 08:24:43
 * Description :
 */

const AdvertisementContainer = () => {
  const testRef = useRef<any>();
  useEffect(() => {
    var win = window.open(
      "",
      "_blank",
      "width=700, height=800, top=50%, left=50%"
    );
    win?.document.body.appendChild(testRef.current);
  }, []);
  const test = "/img/backgroundImage/원피스.jpg";
  return (
    <Container
      ref={testRef}
      style={{
        backgroundSize: "100%",
        backgroundColor: `${theme.backgroundColors.background2}`,
        width: "100%",
        maxWidth: "600px",
        padding: "40px 20px 20px",
        margin: "40px auto 0px",
      }}
    >
      <div>
        <p>
          아직 블로그라기 보다는 개발 공부한 내용들을 모아놓은 보관함 같은
          곳입니다.
        </p>
        <p>
          ui와 스타일을 잡아야 하지만 공부하고 정리하고 기록하는데 바쁘고 이전
          내용도 옮기고 정리해야되서 계속 밀리고 있습니다.
        </p>
        <p>
          또한 제가 필요한 코드들을 정리해놓아서 다른 사람이 참고하기에는 아직
          좋은 글로 정리가 되어있지 않습니다.
        </p>
        <p>
          최종적인 블로그의 목표는 모두가 보기 좋은 글을 작성하고 정리하고
          코드와 작동예시들을 보여주면서 설명을 하려고 하고 있습니다.
        </p>
        <p>
          댓글이나 좋아요, 추천글 등등은 계획에 있지 않으며 일단 ui,스타일,글
          정리 이후에 고민해나가려고 합니다.
        </p>
        <p>
          아직 많이 부족해서 블로그로 보기에는 힘들지만 계속 발전해나가겠습니다.
        </p>
        <p style={{ textAlign: "center" }}> - 가출한 토토로 - </p>
      </div>
    </Container>
  );
};
export default AdvertisementContainer;
const Container = styled.div``;
