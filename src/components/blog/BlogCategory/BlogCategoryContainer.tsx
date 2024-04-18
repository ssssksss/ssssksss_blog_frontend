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
import UrlQueryStringToObject from '@utils/function/UrlQueryStringToObject';
import { useRouter } from 'next/router';
import { MouseEvent, useEffect, useRef } from 'react';
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

  const _categoryPath = (firstId: unknown, secondId: unknown) => {
    return (
      window.document.location.origin +
      window.document.location.pathname +
      '?first-category=' +
      firstId +
      '&second-category=' +
      secondId
    );
  };
  const blogFirstCategoryHandler = (id: string) => {
    store.dispatch(rootActions.blogStore.setActiveFirstCategory(id));
    store.dispatch(
      rootActions.blogStore.setActiveSecondCategory(
        Object.keys(blogStore.secondCategoryList[id])[0],
      ),
    );
    const _firstCategoryPath = _categoryPath(
      id,
      Object.keys(store.getState().blogStore.secondCategoryList[id])[0],
    );
    router.push(_firstCategoryPath, '', { shallow: true });
  };
  const blogSecondCategoryHandler = (id: string) => {
    const _secondCategoryPath = _categoryPath(
      store.getState().blogStore.activeFirstCategory,
      id,
    );
    router.push(_secondCategoryPath, '', { shallow: true });
    store.dispatch(rootActions.blogStore.setActiveSecondCategory(id));
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
      const _firstCategoryId = UrlQueryStringToObject()?.['first-category'];
      const _secondCategoryId = UrlQueryStringToObject()?.['second-category'];
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
        {Object.entries(blogStore.firstCategoryList)?.map(([key, value]) => (
          <Button
            key={key}
            minW={'8rem'}
            h={'2.75rem'}
            active={key == store.getState().blogStore.activeFirstCategory}
            outline={true}
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
              onClickAdjustHorizontalScroll(
                e,
                () => blogFirstCategoryHandler(key),
                blogFirstCategoryVerticalScrollRef,
              )
            }
            badgeValue={Object.entries(
              blogStore.secondCategoryList?.[key] || {},
            ).reduce((sum, [, value]) => sum + Number(value.count), 0)}
          >
            {value}
          </Button>
        ))}
        {authStore.role == 'ROLE_ADMIN' && (
          <ModalButton
            modal={<BlogFirstCategoryModal />}
            modalOverlayVisible={true}
            modalW={'30rem'}
            h={'2.75rem'}
            outline={true}
            modalBg={"white"}
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
        {Object.entries(
          blogStore.secondCategoryList[blogStore.activeFirstCategory] || {},
        ).map(([key, value]) => (
          <Button
            key={key}
            minW={'8rem'}
            h={'2rem'}
            active={key == blogStore.activeSecondCategory}
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
              onClickAdjustHorizontalScroll(
                e,
                () => blogSecondCategoryHandler(key),
                blogSecondCategoryVerticalScrollRef,
              )
            }
            outline={true}
            outlineColor={'secondary80'}
            badgeValue={value.count || '0'}
          >
            {value.name}
          </Button>
        ))}
        {authStore.role == 'ROLE_ADMIN' && (
          <ModalButton
            modal={<BlogSecondCategoryModal />}
            modalOverlayVisible={true}
            modalW={'30rem'}
            h={'2rem'}
            outline={true}
            modalBg={"white"}
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
