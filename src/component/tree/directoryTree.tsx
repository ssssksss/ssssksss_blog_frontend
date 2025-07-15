"use client";

import ModalButton from "@component/common/modal/hybrid/ModalButton";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import MarkdownPreview from "@utils/editor/MarkdownPreview";
import { useEffect, useState } from "react";

interface IDirectoryTree {
  name: string;
  kind: "file" | "directory";
  children?: IDirectoryTree[];
  handle: FileSystemFileHandle | FileSystemDirectoryHandle;
  size?: number;
  lastModified?: number;
  extension?: string;
}

const DirectoryTree = () => {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [openDirs, setOpenDirs] = useState<Set<string>>(new Set());
  const [trees, setTrees] = useState<{name: string; nodes: IDirectoryTree[]}[]>(
    [],
  );
  const [searchKeyword, setSearchKeyword] = useState("");
  const [extensionFilter, setExtensionFilter] = useState("");
  const [filteredTrees, setFilteredTrees] = useState(trees);

  const makePath = (parentPath: string, nodeName: string) =>
    parentPath ? `${parentPath}/${nodeName}` : nodeName;

  const readDirectory = async (
    dirHandle: FileSystemDirectoryHandle,
  ): Promise<IDirectoryTree[]> => {
    const tree: IDirectoryTree[] = [];
    for await (const entry of (dirHandle as any).values()) {
      if (entry.kind === "file") {
        const fileHandle = entry as FileSystemFileHandle;
        const file = await fileHandle.getFile();
        tree.push({
          name: entry.name,
          kind: "file",
          handle: fileHandle,
          size: file.size,
          lastModified: file.lastModified,
          extension: entry.name.split(".").pop()?.toLowerCase() || "",
        });
      } else if (entry.kind === "directory") {
        const children = await readDirectory(entry);
        tree.push({
          name: entry.name,
          kind: "directory",
          children,
          handle: entry,
        });
      }
    }
    return tree;
  };

  const handlePickFolder = async () => {
    try {
      const dirHandle = await (window as any).showDirectoryPicker();
      const result = await readDirectory(dirHandle);
      setTrees((prev) => [...prev, {name: dirHandle.name, nodes: result}]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileClick = async (node: IDirectoryTree) => {
    if (node.kind === "file" && node.handle) {
      try {
        const file = await (node.handle as FileSystemFileHandle).getFile();
        const text = await file.text();
        setFileContent(text);
      } catch (err) {
        console.error("파일 읽기 실패:", err);
        setFileContent("파일을 읽을 수 없습니다.");
      }
    }
  };

  const toggleDir = (path: string) => {
    setOpenDirs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) newSet.delete(path);
      else newSet.add(path);
      return newSet;
    });
  };

  interface _IModalComponent extends IModalComponent {
    name: string;
    content: string;
  }

  const ModalComponent = ({name, content, ...props}: _IModalComponent) => {
    return (
      <ModalTemplate>
        {props.closeButtonComponent}
        <h3 className="w-full border-y-4 border-primary-80 py-2 default-flex">
          {name}
        </h3>
        <MarkdownPreview
          content={"```js" + content + "```"}
        />
      </ModalTemplate>
    );
  };

  // 검색용 필터 함수 (키워드)
  const filterTreeByKeyword = (
    nodes: IDirectoryTree[],
    keyword: string,
  ): IDirectoryTree[] => {
    return nodes
      .map((node) => {
        if (node.kind === "directory" && node.children) {
          const filteredChildren = filterTreeByKeyword(node.children, keyword);
          if (
            node.name.toLowerCase().includes(keyword.toLowerCase()) ||
            filteredChildren.length > 0
          ) {
            return {...node, children: filteredChildren};
          }
          return null;
        } else {
          return node.name.toLowerCase().includes(keyword.toLowerCase())
            ? node
            : null;
        }
      })
      .filter(Boolean) as IDirectoryTree[];
  };

  // 확장자 필터 함수
  const filterTreeByExtension = (
    nodes: IDirectoryTree[],
    ext: string,
  ): IDirectoryTree[] => {
    if (!ext) return nodes;
    return nodes
      .map((node) => {
        if (node.kind === "directory" && node.children) {
          const filteredChildren = filterTreeByExtension(node.children, ext);
          if (filteredChildren.length > 0 || node.kind === "directory") {
            return {...node, children: filteredChildren};
          }
          return null;
        } else {
          return node.extension === ext ? node : null;
        }
      })
      .filter(Boolean) as IDirectoryTree[];
  };

  // 검색+확장자 필터 합성
  useEffect(() => {
    let filtered = trees.map(({name, nodes}) => ({
      name,
      nodes: filterTreeByKeyword(nodes, searchKeyword),
    }));
    if (extensionFilter) {
      filtered = filtered.map(({name, nodes}) => ({
        name,
        nodes: filterTreeByExtension(nodes, extensionFilter),
      }));
    }
    setFilteredTrees(filtered);
  }, [trees, searchKeyword, extensionFilter]);

  const formatSize = (size?: number) => {
    if (size === undefined) return "";
    if (size < 1024) return `${size} B`;
    else if (size < 1024 * 1024)
      return `${(size / 1024).toFixed(1).replace(/\.0$/, "")} KB`;
    else return `${(size / (1024 * 1024)).toFixed(1).replace(/\.0$/, "")} MB`;
  };

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return "";
    const d = new Date(timestamp);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
  };

  const countFilesAndFolders = (
    nodes: IDirectoryTree[],
  ): {files: number; folders: number} => {
    let files = 0;
    let folders = 0;

    for (const node of nodes) {
      if (node.kind === "file") {
        files += 1;
      } else if (node.kind === "directory" && node.children) {
        folders += 1;
        const childCounts = countFilesAndFolders(node.children);
        files += childCounts.files;
        folders += childCounts.folders;
      }
    }

    return {files, folders};
  };

  const renderTree = (nodes: IDirectoryTree[], parentPath = "") => {
    return nodes.map((node) => {
      const path = makePath(parentPath, node.name);
      if (node.kind === "directory") {
        const isOpen = openDirs.has(path);
        const {files: fileCount} = countFilesAndFolders(node.children || []);

        const hasChildren = (node.children?.length ?? 0) > 0;

        return (
          <div
            key={path}
            style={{paddingLeft: 12, marginLeft: 8, userSelect: "none"}}
          >
            <div
              style={{
                cursor: hasChildren ? "pointer" : "default",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: 6,
                userSelect: "none",
              }}
              className={`${isOpen && "bg-primary-40"}`}
              onClick={() => {
                if (hasChildren) toggleDir(path);
              }}
              title={hasChildren ? "폴더 열기/닫기" : "폴더에 파일이 없습니다"}
            >
              <span>{isOpen ? "➖" : "➕"}</span>
              <span>{node.name}</span>
              <span
                style={{fontSize: "1rem", color: "#666"}}
                title={`${fileCount} files`}
              >
                {fileCount > 0 ? `(${fileCount})` : ""}
              </span>
            </div>
            {isOpen &&
              hasChildren &&
              node.children &&
              renderTree(node.children, path)}
          </div>
        );
      } else {
        // 파일 노드 렌더링 그대로 유지
        return (
          <ModalButton
            key={path}
            style={{
              cursor: "pointer",
              userSelect: "none",
            }}
            buttonClassName="ml-2 pl-3 gap-2 default-flex align-center"
            onClick={() => handleFileClick(node)}
            modal={
              <ModalComponent name={node.name} content={fileContent ?? ""} />
            }
          >
            <span>📄</span>
            <span>{node.name}</span>
            <div className="">
              <span
                className="text-xs text-gray-60"
                style={{alignSelf: "center"}}
              >
                {formatSize(node.size)}
                {node.lastModified && <> - {formatDate(node.lastModified)}</>}
              </span>
            </div>
          </ModalButton>
        );
      }
    });
  };
  

  // ... 이하 통계 시각화 등 생략 가능 (필요하면 말씀해주세요)

  return (
    <div style={{padding: 20}}>
      <div style={{marginBottom: 12, display: "flex", gap: 8}}>
        <button onClick={handlePickFolder}>📂 폴더 추가 열기</button>
        {trees.length > 0 && (
          <>
            <input
              type="text"
              placeholder="검색어 입력"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="ml-[0.625rem] rounded-2xl p-2"
            />
            <select
              value={extensionFilter}
              onChange={(e) => setExtensionFilter(e.target.value)}
              className="ml-[0.625rem] rounded-2xl p-2"
            >
              <option value="">전체 확장자</option>
              {Array.from(
                new Set(
                  trees
                    .flatMap((t) => t.nodes)
                    .flatMap((n) => getAllExtensions(n))
                    .filter((e) => e !== ""),
                ),
              ).map((ext) => (
                <option key={ext} value={ext}>
                  {ext}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
      <div style={{marginTop: 20}}>
        {filteredTrees.length === 0 ? (
          <p>폴더를 선택하세요.</p>
        ) : (
          filteredTrees.map((tree, idx) => (
            <div key={idx} style={{marginBottom: 24}}>
              <div style={{fontWeight: "bold", marginBottom: 4}}>
                📁 {tree.name}
              </div>
              {renderTree(tree.nodes)}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

function getAllExtensions(node: IDirectoryTree): string[] {
  if (node.kind === "file") return [node.extension || ""];
  else return node.children?.flatMap((child) => getAllExtensions(child)) || [];
}

export default DirectoryTree;
