import styled from "@emotion/styled";
import { RootState } from "@redux/store/reducers";
import { CC } from "@styles/commonComponentStyle";
import { useSelector } from "react-redux";

const BlogItemList = () => {
  const blogStore = useSelector((state: RootState) => state.blogStore);

  //   const blogComponentList = () => {
      
  //   const temp = blogStore.blogCategoryList ? JSON.parse(JSON.stringify(blogStore.blogCategoryList)) : [];
  //   let temp1 = [];
  //   if (blogStore.blogListOrderOption == 'viewNumber') {
  //    temp1 = temp
  //     ?.filter((i) => i.id == blogStore.activeFirstCategory)[0]
  //     ?.blogSecondCategoryList.filter(
  //       (j) => j.id == blogStore.activeSecondCategory,
  //     )[0]
  //     ?.blogList?.sort((a, b) => b.viewNumber - a.viewNumber);
  //   } else {
  //     temp1 = temp
  //       ?.filter((i) => i.id == blogStore.activeFirstCategory)[0]
  //       ?.blogSecondCategoryList.filter(
  //         (j) => j.id == blogStore.activeSecondCategory,
  //       )[0]
  //       ?.blogList;
  //     }

  //   return temp1?.map((k) => (
  //       <Link href={`/blog/${k.id}`} key={`${k.id}`} prefetch={false}>
  //         <BlogItem
  //           element={k}
  //           viewMode={true}
  //           defaultImageUrl={
  //             blogStore.blogCategoryList
  //               ?.filter(
  //                 (i) => i.id == blogStore.activeFirstCategory,
  //               )[0]
  //               ?.blogSecondCategoryList.filter(
  //                 (j) => j.id == blogStore.activeSecondCategory,
  //               )[0]?.thumbnailImageUrl
  //           }
  //         ></BlogItem>
  //       </Link>
  //     ));
  // } 

  return (
      <Container outline={1}>
          {/* {blogComponentList()} */}
    </Container>
  );
};
export default BlogItemList

const Container = styled(CC.ColLeftStartBox)`
  width: 100%;
  gap: 0.5rem;
  ${(props) => props.theme.scroll.hiddenY};
  scroll-behavior: smooth;
  padding: 0.5rem;
  & > a {
    width: 100%;
  }
`;