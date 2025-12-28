import { type Post } from "@/types/postsData";

const PostItem = ({ post }: { post: Post }) => {
  return (
    <div
      className="
        border border-gray-200 rounded-lg
        p-4 flex justify-between gap-4
        hover:bg-gray-50 transition
      "
    >
      <div>
        <h3 className="font-semibold text-lg">{post.title}</h3>

        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {post.content}
        </p>

        <div className="flex gap-2 mt-3 text-xs">
          <span className="px-2 py-1 rounded bg-blue-100 text-blue-700">
            {post.category}
          </span>
          <span className="px-2 py-1 rounded bg-green-100 text-green-700">
            {post.isCompleted ? "완료" : "미완료"}
          </span>
        </div>
      </div>

      <div className="text-xs text-gray-400 whitespace-nowrap">2025-01-15</div>
    </div>
  );
};

export default PostItem;
