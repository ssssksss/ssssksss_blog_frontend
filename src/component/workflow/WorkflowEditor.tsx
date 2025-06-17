"use client";

import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import BasicTextarea from "@component/common/textarea/BasicTextarea";
import useToastifyStore from "@store/toastifyStore";
import { firebaseDB } from "@utils/lib/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

interface IWorkflowEditor {
  json: string; // 서버에서 받아오는 초기 JSON 문자열
}

export default function WorkflowEditor({json}: IWorkflowEditor) {
  const toastifyStore = useToastifyStore();
  const [jsonText, setJsonText] = useState<string>(json || "");

  const handleSave = async () => {
    try {
      const parsed = JSON.parse(jsonText);

      if (!Array.isArray(parsed.nodes)) {
        toastifyStore.setToastify({
          type: "error",
          message: "'nodes'는 배열이어야 합니다.",
        });
        throw new Error("'nodes'는 배열이어야 합니다.");
      }
      if (!Array.isArray(parsed.edges)) {
        toastifyStore.setToastify({
          type: "error",
          message: "'edges'는 배열이어야 합니다.",
        });
        throw new Error("'edges'는 배열이어야 합니다.");
      }

      for (const [index, node] of parsed.nodes.entries()) {
        if (!node.id || !Array.isArray(node.position)) {
          toastifyStore.setToastify({
            type: "error",
            message: `노드 인덱스 ${index}에 'id' 또는 'position'이 잘못되었습니다.`,
          });
          throw new Error(
            `노드 인덱스 ${index}에 'id' 또는 'position'이 잘못되었습니다.`,
          );
        }
      }

      for (const [index, edge] of parsed.edges.entries()) {
        if (!edge.from || !edge.to) {
          toastifyStore.setToastify({
            type: "error",
            message: `엣지 인덱스 ${index}에 'from' 또는 'to'이 없습니다.`,
          });
          throw new Error(
            `엣지 인덱스 ${index}에 'from' 또는 'to'이 없습니다.`,
          );
        }
      }

      await setDoc(doc(firebaseDB, "workflow", "ssssksssBlog"), parsed);
      toastifyStore.setToastify({
        type: "success",
        message: "업로드에 성공했습니다.",
      });
    } catch (e: any) {
      toastifyStore.setToastify({
        type: "error",
        message: "업로드에 실패했습니다.",
      });
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] w-full flex-col space-y-4 p-4">
      <h1 className="text-2xl font-bold default-flex">워크플로우 관리</h1>
      <BasicTextarea
        className="h-full w-full flex-1 resize-none p-4 font-sans text-xl font-bold text-contrast-1 primary-border-radius"
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
      />
      <ThemeActiveButton1
        isActive={jsonText != ""}
        className="h-[3.75rem] text-lg"
        onClick={handleSave}
      >
        저장
      </ThemeActiveButton1>
    </div>
  );
}
