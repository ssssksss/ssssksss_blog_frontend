import Button from '@components/common/button/Button';
import { Icons } from '@components/common/icons/Icons';
import styled from '@emotion/styled';
import Image from 'next/image';
import { MouseEvent, useState } from 'react';

interface IPaginationProps {
  refetch: (_page: number) => void;
  endPage: number;
  currentPage: number;
}

/**
 *
 * @param refetch 페이지를 갱신할 함수
 * @example ={({ page }: unknown) => { pageHandler(page);}}
 * @param endPage
 * @example ={Math.ceil(pageCount / size)}
 * @param currentPage
 * @example ={Number(page)}
 * @handler
 */
const Pagination = ({ refetch, endPage, currentPage }: IPaginationProps) => {
  // 모든 값은 1을 기준으로 한다.
  const [startPage, setStartPage] = useState(
    Math.floor(currentPage / 10) * 10 + 1,
  );
  // 아래 보여줄 페이지 번호들
  const movePage = (event: MouseEvent<HTMLButtonElement>, page?: number) => {
    if (event.currentTarget.id === 'prev') {
      setStartPage((prev) => (prev > 10 ? prev - 10 : 1));
      refetch(currentPage > 10 ? currentPage - 10 : 1);
    } else if (event.currentTarget.id === 'morePrev') {
      setStartPage(1);
      refetch(1);
    } else if (event.currentTarget.id === 'next') {
      setStartPage((prev) => (prev + 10 <= endPage ? prev + 10 : endPage));
      refetch(currentPage + 10 <= endPage ? currentPage + 10 : endPage);
    } else if (event.currentTarget.id === 'moreNext') {
      if (endPage % 10 === 0) {
        const temp = endPage - 9;
        setStartPage(temp);
        refetch(temp);
      } else {
        const temp = endPage - (endPage % 10) + 1;
        setStartPage(temp);
        refetch(temp);
      }
    } else {
      if (event.target instanceof Element) {
        refetch(Number(page));
      }
    }
  };

  return (
    <Container>
      {currentPage > 10 ? (
        <MoveButton id="morePrev" onClick={movePage}>
          <Image src={Icons.LeftDoubleArrowIcon} alt="" />
        </MoveButton>
      ) : (
        <MoveButton style={{ visibility: 'hidden' }}> 히든 </MoveButton>
      )}
      {currentPage > 1 ? (
        <MoveButton id="prev" onClick={movePage}>
          <Image src={Icons.LeftArrowIcon} alt="" />
        </MoveButton>
      ) : (
        <MoveButton style={{ visibility: 'hidden' }}> 히든 </MoveButton>
      )}
      {
        new Array(10).fill(1).map(
          (_, index) =>
            Number(index + startPage) <= Number(endPage) && (
              <PageNumberButton
              key={index + startPage}
              onClick={(event: MouseEvent<HTMLButtonElement>) => {
                movePage(event, index + startPage);
              }}
              isActive={startPage + index === Number(currentPage + 1)}
              >
                  {index + startPage}
                </PageNumberButton>
              ),
            )
          }

      {startPage + 10 < endPage ? (
        <MoveButton id="next" onClick={movePage}>
          <Image src={Icons.RightArrowIcon} alt="" />
        </MoveButton>
      ) : (
        <MoveButton style={{ visibility: 'hidden' }}> 히든 </MoveButton>
      )}
      {startPage + 10 < endPage ? (
        <MoveButton id="moreNext" onClick={movePage}>
          <Image src={Icons.RightDoubleArrowIcon} alt="" />
        </MoveButton>
      ) : (
        <MoveButton style={{ visibility: 'hidden' }}> 히든 </MoveButton>
      )}
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  width: 100%;

  @media (min-width: 40rem) {
    gap: 0.4rem;
  }

  button {
    width: calc(100% / 15);
    max-width: 2.4rem;
    max-height: 2.4rem;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const PageNumberButton = styled(Button)<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? props.theme.main.primary100 : 'black')};
  font-size: ${(props) => (props.isActive ? '1.4em' : '0.8em')};
  font-weight: ${(props) => props.isActive && 600};
`;
const MoveButton = styled.button``;
