import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, reactionAdded } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const PostsList = () => {
  const posts = useSelector(selectAllPosts)
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date)); // sort by date
  const users = useSelector(selectAllUsers);
  console.log(users, posts, "posts");

  const dispatch = useDispatch();
  const handleReactions = (id, reaction) => {
    dispatch(reactionAdded({ postId: id, reaction: reaction }));
  };

  return (
    <section>
      <h2>Posts</h2>
      {posts.map((post) => {
        const author = users.find((user) => user.id === post.userId);
        console.log(author, "auto");
        return (
          <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>
              by {author?.name || "uknown"} at {post.date}
            </p>
            {Object.entries(post.reactions).map(([key, value]) => (
              <button onClick={() => handleReactions(post.id, key)}>
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
