import Blog2StructureIndexTree from "@component/blog2/view/Blog2StructureIndexTree";
import ModalButton from "@component/common/modal/hybrid/ModalButton";
import NestedModalButton from "@component/common/modal/hybrid/NestedModalButton";
import { useFormContext } from "react-hook-form";
import { FaRegPlusSquare, FaSearchPlus } from "react-icons/fa";
import Blog2StructureContentCreateUpdateModal from "./Blog2StructureContentCreateUpdateModal";
import Blog2StructureSearchContentModal from "./Blog2StructureSearchContentModal";

interface IBlog2StructureContentBox {
  addBlog2Content: (
    data: IBlog2BasicContent | IBlog2StructureContent,
    type: "basic" | "structure",
  ) => void;
  updateBlog2Content: (
    data: IBlog2BasicContent | IBlog2StructureContent,
    type: "basic" | "structure",
  ) => void;
  removeBlog2Content: (type: "basic" | "structure", id: number) => void;
}

interface TreeNode {
  children: Record<string, TreeNode>;
  isFile?: boolean;
  fileCount: number;
  data?: IBlog2Structure;
}

const buildTree = (items: IBlog2Structure[]): TreeNode => {
  const root: TreeNode = {
    children: {},
    fileCount: 0,
    isFile: false,
  };

  for (const item of items) {
    const data = item;
    const parts = item.blog2StructureContent.directory.split("/");
    let current = root;

    parts.forEach((part, index) => {
      if (!current.children[part]) {
        current.children[part] = {
          children: {},
          isFile: false,
          fileCount: 0,
        };
      }

      if (index === parts.length - 1) {
        current.children[part].isFile = true;
        if (data) {
          current.children[part].data = data;
        }
      }

      current = current.children[part];
    });
  }

  const countFiles = (node: TreeNode): number => {
    if (node.isFile) {
      node.fileCount = 1;
      return 1;
    }
    let count = 0;
    for (const childName in node.children) {
      count += countFiles(node.children[childName]);
    }
    node.fileCount = count;
    return count;
  };

  countFiles(root);

  return root;
};

const DirectoryTree = ({
  blog2StructureItems,
  addBlog2StructureContent,
  updateBlog2StructureContent,
  removeBlog2StructureContent,
}: {
  blog2StructureItems: IBlog2Structure[];
  addBlog2StructureContent: (data: IBlog2StructureContent) => void;
  updateBlog2StructureContent: (data: IBlog2StructureContent) => void;
  removeBlog2StructureContent: (id: number) => void;
}) => {
  const treeData = buildTree(blog2StructureItems);

  return (
    <div className="overflow-x-scroll scrollbar-hide">
      {Object.entries(treeData.children).map(([name, node]) => (
        <Blog2StructureIndexTree
          key={name}
          name={name}
          node={node}
          level={0}
          addBlog2StructureContent={addBlog2StructureContent}
          updateBlog2StructureContent={updateBlog2StructureContent}
          removeBlog2StructureContent={removeBlog2StructureContent}
        />
      ))}
    </div>
  );
};

const Blog2StructureContentBox = (props: IBlog2StructureContentBox) => {
  const blog2FormContext = useFormContext();

  const addBlog2StructureContent = (data: IBlog2StructureContent) => {
    props.addBlog2Content(data, "structure");
  };

  const removeBlog2StructureContent = (id: number) => {
    props.removeBlog2Content("structure", id);
  };

  const updateBlog2StructureContent = (data: IBlog2StructureContent) => {
    props.updateBlog2Content(data, "structure");
  };

  const _blog2StructureList = blog2FormContext.watch("blog2StructureList");

  return (
    <div className={"relative flex w-full flex-col rounded-[1rem] p-0"}>
      <article className="sticky left-[1.5rem] top-[4.5rem] z-10 flex w-fit -translate-x-2 gap-2 p-1 text-contrast-1 opacity-80 primary-border-radius hover:opacity-100">
        {/* 블로그 구조 내용을 세롭게 생성하는 버튼 */}
        <ModalButton
          buttonClassName={
            "px-2 font-bold h-[2.5rem] hover:bg-primary-80 rounded-2xl"
          }
          modal={
            <Blog2StructureContentCreateUpdateModal
              addBlog2StructureContent={addBlog2StructureContent}
              updateBlog2StructureContent={updateBlog2StructureContent}
            />
          }
        >
          <FaRegPlusSquare size="28" />
        </ModalButton>
        <NestedModalButton
          buttonClassName={
            "px-2 font-bold h-[2.5rem] hover:bg-primary-80 rounded-2xl"
          }
          modal={
            <Blog2StructureSearchContentModal
              addBlog2StructureContent={addBlog2StructureContent}
            />
          }
        >
          <FaSearchPlus size={"24"} />
        </NestedModalButton>
      </article>
      <div className="relative flex w-full flex-col rounded-[1rem] p-0">
        <DirectoryTree
          blog2StructureItems={_blog2StructureList}
          addBlog2StructureContent={addBlog2StructureContent}
          updateBlog2StructureContent={updateBlog2StructureContent}
          removeBlog2StructureContent={removeBlog2StructureContent}
        />
      </div>
    </div>
  );
};
export default Blog2StructureContentBox;
