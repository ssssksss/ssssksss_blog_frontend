import { getBlogCategoryListAPI } from '@api/BlogAPI';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import UrlQueryStringToObject from '@utils/function/UrlQueryStringToObject';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import BlogFirstCategoryContainer from '../BlogFirstCategory/BlogFirstCategoryContainer';
import { changeBlogUrlString } from '../function/changeUrl';
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
        rootActions.blogStore.setActiveFirstCategoryId(_firstCategoryId),
      );
      store.dispatch(
        rootActions.blogStore.setActiveSecondCategoryId(_secondCategoryId),
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
    let _firstCategoryId = queryStringObject?.firstCategoryId;
    let _secondCategoryId = queryStringObject?.secondCategoryId;
    if (!Number(_firstCategoryId)) {
      _firstCategoryId = null;
    }
    if (!Number(_secondCategoryId)) {
      _secondCategoryId = null;
    }

    getBlogCategoryListAPI(_firstCategoryId, _secondCategoryId)
      .then((res) => {
      if (!Number(_firstCategoryId)) {
        _firstCategoryId = 0;
      }
      if (!Number(_secondCategoryId)) {
        _secondCategoryId = 0;
      }
        const _blogFirstCategoryList = res?.data?.data?.blogFirstCategoryList;
        const _blogList = res?.data?.data?.blogList; // 초기에 받아온 blogList
        // 카테고리 상태 관련 저장
        store.dispatch(
          rootActions.blogStore.setBlogCategoryList(_blogFirstCategoryList),
        );
        // [1] 1,2번째 카테고리 ID가 있는 경우, 검증 하기
        if (_firstCategoryId && _secondCategoryId) {
            const validateFirstCategoryId = _blogFirstCategoryList.filter(
              (i: { id: number }) => i.id == _firstCategoryId,
            )[0];
          if (validateFirstCategoryId == undefined) {
            _firstCategoryId = 0;
            _secondCategoryId = 0;
            store.dispatch(
              rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
                type: 'info',
                message: '잘못된 카테고리 ID 값입니다.',
              }),
            );
          }
          
          if (validateFirstCategoryId != undefined) {
            const validateSecondCategoryId = validateFirstCategoryId.blogSecondCategoryList.filter(
              (i: { id: number }) => i.id == _secondCategoryId,
            )[0];
            if (validateSecondCategoryId == undefined) {
              _secondCategoryId = 0;
              store.dispatch(
                rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
                  type: 'info',
                  message: '잘못된 카테고리 ID 값입니다.',
                }),
              );
            }
          }
        }

        // [1] 1번째 카테고리 ID만 맞는경우
        if (_firstCategoryId && _secondCategoryId == 0) {
          _firstCategoryId =
            _blogFirstCategoryList?.filter(
              (i: { id: number }) => i.id == _firstCategoryId,
            )[0]?.id ?? 0;
          // 2번째 카테고리는 인덱스 0번째로 설정
          try {

            _secondCategoryId =
          _blogFirstCategoryList?.filter(
            (i: { id: number }) => i.id == _firstCategoryId,
          )[0]?.blogSecondCategoryList[0]?.id ?? 0;
          } catch {
            _secondCategoryId = 0;
          }
        }

        // [2] 둘다 틀린 경우
        if (_firstCategoryId == 0) {
          try {
            _firstCategoryId = _blogFirstCategoryList[0]?.id ?? 0;
          }
          catch {
            _firstCategoryId = 0;
          }
          try {
            _secondCategoryId =
            _blogFirstCategoryList[0]?.blogSecondCategoryList[0]?.id ?? 0;
          }
          catch {
            _secondCategoryId = 0;
          }
        }

        // 1번째 카테고리 상태값 저장, 2번째 카테고리 상태값 저장
        store.dispatch(
          rootActions.blogStore.setActiveFirstCategoryId(_firstCategoryId),
        );
        store.dispatch(
          rootActions.blogStore.setActiveSecondCategoryId(_secondCategoryId),
        );
        store.dispatch(
          rootActions.blogStore.setActiveSecondCategoryList(
            _blogFirstCategoryList?.filter(
              (i: { id: number }) => i.id == _firstCategoryId,
            )[0]?.blogSecondCategoryList ?? [],
          ),
        );

        // 블로그 리스트 저장
        if (_secondCategoryId) {
          store.dispatch(
            rootActions.blogStore.setBlogList({
              ...store.getState().blogStore.blogList,
              [_secondCategoryId]: _blogList,
            }),
          );
        }

        router.replace(
          changeBlogUrlString(
            Number(_firstCategoryId),
            Number(_secondCategoryId),
          ),
          '',
          {
            shallow: true,
          },
        );
      })
      .catch((err) => {
        console.log('BlogCategoryContainer.tsx 파일 : ', err);
        router.push('/500');
      });
  }, []);

  return (
    <div
      className={
        'w-full py-[.25rem] px-[.5rem] outline outline-[1px] outline-offset-[-1px] flex flex-col gap-[.125rem] rounded-lg'
      }
    >
      <BlogFirstCategoryContainer />
      <BlogSecondCategoryContainer />
    </div>
  );
};
export default BlogCategoryContainer;
