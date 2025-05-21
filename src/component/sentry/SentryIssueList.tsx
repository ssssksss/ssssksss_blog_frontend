"use client";

import useFetchCSR from "@hooks/useFetchCSR";
import { useState } from "react";

type SentryIssue = {
  id: string;
  shortId: string;
  title: string;
  culprit: string;
  permalink: string;
  firstSeen: string;
  lastSeen: string;
  count: string;
  userCount: number;
  project: {
    name: string;
    slug: string;
  };
  status: "unresolved" | "resolved" | "ignored";
};

export default function SentryIssueList() {
  const [issues, setIssues] = useState<SentryIssue[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchCSR = useFetchCSR();

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "/api/sentry/issue",
        {
          method: "GET"
        });
      const result: SentryIssue[] = await response.json();
      setIssues(result); // 최근 5개
    } catch (err) {
      console.error("이슈 조회 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl rounded-xl border p-4 shadow-md">
      <button
        onClick={fetchIssues}
        className="text-white rounded bg-blue-600 px-4 py-2 hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "불러오는 중..." : "최근 Sentry 이슈 5개 보기"}
      </button>

      {issues.length > 0 && (
        <ul className="mt-4 space-y-2">
          {issues.map((issue) => (
            <li key={issue.id} className="rounded border p-2">
              <strong>{issue.title}</strong>
              <div className="text-sm text-gray-600">{issue.culprit}</div>
              <div className="text-xs text-gray-500">
                발생: {new Date(issue.firstSeen).toLocaleString()} / 마지막:{" "}
                {new Date(issue.lastSeen).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
