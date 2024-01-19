import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import { Button } from '@/components/common/button/Button';
import { PlusIcon } from '/public/img/ui-icon/ic-plus.svg';
import Image from 'next/image';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import { overflowHoverVerticalScroll } from '@/styles/themeOverrideStyle';
import ModalButton from '@/components/common/button/ModalButton';
import BlogFirstCategoryModal from '@/components/blog/BlogFirstCategory/BlogFirstCategoryModal';
import { Icons } from '@/components/common/icons/Icons';
import { useLoading } from '@/src/hooks/useLoading';
import { useCallback, useEffect, useRef, useState } from 'react';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import { store } from '@/redux/store';
import { SET_TOASTIFY_MESSAGE } from '@/redux/store/toastify';
import { BlogAPI } from '@/api/BlogAPI';
import { Spinner1 } from '../../spinner/Spinners';
import BlogSecondCategoryContainer from '../BlogSecondCategory/BlogSecondCategoryContainer';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {
  SET_FIRST_CATEGORY_ID_AND_NAME,
  SET_FIRST_CATEGORY_LIST,
} from '@/redux/store/blog';
import UrlQueryStringToObject from '@/utils/function/UrlQueryStringToObject';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogFirstCategoryContainer.tsx
 * @version 0.0.1 "2023-09-25 01:28:42"
 * @description 설명
 */
const BlogFirstCategoryContainer = () => {
  const [isLoading, loadingFunction] = useLoading();
  const [secondCategoryProps, setSecondCategoryProps] = useState();
  const [activeFirstCategory, setActiveFirstCategory] = useState();
  const router = useRouter();
  const scrollRef = useRef();
  const authStore = useSelector((state: RootState) => state.authStore);
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const urlQueryObject = UrlQueryStringToObject(window.location.href);
  /**
   * 카테고리 클릭시 활성화 및 url 주조 변경
   */
  const activeFirstCategoryHandler = (
    id: number,
    name: string,
    index: number
  ) => {
    if (activeFirstCategory == id) return;
    setActiveFirstCategory(id);
    store.dispatch(
      SET_FIRST_CATEGORY_ID_AND_NAME({
        firstCategoryId: id,
        firstCategoryName: name,
      })
    );
    // 상태값이 변경되어 shallow router의 의미가 없음
    router.replace(`/blog?first-category=${id}`, undefined, {
      shallow: true,
    });
    // scrollRef.current.scrollLeft = event.target.getBoundingClientRect().x;
    scrollRef.current.scrollLeft = 80 * index;
  };

  useEffect(() => {
    let _firstCategoryId;
    let _firstCategoryName;
    loadingFunction(BlogAPI.getFirstCategory()).then(res => {
      store.dispatch(SET_FIRST_CATEGORY_LIST(res.data.blogFirstCategoryList));
      res.data.blogFirstCategoryList.map(i => {
        if (urlQueryObject?.['first-category'] == i.id) {
          _firstCategoryId = i.id;
          _firstCategoryName = i.name;
        }
      });
      store.dispatch(
        SET_FIRST_CATEGORY_ID_AND_NAME({
          firstCategoryId:
            _firstCategoryId || res.data.blogFirstCategoryList[0]?.id,
          firstCategoryName:
            _firstCategoryName || res.data.blogFirstCategoryList[0]?.name,
        })
      );
      setActiveFirstCategory(
        _firstCategoryId || res.data.blogFirstCategoryList[0]?.id
      );
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <BlogCategoryBarContainer1>
          <div>
            <Spinner1 />
          </div>
        </BlogCategoryBarContainer1>
      ) : (
        <BlogCategoryBarContainer1 ref={scrollRef}>
          {blogStore.firstCategoryList?.map((i, index) => (
            <Button
              key={i.id}
              onClick={e => activeFirstCategoryHandler(i.id, i.name, index)}
              active={i.id === activeFirstCategory}
              index={index}
              bg={'gray80'}
              color={'contrast'}
            >
              {i.name}
            </Button>
          ))}
          {authStore.id &&
            authStore.id == blogStore.firstCategoryList[0]?.userId && (
              <ModalButton
                color={'primary80'}
                modal={<BlogFirstCategoryModal />}
                modalOverlayVisible={true}
                modalW={'300px'}
              >
                <Image src={Icons.SettingIcon} alt="" />
              </ModalButton>
            )}
        </BlogCategoryBarContainer1>
      )}
    </>
  );
};
export default BlogFirstCategoryContainer;

const Container = styled.section`
  ${props => props.theme.flex.column};
  width: 100%;
  padding: 4px;
  border-radius: 0.625rem;
  border: 1px solid ${props => props.theme.main.primary100};
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
  gap: 4px;
`;
// const BlogCategoryBarContainer1 = styled(CC.RowDiv)`
const BlogCategoryBarContainer1 = styled(overflowHoverVerticalScroll)`
  gap: 4px;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 10px 4px;
  height: 60px;

  & > button {
    flex: 0 0 auto;
    min-width: 90px;
    height: 36px;
    border-radius: ${props => props.theme.borderRadius.br10};
    font-family: ${props => props.theme.fontFamily.yanoljaYacheBold};

    @media (max-width: ${props => props.theme.deviceSizes.tablet}) {
      min-width: 70px;
      font-size: 0.9rem;
    }
  }
`;
