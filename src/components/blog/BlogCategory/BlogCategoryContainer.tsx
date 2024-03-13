import { BlogFirstCategoryModal } from '@components/blog/BlogFirstCategory/BlogFirstCategoryModal';
import BlogSecondCategoryModal from '@components/blog/BlogSecondCategory/BlogSecondCategoryModal';
import Button from '@components/common/button/Button';
import ModalButton from '@components/common/button/ModalButton';
import { Icons } from '@components/common/icons/Icons';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogCategoryContainer.tsx
 * @version 0.0.1 "2024-01-25 05:49:05"
 * @description 설명
 */

const BlogCategoryContainer = () => {
  const router = useRouter();
  const blogFirstCategoryVerticalScrollRef = useRef();
  const blogSecondCategoryVerticalScrollRef = useRef();
  const authStore = useSelector((state: RootState) => state.authStore);
  const blogStore1 = useSelector((state: RootState) => state.blogStore1);
  const blogFirstCategoryHandler = (props: any) => {
    store.dispatch(rootActions.blogStore1.setActiveFirstCategory(props.id));
    store.dispatch(
      rootActions.blogStore1.setActiveSecondCategory(
        Object.keys(blogStore1.secondCategoryList[props.id])[0],
      ),
    );

    let temp =
      window.document.location.origin +
      window.document.location.pathname +
      '?first-category=' +
      props.id +
      '&second-category=' +
      store.getState().blogStore1.secondCategoryList?.[props.id]?.id;
    router.replace(temp, '', { shallow: true });
  };

  const blogSecondCategoryHandler = (props: { id: string }) => {
    let temp =
      window.document.location.origin +
      window.document.location.pathname +
      '?first-category=' +
      store.getState().blogStore1.activeFirstCategory +
      '&second-category=' +
      props.id;
    router.replace(temp, '', { shallow: true });
    store.dispatch(rootActions.blogStore1.setActiveSecondCategory(props.id));
  };

  return (
    <Container>
      <BlogFirstCategoryContainer ref={blogFirstCategoryVerticalScrollRef}>
        {Object.entries(blogStore1.firstCategoryList)?.map(([key, value]) => (
          <Button
            key={key}
            minW={'80px'}
            active={key == store.getState().blogStore1.activeFirstCategory}
            outline={true}
            onClick={(e) => {
              blogFirstCategoryHandler({ id: key });
              blogFirstCategoryVerticalScrollRef.current.scrollLeft =
                e.target.offsetLeft +
                e.target.offsetWidth / 2 -
                e.target.offsetParent.offsetWidth / 2;
            }}
            badgeValue={Object.entries(
              blogStore1.secondCategoryList?.[key] || {},
            ).reduce((sum, [_, value]) => sum + Number(value.count), 0)}
          >
            {value}
          </Button>
        ))}
        {authStore.id == 13 && (
          <ModalButton
            modal={<BlogFirstCategoryModal />}
            modalOverlayVisible={true}
            modalW={'300px'}
            outline={true}
            style={{ flexShrink: 0 }}
          >
            <Image
              src={Icons.SettingIcon}
              alt=""
              width={'24px'}
              height={'24px'}
            />
          </ModalButton>
        )}
      </BlogFirstCategoryContainer>
      <BlogSecondCategoryContainer ref={blogSecondCategoryVerticalScrollRef}>
        {Object.entries(
          blogStore1.secondCategoryList[blogStore1.activeFirstCategory] || {},
        ).map(([key, value]) => (
          <Button
            key={key}
            minW={'80px'}
            active={key == blogStore1.activeSecondCategory}
            onClick={(e) => {
              blogSecondCategoryHandler({ id: key });
              blogSecondCategoryVerticalScrollRef.current.scrollLeft =
                e.currentTarget.offsetLeft +
                e.currentTarget.offsetWidth / 2 -
                e.currentTarget.offsetParent.offsetWidth / 2;
            }}
            outline={true}
            badgeValue={value.count || '0'}
          >
            {value.name}
          </Button>
        ))}
        {authStore.id == 13 && (
          <ModalButton
            modal={<BlogSecondCategoryModal />}
            modalOverlayVisible={true}
            modalW={'300px'}
            outline={true}
            style={{ flexShrink: 0 }}
          >
            <Image
              src={Icons.SettingIcon}
              alt=""
              width={'24px'}
              height={'24px'}
            />
          </ModalButton>
        )}
      </BlogSecondCategoryContainer>
    </Container>
  );
};
export default BlogCategoryContainer;

const Container = styled(CC.ColumnDiv)`
  gap: 4px;
  width: 100%;
  background: ${(props) => props.theme.main.primary20};
  border-radius: 10px;
  padding: 4px;
  position: relative;

  & > div {
    border-radius: 8px;
  }
`;

const BlogFirstCategoryContainer = styled(CC.RowDiv)`
  gap: 8px;
  display: flex;
  ${(props) => props.theme.scroll.hiddenY};
  padding: 8px 4px;
  background: ${(props) => props.theme.main.contrast};

  & > button {
    width: max-content;
    flex-shrink: 0;
  }

  @media screen (max-height: 600px) {
    flex-wrap: nowrap;
    ${(props) => props.theme.scroll.hiddenX};
  }

  ::-webkit-scrollbar {
    width: auto;
    height: 4px;
    display: contents;
    position: fixed;
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.main.secondary20};
    border-radius: 16px;
  }
`;

const BlogSecondCategoryContainer = styled(CC.RowDiv)`
  gap: 8px;
  padding: 8px 4px;
  flex-wrap: wrap;
  background: ${(props) => props.theme.main.contrast};
  width: 100%;

  & > button {
    width: max-content;
    flex-shrink: 0;
  }

  flex-wrap: nowrap;
  ${(props) => props.theme.scroll.hiddenX};
  /* ${(props) => props.theme.scroll.hidden}; */
  ::-webkit-scrollbar {
    width: auto;
    height: 4px;
    display: contents;
    position: fixed;
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.main.secondary20};
    border-radius: 16px;
  }
`;
