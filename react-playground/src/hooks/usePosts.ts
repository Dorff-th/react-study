import { useEffect, useState } from "react";
import { type Post } from "@/types/postsData";
import { fetchPosts } from "@/api/postApi";
import { type Filter } from "@/types/filter";
import { useUI } from "./useUI";

export function usePosts(page: number, size: number, filter:Filter) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;

  const {showLoading, hideLoading} = useUI();

  useEffect(() => {
    
    showLoading();    
    fetchPosts().then((res) => {

      const filteredPosts = res.filter((post) => {
        const matchKeyword =
          post.title.includes(filter.keyword || '') ||
          post.content.includes(filter.keyword || '');

        const matchCategory =
          post.category.includes(filter.category || '');

        const matchCompleted =
          filter.isCompleted === undefined ||
          post.isCompleted === filter.isCompleted;

        return matchKeyword && matchCategory && matchCompleted;
      });

      //const hasFilter = filter.keyword || filter.category || filter.isCompleted;
      const hasFilter =
        filter.keyword !== '' ||
        filter.category !== '' ||
        filter.isCompleted !== undefined;

      setPosts(
        hasFilter
          ? filteredPosts.slice(startIndex, endIndex)
          : res.slice(startIndex, endIndex)
      );

      setTotalCount(
        hasFilter
          ? filteredPosts.length
          : res.length
      );
    }).finally(()=>hideLoading());


      



  }, [page, size, filter.keyword, filter.category, filter.isCompleted]);

  return { posts, totalCount };
}
