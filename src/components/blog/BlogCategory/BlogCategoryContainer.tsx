import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import AxiosInstance from '@utils/axios/AxiosInstance';
import UrlQueryStringToObject from '@utils/function/UrlQueryStringToObject';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import BlogFirstCategoryContainer from '../BlogFirstCategory/BlogFirstCategoryContainer';
import BlogSecondCategoryContainer from './../BlogSecondCategory/BlogSecondCategoryContainer';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogCategoryContainer.tsx
 * @version 0.0.1 "2024-01-25 05:49:05"
 * @description 설명
 */

const BlogCategoryContainer = () => {
  const router = useRouter();
  useEffect(() => {
    const routerBackAfterActiveCategoryChangeHandler = () => {
      const _firstCategoryId = UrlQueryStringToObject()?.['firstCategoryId'];
      const _secondCategoryId = UrlQueryStringToObject()?.['secondCategoryId'];
      store.dispatch(
        rootActions.blogStore.setActiveFirstCategory(_firstCategoryId),
      );
      store.dispatch(
        rootActions.blogStore.setActiveSecondCategory(_secondCategoryId),
      );
    };
    window.addEventListener(
      'popstate',
      routerBackAfterActiveCategoryChangeHandler,
    );
    return () => {
      window.removeEventListener(
        'popstate',
        routerBackAfterActiveCategoryChangeHandler,
      );
    };
  }, []);
  
  useEffect(() => {
    const queryStringObject = UrlQueryStringToObject(window.location.href);
    let firstCategoryId = queryStringObject?.firstCategoryId ?? 0;
    let secondCategoryId = queryStringObject?.secondCategoryId ?? 0;
    AxiosInstance({
      url: '/api/blog/category/list',
      method: 'GET',
      params: {
        firstCategoryId: firstCategoryId || null, 
        secondCategoryId: secondCategoryId || null,
      },
      withCredentials: true,
    }).then((res) => {
      const _blogFirstCategoryList =
        res.data?.data?.data?.blogFirstCategoryList;
      const _blogList = res.data?.data?.blogList;
      // 카테고리 상태 관련 저장
      store.dispatch(
        rootActions.blogStore.setBlogCategoryList(_blogFirstCategoryList),
      );
      store.dispatch(
        rootActions.blogStore.setActiveSecondCategoryList(
          _blogFirstCategoryList?.filter(
            (i: { id: number }) => i.id == secondCategoryId,
          )[0]?.blogSecondCategoryList,
        ),
      );
      if (firstCategoryId == 0) {
        firstCategoryId = _blogFirstCategoryList[0].id ?? 0;
      }
      store.dispatch(
        rootActions.blogStore.setActiveFirstCategory(firstCategoryId),
      );
      if (secondCategoryId == 0) {
        secondCategoryId =
          _blogFirstCategoryList[0]?.blogSecondCategoryList[0]?.id;
      }
      store.dispatch(
        rootActions.blogStore.setActiveSecondCategoryList(
          _blogFirstCategoryList[0].blogSecondCategoryList,
        ),
      );
      store.dispatch(
        rootActions.blogStore.setActiveSecondCategory(secondCategoryId),
      );
      // 블로그 리스트 저장
      store.dispatch(
        rootActions.blogStore.setBlogList({
          [secondCategoryId]: _blogList,
        }),
      );
    }).catch(err => {
      router.push("/500");
    });
  }, []);

  return (
    <div className={"w-full p-[.25rem] outline outline-[1px] outline-offset-[-1px] flex flex-col gap-[.125rem] rounded-lg"}>
        <BlogFirstCategoryContainer />
        <BlogSecondCategoryContainer />
    </div>
  );
};
export default BlogCategoryContainer;
