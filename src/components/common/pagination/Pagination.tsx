import styled from "styled-components";
import { MouseEvent, useState } from "react";
import theme from "@/styles/theme";

interface IPaginationProps {
  refetch: any;
  endPage: number;
  currentPage: number;
}

const Pagination = ({ refetch, endPage, currentPage }: IPaginationProps) => {
  // 페이지 1개당 보여줄 갯수
  const [perPageCount, setPerPageCount] = useState(10); // eslint-disable-line no-unused-vars
  // 마지막 페이지
  const [startPage, setStartPage] = useState(1);
  // const [currentPage, setCurrentPage] = useState(1);
  // const endPage = Math.ceil(Number(pageCount) / perPageCount);

  // 아래 보여줄 페이지 번호들
  const movePage = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.id === "prev") {
      setStartPage((prev) => (prev > 10 ? prev - 10 : 1));
      refetch({ page: currentPage > 10 ? currentPage - 10 : 1 });
    } else if (event.currentTarget.id === "morePrev") {
      setStartPage(1);
      refetch({ page: 1 });
    } else if (event.currentTarget.id === "next") {
      setStartPage((prev) => (prev + 10 <= endPage ? prev + 10 : endPage));
      refetch({
        page: currentPage + 10 <= endPage ? currentPage + 10 : endPage,
      });
    } else if (event.currentTarget.id === "moreNext") {
      if (endPage % 10 === 0) {
        const temp = endPage - 9;
        setStartPage(temp);
        refetch({ page: temp });
      } else {
        const temp = endPage - (endPage % 10) + 1;
        setStartPage(temp);
        refetch({ page: temp });
      }
    } else {
      if (event.target instanceof Element) {
        refetch({ page: Number(event.target.id) });
      }
    }
  };

  return (
    <Container>
      {currentPage > 10 && (
        <MoveButton id="morePrev" onClick={movePage}>
          ◀◀
        </MoveButton>
      )}
      {currentPage !== 1 && (
        <MoveButton id="prev" onClick={movePage}>
          ◀
        </MoveButton>
      )}
      {new Array(10).fill(1).map(
        (_, index) =>
          Number(index) + Number(startPage) <= Number(endPage) && (
            <PageNumberButton
              key={index + startPage}
              id={String(startPage + index)}
              onClick={movePage}
              isActive={startPage + index === (currentPage || 1)}
            >
              {index + startPage}
            </PageNumberButton>
          )
      )}

      {startPage + 10 > endPage || (
        <MoveButton id="next" onClick={movePage}>
          ▶
        </MoveButton>
      )}
      {startPage + 10 > endPage || (
        <MoveButton id="moreNext" onClick={movePage}>
          ▶▶
        </MoveButton>
      )}
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;

  button {
    width: 30px;
    aspect-ratio: 1;
    height: 100%;
    /* border: 1px solid black; */
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    &:hover {
      background: black;
      color: white;
      border-radius: 25%;
    }

    @media (max-width: 600px) {
      width: 26px;
    }
  }
`;
const PageNumberButton = styled.button<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? "red" : "black")};
  font-size: ${(props) => (props.isActive ? "24px" : "16px")};
  font-family: ${theme.customFonts.CookieRunRegular};
`;
const MoveButton = styled.button``;
