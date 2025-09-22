import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  reactionAdded,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useEffect } from "react";

const PostsList = () => {
  let posts = useSelector(selectAllPosts)
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const users = useSelector(selectAllUsers);

  console.log(posts, "posts");

  const dispatch = useDispatch();
  const handleReactions = (id, reaction) => {
    dispatch(reactionAdded({ postId: id, reaction: reaction }));
  };

  const status = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  } else if (status === "failed") {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {posts.map((post) => {
        const author = users.find((user) => user.id === post.userId);
        return (
          <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>
              by {author?.name || "uknown"} at {post.date}
            </p>
            {Object.entries(post.reactions).map(([key, value]) => (
              <button key={key} onClick={() => handleReactions(post.id, key)}>
                {key}: {value}{" "}
              </button>
            ))}
          </article>
        );
      })}
    </section>
  );
};

export default PostsList;
