import {useState} from "react";

interface IBlog2StructureIndexTree {
  paths: string[];
}
interface TreeNode {
  children: Record<string, TreeNode>;
}

interface DirectoryTreeProps {
  paths: string[];
}

interface TreeNodeProps {
  node: TreeNode;
  name: string;
}
const Blog2StructureIndexTree: React.FC<TreeNodeProps> = ({node, name}) => {
  const [isOpen, setIsOpen] = useState(true);

  const hasChildren = Object.keys(node.children).length > 0;

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{cursor: "pointer"}}
        className="hover:bg-primary-20">
        {hasChildren ? (
          isOpen ? (
            `🐥 ${name}`
          ) : (
            `🐣 ${name}`
          )
        ) : (
          <a
            className="w-full whitespace-nowrap hover:bg-primary-20"
            href={`#${name}`}>
            {`📄 ${name}`}
          </a>
        )}
      </div>
      {isOpen && (
        <div style={{marginLeft: 16}}>
          {Object.keys(node.children).map((childName) => (
            <Blog2StructureIndexTree
              key={childName}
              name={childName}
              node={node.children[childName]}
            />
          ))}
        </div>
      )}
    </>
  );
};
export default Blog2StructureIndexTree;
