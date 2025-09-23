import PostsList from "../features/posts/PostsList";
import AddPostForm from "../features/posts/AddPostForm";
const HomePage = () => {
  return (
    <div>
      <AddPostForm />
      <PostsList />
    </div>
  );
};

export default HomePage;
