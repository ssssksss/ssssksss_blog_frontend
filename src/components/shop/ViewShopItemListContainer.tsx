import { animationKeyFrames } from "@/styles/commonAnimationKeyFrames";
import { CF } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";
import styled from "styled-components";
import Button from "../common/button/Button";
import InputSearch from "../common/input/InputSearch";
import Pagination from "../common/pagination/Pagination";
/**
 * Author : Sukyung Lee
 * FileName: ViewShopItemListContainer.tsx
 * Date: 2022-09-23 23:55:51
 * Description :
 */
const ViewShopItemListContainer = () => {
  return (
    <Container>
      <Header>
        <h1> 게시판 </h1>
      </Header>
      <CF.RowCenterDiv>
        <CF.ColumnDiv width={"100%"}>
          <MainHeader>
            <InputSearch
              width={"300px"}
              height={"30px"}
              img={"/img/ui-icon/search_icon.png"}
            />
            <select name="area">
              <option value="100"> 최신순 </option>
              <option value="500"> 인기순 </option>
              <option value="1000"> 조회순 </option>
            </select>
          </MainHeader>
          <Main>
            {new Array(20).fill(1).map((el: any, index: number) => (
              <ShopItem key={index}> 1 </ShopItem>
            ))}
          </Main>
        </CF.ColumnDiv>
      </CF.RowCenterDiv>
      <MainFooter>
        <Pagination refetch={() => ""} endPage={21} currentPage={1} />
        <CF.RowRightDiv padding={"0px 10px 0px 0px"}>
          <Button width="100px"> 상품 등록하기 </Button>
        </CF.RowRightDiv>
      </MainFooter>
    </Container>
  );
};
export default ViewShopItemListContainer;
const Container = styled.div`
  width: 100%;
  background: #aeaeae;
  margin: 20px 0px 10px 0px;
  display: flex;
  flex-flow: nowrap column;
`;
const Header = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
`;
const MainHeader = styled(CF.RowDiv)`
  max-width: 1180px;
  margin: auto;
  align-items: center;
  gap: 10px;
  padding: 0px 20px;
  justify-content: space-between;
  height: 60px;

  & > select {
    height: 30px;
    width: 100px;
  }
`;
const Main = styled.main`
  padding: 20px 10px;
  gap: 10px;
  display: grid;
  justify-content: center;
  overflow-y: scroll;

  @media (min-width: 1180px) {
    // 1100 + 40 + 20 + 20
    grid-template-columns: repeat(5, minmax(220px, auto));
    animation: ${animationKeyFrames.Fadein} 0.5s linear;
  }

  @media (max-width: 1180px) {
    // 880 + 30 + 20 + 20
    grid-template-columns: repeat(4, minmax(220px, auto));
    animation: ${animationKeyFrames.Fadein} 0.6s linear;
  }

  @media (max-width: 950px) {
    // 660 + 20 + 20 + 20
    grid-template-columns: repeat(3, minmax(220px, auto));
    animation: ${animationKeyFrames.Fadein} 0.5s linear;
  }

  @media (max-width: 720px) {
    // 660 + 20 + 20 + 20
    grid-template-columns: repeat(2, minmax(220px, auto));
    animation: ${animationKeyFrames.Fadein} 0.6s linear;
  }
`;
const ShopItem = styled.div`
  height: 240px;
  background: blue;
`;

const MainFooter = styled(CF.ColumnDiv)`
  position: sticky;
  display: flex;
  align-items: center;
  padding: 20px 0px;
  gap: 10px;
  bottom: 0px;
  background-color: rgba(255, 255, 255, 0.5);
`;
