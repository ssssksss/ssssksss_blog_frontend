import Blog2FirstCategory from "./Blog2FirstCategory";
import Blog2SecondCategory from "./Blog2SecondCategory";

interface IBlog2Category {
  categoryList: [];
}
const Blog2Category = ({ categoryList }: IBlog2Category) => {
  // 카테고리 목록을 받아오고,
  return (
    <div>
      <Blog2FirstCategory categoryList={categoryList} />
      <Blog2SecondCategory categoryList={categoryList} />
    </div>
  );
};
export default Blog2Category;