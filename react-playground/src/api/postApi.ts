import { type Post } from "@/types/postsData";
import { POSTS_DATA } from "../data/postsData";

// type FetchPostsResponse = {
//   data: Post[];
//   totalCount: number;
// };

// export function fetchPosts(page:number, size:number): Promise<FetchPostsResponse> {
  
//   const startIndex = (page - 1) * size;
//   const endIndex = startIndex + size;

//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         data : POSTS_DATA.slice(startIndex, endIndex),
//         totalCount : POSTS_DATA.length
//       });
//     }, 100); // 일부러 딜레이
//   });
// }

export function fetchPosts(): Promise<Post[]> {
    

  return new Promise((resolve) => {
    setTimeout(() => {
       resolve(POSTS_DATA);
    }, 100); // 일부러 딜레이
  });
}
