import { type Post } from "@/types/postsData";
import { POSTS_DATA } from "../data/postsData";

export function fetchPosts(): Promise<Post[]> {

  return new Promise((resolve) => {
    setTimeout(() => {
       resolve(POSTS_DATA);
    }, 300); // 일부러 딜레이
  });
}
