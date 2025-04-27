import Blog2ListHeaderBarContainer from "../container/read/Blog2ListHeaderBarContainer";
import Blog2ListFixedMenu from "../hybrid/read/Blog2ListFixedMenu";
import Blog2List from "../hybrid/readList/Blog2ItemListContainer";

interface IBlog2ListBody {

}
const Blog2ListBody = (props: IBlog2ListBody) => {
  return (
    <div className={"w-full flex flex-col"}>
      <Blog2ListHeaderBarContainer />
      <Blog2List />
      <Blog2ListFixedMenu />
    </div> 
  );
};
export default Blog2ListBody;