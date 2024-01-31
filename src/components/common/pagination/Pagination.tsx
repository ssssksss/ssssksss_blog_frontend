import styled from '@emotion/styled';
import { MouseEvent, useState } from 'react';
import { commonTheme } from '@/styles/theme';
import { Icons } from '@/components/common/icons/Icons';
import Image from 'next/image';
import { Button } from '@/components/common/button/Button';

interface IPaginationProps {
  refetch: any;
  endPage: number;
  currentPage: number;
}

// 상태값 예시
// const [paginationParameters, setPaginationParameters] = useState({
//   searchKeyword: "",
//   pageIndex: 1,
//   sizePerPage: 10,
//   sortBy: router.query.sort || 'baseTimeEntity.createdAt',
// });
// const [result,setResult] = useState({
//   data: [],
//   totalNumber: 100;
//   searchKeyword: "",
// })

/**
 *
 * @param refetch 페이지를 갱신할 함수
 * @example ={({ page }: any) => { pageHandler(page);}}
 * @param endPage
 * @example ={Math.ceil(pageCount / size)}
 * @param currentPage
 * @example ={Number(page)}
 * @handler
 */
const Pagination = ({ refetch, endPage, currentPage }: IPaginationProps) => {
  // 페이지 1개당 보여줄 갯수
  const [perPageCount, setPerPageCount] = useState(10); // eslint-disable-line no-unused-vars
  // 마지막 페이지
  const [startPage, setStartPage] = useState(1);
  // const [currentPage, setCurrentPage] = useState(1);
  // const endPage = Math.ceil(Number(pageCount) / perPageCount);

  // 아래 보여줄 페이지 번호들
  const movePage = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.id === 'prev') {
      setStartPage(prev => (prev > 10 ? prev - 10 : 1));
      refetch({ page: currentPage > 10 ? currentPage - 10 : 1 });
    } else if (event.currentTarget.id === 'morePrev') {
      setStartPage(1);
      refetch({ page: 1 });
    } else if (event.currentTarget.id === 'next') {
      setStartPage(prev => (prev + 10 <= endPage ? prev + 10 : endPage));
      refetch({
        page: currentPage + 10 <= endPage ? currentPage + 10 : endPage,
      });
    } else if (event.currentTarget.id === 'moreNext') {
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
      {new Array(10).fill(1).map(
        (_, index) =>
          Number(index) + Number(startPage) <= Number(endPage) && (
            <PageNumberButton
              key={index + startPage}
              id={String(startPage + index)}
              onClick={movePage}
              isActive={startPage + index === Number(currentPage || 1)}
            >
              {index + startPage}
            </PageNumberButton>
          )
      )}

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
  gap: 2px;
  width: 100%;

  @media (min-width: 400px) {
    gap: 4px;
  }

  button {
    width: calc(100% / 15);
    max-width: 24px;
    max-height: 24px;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const PageNumberButton = styled(Button)<{ isActive: boolean }>`
  color: ${props => (props.isActive ? props.theme.main.primary100 : 'black')};
  font-size: ${props => (props.isActive ? '1.4em' : '0.8em')};
  font-weight: ${props => props.isActive && 600};
`;
const MoveButton = styled.button``;
