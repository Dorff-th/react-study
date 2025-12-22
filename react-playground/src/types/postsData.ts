export type Post = {
  id: number;
  title: string;
  content: string;
  category: "DIARY" | "TODO" | "HABIT";
  isCompleted: boolean;
  createdAt: string;
};