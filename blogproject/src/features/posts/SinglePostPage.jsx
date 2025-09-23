import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import { useParams } from "react-router-dom";

const SinglePostPage = () => {
  const { id: postId } = useParams();
  const post = useSelector((state) => selectPostById(state, postId));
  if (!post) {
    return (
      <section>
        <h2>No Post found</h2>
      </section>
    );
  }
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
};

export default SinglePostPage;
