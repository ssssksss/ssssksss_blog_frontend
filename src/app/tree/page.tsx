import DirectoryTree from "@component/tree/directoryTree";
import Template from "../age/template";

interface IPage {

}
const Page = (props: IPage) => {
  return (
    <Template>
      <h1 className={"w-full default-flex py-2 text-2xl"}> 폴더구조 </h1>
      {/* <div className={"flex w-full flex-col"}>
        react-treebeard rc-tree react-sortable-tree (드래그 앤 드롭도 가능)
      </div> */}
      <div className={"h-[calc(100vh-120px)] overflow overflow-scroll primary-border-radius"}>
        <DirectoryTree />
      </div>
    </Template>
  );
};
export default Page;