import styled from '@emotion/styled';
import Layout1 from '@/components/layout/Layout1';
import { CC } from '@/styles/commonComponentStyle';
import { Input } from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';
import Dropdown from '@/components/common/dropdown/Dropdown';
import { Icons } from '@/components/common/icons/Icons';
import Pagination from '@/components/common/pagination/Pagination';
import { useEffect, useRef, useState } from 'react';
import { BoardAPI } from '@/api/BoardAPI';
import { useRouter } from 'next/router';
import { dateFormat4y2m2d } from '@/utils/function/dateFormat';
import { useLoading } from '@/src/hooks/useLoading';
import { Viewer } from '@toast-ui/react-editor';
import { LoadingComponent } from '@/components/common/loading/LoadingComponent';
import Link from 'next/link';
import Image from 'next/image';
import { RootState } from '@/redux/store/reducers';
import { useSelector } from 'react-redux';
import timeFromToday from '@/utils/function/timeFromToday';
import UrlQueryStringToObject from '@/utils/function/UrlQueryStringToObject';
import Select from '@/components/common/select/Select';
import BoardHeaderContainer from '@/components/board/BoardHeaderContainer';
import BoardMainContainer from './../../src/components/board/BoardMainContainer';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file index.tsx
 * @version 0.0.1 "2023-09-25 00:05:43"
 * @description 설명
 */
const Index = () => {
  const router = useRouter();
  const authStore = useSelector((state: RootState) => state.authStore);
  const [boardList, setBoardList] = useState([]);
  const [boardCount, setBoardCount] = useState([]);
  // const [isLoading, loadingFunction] = useLoading();
  // let urlPage = router.query.page
  //   ? 'page=' + router.query.page + '&'
  //   : 'page=1&';
  // let urlSize = router.query.size
  //   ? 'size=' + router.query.size + '&'
  //   : 'size=10&';
  // let urlKeyword = router.query.keyword
  //   ? 'keyword=' + router.query.keyword + '&'
  //   : '';
  // let urlSort = router.query.sort ? 'sort=' + router.query.sort : 'sort=latest';

  // useEffect(() => {
  //   if (!router.isReady) return;
  //   urlPage = router.query.page ? 'page=' + router.query.page + '&' : 'page=1&';
  //   urlSize = router.query.size
  //     ? 'size=' + router.query.size + '&'
  //     : 'size=10&';
  //   urlKeyword = router.query.keyword
  //     ? 'keyword=' + router.query.keyword + '&'
  //     : '';
  //   urlSort = router.query.sort ? 'sort=' + router.query.sort : 'sort=latest';
  //   keywordRef.current.value =
  //     router.query.keyword === undefined ? '' : router.query.keyword;
  //   BoardAPI.getBoardListData({
  //     keyword: router.query.keyword,
  //     page: router.query.page - 1,
  //     size: router.query.size,
  //     sort: router.query.sort,
  //   })
  //     .then(res => {
  //       setBoardList(res.data?.boardList);
  //       setBoardCount(res.data?.boardCount);
  //       const url = `/board?${urlPage}${urlSize}${urlKeyword}${urlSort}`;
  //       router.replace(url, '', { shallow: true });
  //     })
  //     .catch(err => {});
  // }, [router.isReady]);

  // const changePage = (props: { page: number }) => {
  //   loadingFunction(
  //     BoardAPI.getBoardListData({
  //       keyword: router.query.keyword,
  //       page: props.page - 1,
  //       size: router.query.size,
  //       sort: router.query.sort,
  //     })
  //   ).then(res => {
  //     setBoardList(res.data.boardList);
  //     setBoardCount(res.data.boardCount);
  //     const url = `/board?page=${props.page}&${urlSize}${urlKeyword}${urlSort}`;
  //     router.replace(url, '', { shallow: true });
  //     urlPage = props.page;
  //   });
  // };

  return (
    <Container>
      <BoardHeaderContainer />
      <BoardMainContainer />
    </Container>
  );
};
export default Index;
Index.layout = Layout1;

const Container = styled(CC.ColumnDiv)`
  width: 100%;
  height: calc(100vh - 68px);
  gap: 10px;
  background: ${props => props.theme.main.contrast};
  border-radius: 10px;
  padding: 4px;
`;
