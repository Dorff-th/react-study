import { type Post } from "@/types/postsData";
import PostItem from "./PostItem";

const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="space-y-3">
      {/* <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem /> */}
      {posts ? (
        posts.map((post) => {
          return <PostItem key={post.id} post={post} />;
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default PostList;
