"use client";

import Head from "next/head";

interface Props {
  currentPage: number;
  basePath: string; // e.g., "/board"
  totalPages?: number; // 있을 경우 next 제한 가능
}

export default function PaginationSEOHead({
  currentPage,
  basePath,
  totalPages,
}: Props) {
  const canonicalUrl =
    currentPage === 1 ? basePath : `${basePath}?page=${currentPage}`;
  const prevUrl =
    currentPage > 1 ? `${basePath}?page=${currentPage - 1}` : null;
  const nextUrl =
    totalPages && currentPage >= totalPages
      ? null
      : `${basePath}?page=${currentPage + 1}`;

  return (
    <Head>
      {prevUrl && <link rel="prev" href={prevUrl} />}
      {nextUrl && <link rel="next" href={nextUrl} />}
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}${canonicalUrl}`}
      />
    </Head>
  );
}
