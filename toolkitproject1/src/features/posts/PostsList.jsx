import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const users = useSelector(selectAllUsers);
  console.log(users, posts);

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
              by {author?.name || "uknown"} at {post.time}
            </p>
          </article>
        );
      })}
    </section>
  );
};

export default PostsList;
