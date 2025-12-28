import { type Post } from "@/types/postsData";

export const POSTS_DATA: Post[] = Array.from({ length: 40 }, (_, i) => {
  const categories = ["DIARY", "TODO", "HABIT"] as const;

  return {
    id: i + 1,
    title: `게시글 제목 ${i + 1}`,
    content: `이것은 ${i + 1}번 게시글의 내용입니다.`,
    category: categories[i % 3],
    isCompleted: i % 2 === 0,
    createdAt: `2025-01-${String((i % 28) + 1).padStart(2, "0")}`,
  };
});
