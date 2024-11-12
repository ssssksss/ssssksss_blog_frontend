import Input from "@component/common/input/Input";

interface IBlog2Search {}
const Blog2Search = (props: IBlog2Search) => {
  return (
    <section>
      <article className={"relative h-12 w-full"}>
        <div className="relative flex w-full items-center rounded-[1rem] outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20">
          <Input
            type={"search"}
            placeholder="검색어를 입력해주세요"
            className={"w-[calc(100%-3.5rem)] outline-none outline-0"}
          />
          <button className={"absolute right-2 top-1/2 -translate-y-1/2"}>
            버튼
          </button>
        </div>
      </article>
    </section>
  );
};
export default Blog2Search;
