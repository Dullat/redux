import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPostIds, getPostsStatus, getPostsError } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  const posts = useSelector(selectPostIds);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    console.log(posts);
  }, [postStatus]);

  let content;
  if (postStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postStatus === "succeeded") {
    content = posts.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};
export default PostsList;

