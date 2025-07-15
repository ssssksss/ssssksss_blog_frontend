// Blog2StructureContentView.tsx
import LottieNotFound from "@component/common/lottie/LottieNotFound";
import "@styles/customEditor.css";
import Blog2StructureIndexTree from "./Blog2StructureIndexTree";

interface IBlog2StructureContentView {
  data: IBlog2Structure[];
}

// 타입은 기존 declare interface IBlog2Structure { ... } 그대로 사용하세요.

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
    const path = item.blog2StructureContent.directory;
    const data = item;
    const parts = path.split("/");
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
}: {
  blog2StructureItems: IBlog2Structure[];
}) => {
  const treeData = buildTree(blog2StructureItems);

  return (
    <div className="overflow-x-scroll scrollbar-hide">
      {Object.entries(treeData.children).map(([name, node]) => (
        <Blog2StructureIndexTree key={name} name={name} node={node} level={0} />
      ))}
    </div>
  );
};

const Blog2StructureContentView = ({data}: IBlog2StructureContentView) => {
  if (data.length === 0) {
    return (
      <div className="relative flex w-full flex-col rounded-[1rem] p-0">
        <div className="flex w-full flex-col items-center">
          <LottieNotFound text="정보가 없습니다." />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex w-full flex-col rounded-[1rem] p-0">
      <DirectoryTree blog2StructureItems={data} />
    </div>
  );
};

export default Blog2StructureContentView;
