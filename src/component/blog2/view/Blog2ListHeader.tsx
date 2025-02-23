interface IBlog2ListHeader {
}
const Blog2ListHeader = (props: IBlog2ListHeader) => {
  return (
    <div className={"mt-[.5rem] w-full flex justify-between default-primary-outline h-[3rem] items-center px-2"}> 
      <div> 검색결과 </div>
      <div> 최신순 </div>
    </div> 
  );
};
export default Blog2ListHeader;