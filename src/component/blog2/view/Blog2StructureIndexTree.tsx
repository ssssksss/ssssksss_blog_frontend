"use client";

import EditButton from "@component/common/button/EditButton";
import Button from "@component/common/button/hybrid/Button";
import ModalButton from "@component/common/modal/hybrid/ModalButton";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MarkdownPreview from "@utils/editor/MarkdownPreview";
import { useState } from "react";
import Blog2StructureContentCreateUpdateModal from "../hybrid/createUpdate/structure/Blog2StructureContentCreateUpdateModal";

interface TreeNode {
  children: Record<string, TreeNode>;
  isFile?: boolean;
  fileCount: number;
  data?: IBlog2Structure;
}

interface Props {
  name: string;
  node: TreeNode;
  level?: number;
  addBlog2StructureContent?: (data: IBlog2StructureContent) => void;
  updateBlog2StructureContent?: (data: IBlog2StructureContent) => void;
  removeBlog2StructureContent?: (id: number) => void;
}

interface _IModalComponent extends IModalComponent {
  name: string;
  data?: IBlog2Structure;
}

const ModalComponent = ({
  name,
  data,
  ...props
}: _IModalComponent) => {
  return (
    <ModalTemplate className="flex flex-col gap-y-2">
      {props.closeButtonComponent}
      <h3 className="w-full border-y-4 border-primary-80 py-2 default-flex">
        {name}
      </h3>
      <div className="flex gap-x-2">
        <div className="primary-set rounded-2xl p-2">
          {data?.blog2StructureContent.project}
        </div>
        <div className="primary-set rounded-2xl p-2">
        version {data?.blog2StructureContent.version}
        </div>
      </div>
      <MarkdownPreview content={data?.blog2StructureContent.content || ""} className="py-2 min-w-[18.75rem]" />
    </ModalTemplate>
  );
};


const Blog2StructureIndexTree = ({
  name,
  node,
  level = 0,
  addBlog2StructureContent,
  updateBlog2StructureContent,
  removeBlog2StructureContent
}: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  const indent = {
    paddingLeft: `${level * 1}rem`,
  };

  return (
    <>
      <div
        className="cursor-pointer select-none hover:bg-primary-40"
        onClick={() => !node.isFile && setIsOpen((prev) => !prev)}
        style={indent}
      >
        {node.isFile ? (
          <div className="flex justify-start">
            <ModalButton
              onClick={() => {}}
              modal={<ModalComponent name={name} data={node.data} />}
              buttonClassName="w-full flex justify-start items-center"
            >
              📄 {name}
            </ModalButton>
            {removeBlog2StructureContent && (
              <div className="flex">
                <ModalButton
                  buttonClassName={"font-bold p-1 w-[2.25rem] default-flex"}
                  modal={
                    <Blog2StructureContentCreateUpdateModal
                      edit={true}
                      item={node.data?.blog2StructureContent}
                      addBlog2StructureContent={addBlog2StructureContent}
                      updateBlog2StructureContent={updateBlog2StructureContent}
                    />
                  }
                >
                  <EditButton />
                </ModalButton>
                <Button
                  className={
                    "w-[2.25rem] rounded-2xl p-1 opacity-40 primary-border-radius default-flex hover:bg-primary-20 hover:opacity-100"
                  }
                  onClick={() =>
                    removeBlog2StructureContent(
                      node.data?.blog2StructureContent.id!,
                    )
                  }
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    style={{width: "28px", height: "28px"}}
                  />
                </Button>
              </div>
            )}
          </div>
        ) : (
          <span>
            {isOpen ? "➖" : "➕"} {name} ({node.fileCount})
          </span>
        )}
      </div>

      {isOpen &&
        !node.isFile &&
        Object.entries(node.children).map(([childName, childNode]) => (
          <Blog2StructureIndexTree
            key={childName}
            name={childName}
            node={childNode}
            level={level + 1}
            addBlog2StructureContent={addBlog2StructureContent}
            updateBlog2StructureContent={updateBlog2StructureContent}
            removeBlog2StructureContent={removeBlog2StructureContent}
          />
        ))}
    </>
  );
};

export default Blog2StructureIndexTree;
