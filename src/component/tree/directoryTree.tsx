"use client";

import { useState } from "react";

interface IDirectoryTree {
  name?: string;
  kind?: "file" | "directory";
  children?: IDirectoryTree[];
}

const DirectoryTree = (props: IDirectoryTree) => {
  const [tree, setTree] = useState<IDirectoryTree[] | null>(null);

  const handlePickFolder = async () => {
    try {
      const dirHandle = await (window as any).showDirectoryPicker();
      const result = await readDirectory(dirHandle);
      setTree(result);
    } catch (err) {
      console.error(err);
    }
  };

  const readDirectory = async (
    dirHandle: FileSystemDirectoryHandle,
  ): Promise<IDirectoryTree[]> => {
    const tree: IDirectoryTree[] = [];
    const handle = dirHandle as unknown as {values: () => AsyncIterable<any>};
    for await (const entry of handle.values()) {
      if (entry.kind === "file") {
        tree.push({name: entry.name, kind: "file"});
      } else if (entry.kind === "directory") {
        const children = await readDirectory(entry);
        tree.push({name: entry.name, kind: "directory", children});
      }
    }
    return tree;
  };

  const renderTree = (nodes: IDirectoryTree[], depth = 0) => {
    return nodes.map((node, idx) => (
      <div
        key={idx}
        style={{
          paddingLeft: 12,
          borderLeft: "1px solid #ccc",
          marginLeft: 8,
        }}
      >
        <div style={{position: "relative"}}>
          <span
            style={{
              position: "absolute",
              left: -12,
              top: 6,
              width: 12,
              height: 1,
              backgroundColor: "#ccc",
            }}
          />
          {node.kind === "directory" ? "📁" : "📄"} {node.name}
        </div>
        {node.children && renderTree(node.children, depth + 1)}
      </div>
    ));
  };

  // ✅ 트리를 텍스트로 변환
  const generateTextTree = (
    nodes: IDirectoryTree[],
    prefix: string = "",
  ): string => {
    return nodes
      .map((node, index) => {
        const isLast = index === nodes.length - 1;
        const branch = isLast ? "└── " : "├── ";
        const nextPrefix = prefix + (isLast ? "    " : "│   ");

        let line = `${prefix}${branch}${node.name}`;
        if (node.kind === "directory" && node.children?.length) {
          const childrenText = generateTextTree(node.children, nextPrefix);
          line += `\n${childrenText}`;
        }
        return line;
      })
      .join("\n");
  };

  // ✅ 복사 처리
  const handleCopy = () => {
    if (!tree) return;
    const textTree = generateTextTree(tree);
    navigator.clipboard
      .writeText(textTree)
      .then(() => alert("트리 구조가 복사되었습니다! ✅"))
      .catch((err) => console.error("복사 실패:", err));
  };

  return (
    <div style={{padding: 20}}>
      <button onClick={handlePickFolder}>📂 폴더 열기</button>
      {tree && (
        <button onClick={handleCopy} style={{marginLeft: 10}}>
          📋 트리 복사
        </button>
      )}

      <div style={{marginTop: 20}}>
        {tree ? renderTree(tree) : <p>폴더를 선택하세요.</p>}
      </div>
    </div>
  );
};

export default DirectoryTree;
