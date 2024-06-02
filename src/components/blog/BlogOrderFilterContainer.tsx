import Select from "@components/common/select/Select";
import Text from "@components/common/text/Text";
import styled from "@emotion/styled";
import { store } from "@redux/store";
import { rootActions } from "@redux/store/actions";
import { RootState } from "@redux/store/reducers";
import { CC } from "@styles/commonComponentStyle";
import AxiosInstance from "@utils/axios/AxiosInstance";
import { useSelector } from "react-redux";

/**
 * @author Sukyung Lee <ssssksss@naver.com> 
 * @file BlogOrderFilterContainer.tsx
 * @version 0.0.1 "2024-06-02 22:42:24"
 * @description 설명 
 */
const BlogOrderFilterContainer = () => {
    const blogStore = useSelector((state: RootState) => state.blogStore);

    const orderBlogListHandler = (data: {value: string}) => {
        store.dispatch(
        rootActions.blogStore.setBlogListOrderOption({
            blogListOrderOption: data.value,
        }),
            );
        AxiosInstance({
            url: '/api/blog/list',
            method: 'GET',
            params: {
            sort:
                data.value,
            secondCategoryId: blogStore.activeSecondCategory,
            },
        }).then((res) => {
            store.dispatch(
              rootActions.blogStore.setBlogList({
                ...blogStore.blogList,
                [blogStore.activeSecondCategory]: res.data.data,
              }),
            );
        });
    };
  
    return (
    <HeaderContainer outline={1} pd={'0rem 0.5rem'}>
      <Text>검색결과 :{blogStore.activeFirstCategoryList.length}</Text>
      <CC.RowDiv pd={'0.125rem'}>
        <Select
          onChange={orderBlogListHandler}
          defaultValue={{
            value: blogStore.blogListOrderOption,
            name:
              blogStore.blogListOrderOption == 'viewNumber'
                ? '조회수순'
                : '최신순',
          }}
          w={'8rem'}
          h={'2rem'}
          data={[
            { name: '최신순', value: '', bg: '' },
            { name: '조회수순', value: 'viewNumber', bg: '' },
            // { name: '좋아요순', value: 'likeNumber', bg: '' },
          ]}
        ></Select>
      </CC.RowDiv>
    </HeaderContainer>
  );
};
export default BlogOrderFilterContainer

const HeaderContainer = styled(CC.RowBetweenStartBox)`
  width: 100%;
  border-radius: 0.5rem;
  height: 3rem;
  background: ${(props) => props.theme.main.contrast};
`;