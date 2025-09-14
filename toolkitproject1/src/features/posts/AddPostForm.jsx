import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { postAdded } from "./postsSlice";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && content) {
      dispatch(postAdded(title, content, userId));
    }
  };

  const onAuthorChanged = (e) => setUserId(e.target.value);

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>add new post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">PostTitle</label>
        <input
          type="text"
          name="postTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="postContent">PostContent</label>
        <input
          type="text"
          name="postContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <select value={userId} onChange={onAuthorChanged}>
          <option value={"none"}>Author</option>
          {userOptions}
        </select>
        <button type="submit">submit</button>
      </form>
    </section>
  );
};

export default AddPostForm;
