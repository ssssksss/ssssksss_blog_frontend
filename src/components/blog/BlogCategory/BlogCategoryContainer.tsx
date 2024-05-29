import { BlogFirstCategoryModal } from '@components/blog/BlogFirstCategory/BlogFirstCategoryModal';
import BlogSecondCategoryModal from '@components/blog/BlogSecondCategory/BlogSecondCategoryModal';
import Button from '@components/common/button/Button';
import ModalButton from '@components/common/button/ModalButton';
import styled from '@emotion/styled';
import SettingsIcon from '@mui/icons-material/Settings';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import AxiosInstance from '@utils/axios/AxiosInstance';
import UrlQueryStringToObject from '@utils/function/UrlQueryStringToObject';
import { useRouter } from 'next/router';
import { MouseEvent, useEffect, useRef } from 'react';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogCategoryContainer.tsx
 * @version 0.0.1 "2024-01-25 05:49:05"
 * @description 설명
 */

const BlogCategoryContainer = () => {
  const router = useRouter();
  const blogFirstCategoryVerticalScrollRef = useRef<HTMLButtonElement>(null);
  const blogSecondCategoryVerticalScrollRef = useRef<HTMLButtonElement>(null);
  const authStore = useSelector((state: RootState) => state.authStore);
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const queryClient = useQueryClient();
  const _categoryPath = (firstId: unknown, secondId: unknown) => {
    return (
      window.document.location.origin +
      window.document.location.pathname +
      '?firstCategoryId=' +
      firstId +
      '&secondCategoryId=' +
      secondId
    );
  };

  const blogFirstCategoryHandler = (id: string) => {
    store.dispatch(rootActions.blogStore.setActiveFirstCategory(id));
    const secondCategoryId = blogStore.blogCategoryAndBlogList.filter(
      (i) => i.id == id,
    )[0]?.blogSecondCategoryList[0].id;
    store.dispatch(
      rootActions.blogStore.setActiveSecondCategory(secondCategoryId),
    );
    // router.push(_categoryPath(id,secondCategoryId), '', { shallow: true });
    const _secondCategoryList = blogStore.blogCategoryAndBlogList.filter((i) => i.id == id)[0]
      .blogSecondCategoryList[0];
     if (!_secondCategoryList?.blogList?.length) {
       // blogList가 0인 경우에만 데이터를 요청한다.
       queryClient.fetchQuery(
         [
           'blogList',
           id,
           _secondCategoryList.id,
         ],
         () => {
           AxiosInstance({
             url: '/api/blog/list',
             method: 'GET',
             params: {
               sort:
                 blogStore.blogListOrderOption || 'baseTimeEntity.modifiedAt',
               secondCategoryId: _secondCategoryList.id,
             },
           }).then((res) => {
             const temp = JSON.parse(
               JSON.stringify(blogStore.blogCategoryAndBlogList)
             );
             temp.map((i) => {
               if (i.id == id) {
                 i.blogSecondCategoryList.map((j) => {
                   if (j.id == _secondCategoryList.id) {
                     j.blogList = [...res.data.data];
                   }
                 });
               }
             });
             store.dispatch(
               rootActions.blogStore.setBlogCategoryAndBlogList(temp),
             );
             return res.data;
           });
         },
       );
     }
    store.dispatch(
      rootActions.blogStore.setActiveSecondCategory(_secondCategoryList.id),
    );
    router.push(_categoryPath(id, _secondCategoryList.id), '', {
      shallow: true,
    });
  };
  const blogSecondCategoryHandler = (id: string) => {
    if (
      // TODO : 나중에 블로그 플랫폼이 될 경우에는 변경이 필요할 수 있는 부분
      authStore.role == "ROLE_ADMIN" ||
      blogStore.blogCategoryAndBlogList
        .filter((i) => i.id == blogStore.activeFirstCategory)[0]
        ?.blogSecondCategoryList.filter((j) => j.id == id)[0]?.blogList
        ?.length !=
      blogStore.blogCategoryAndBlogList
        .filter((i) => i.id == blogStore.activeFirstCategory)[0]
        ?.blogSecondCategoryList.filter((j) => j.id == id)[0]?.blogCount
    ) {
      // blogList가 0인 경우에만 데이터를 요청한다.
      queryClient.fetchQuery(
        [
          'blogList',
          blogStore.activeFirstCategory,
          blogStore.activeSecondCategory,
        ],
        () => {
          AxiosInstance({
            url: '/api/blog/list',
            method: 'GET',
            params: {
              sort:
                blogStore.blogListOrderOption || 'baseTimeEntity.modifiedAt',
              secondCategoryId: id,
            },
          }).then((res) => {
            const temp = JSON.parse(
              JSON.stringify(blogStore.blogCategoryAndBlogList),
            );
            temp.map((i) => {
              if (i.id == blogStore.activeFirstCategory) {
                i.blogSecondCategoryList.map((j) => {
                  if (j.id == id && res.data.data != null) {
                    j.blogList = [...res.data.data];
                  }
                });
              }
            });
            store.dispatch(
              rootActions.blogStore.setBlogCategoryAndBlogList(temp),
            );
            return res.data;
          });
        },
      );
    }
    store.dispatch(
      rootActions.blogStore.setActiveSecondCategory(id),
    );
    router.push(_categoryPath(blogStore.activeFirstCategory, id), '', { shallow: true });
  };
  // 카테고리 버튼 클릭시 가로 스크롤 버튼을 중앙으로 이동
  const onClickAdjustHorizontalScroll = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    handler: () => void,
    ref: React.MutableRefObject<HTMLButtonElement>,
  ) => {
    handler();
    if (ref.current) {
      ref.current.scrollLeft =
        e.currentTarget.offsetLeft +
        e.currentTarget.offsetWidth / 2 -
        (e.currentTarget.offsetParent as HTMLElement).offsetWidth / 2;
    }
  };

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

  return (
    <CC.ColLeftStartBox w={'100%'} pd={'0.5rem'} outline={1} gap={8}>
      {/* 첫번째 카테고리 라인 */}
      <CategoryBoxStyle
        scroll={'hiddenX'}
        gap={8}
        ref={blogFirstCategoryVerticalScrollRef}
      >
        {blogStore.blogCategoryAndBlogList?.map((el) => (
          <Button
            key={el.id}
            minW={'8rem'}
            h={'2.75rem'}
            mg={'0.5rem 0rem'}
            active={el.id == store.getState().blogStore.activeFirstCategory}
            outline={true}
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
              onClickAdjustHorizontalScroll(
                e,
                () => blogFirstCategoryHandler(el.id),
                blogFirstCategoryVerticalScrollRef,
              )
            }
            badgeValue={el.blogSecondCategoryList.reduce(
              (sum, el) => sum + el.blogCount,
              0,
            )}
          >
            {el.name}
          </Button>
        ))}
        {authStore.role == 'ROLE_ADMIN' && (
          <ModalButton
            modal={<BlogFirstCategoryModal />}
            modalOverlayVisible={true}
            modalW={'30rem'}
            h={'2.75rem'}
            outline={true}
            modalBg={'white'}
          >
            <CC.ImgContainer w={'2.4rem'} h={'2.4rem'}>
              <SettingsIcon />
            </CC.ImgContainer>
          </ModalButton>
        )}
      </CategoryBoxStyle>
      {/* 두번째 카테고리 라인 */}
      <CategoryBoxStyle
        scroll={'hiddenX'}
        gap={8}
        ref={blogSecondCategoryVerticalScrollRef}
      >
        {blogStore.blogCategoryAndBlogList
          ?.filter(
            (i) => i.id == store.getState().blogStore.activeFirstCategory,
          )[0]
          ?.blogSecondCategoryList.map((j) => (
            <Button
              key={j.id}
              minW={'8rem'}
              mg={'0.5rem 0rem'}
              h={'2rem'}
              pd={"0rem 0.25rem"}
              active={j.id == blogStore.activeSecondCategory}
              onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
                onClickAdjustHorizontalScroll(
                  e,
                  () => blogSecondCategoryHandler(j.id),
                  blogSecondCategoryVerticalScrollRef,
                )
              }
              outline={true}
              outlineColor={'secondary80'}
              badgeValue={j.blogCount || '0'}
            >
              {j.name}
            </Button>
          ))}
        {authStore.role == 'ROLE_ADMIN' && (
          <ModalButton
            modal={<BlogSecondCategoryModal />}
            modalOverlayVisible={true}
            modalW={'30rem'}
            h={'2rem'}
            outline={true}
            modalBg={'white'}
          >
            <CC.ImgContainer w={'2.4rem'} h={'2.4rem'}>
              <SettingsIcon />
            </CC.ImgContainer>
          </ModalButton>
        )}
      </CategoryBoxStyle>
    </CC.ColLeftStartBox>
  );
};
export default BlogCategoryContainer;

const CategoryBoxStyle = styled(CC.RowLeftStartBox)`
  padding: 0.5rem 0rem 0rem 0rem;
  & > button {
    width: max-content;
    flex-shrink: 0;
  }
`;
