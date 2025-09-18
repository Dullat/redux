import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get("http://jsomplaceholder.typicode.com/posts");
  return [...response.data];
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload); // immer js taking care under the hood , it creating new state
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            time: sub(new Date(), { minutes: 10 }).toISOString(),
          },
        };
      },
    },
  },
});

export const { postAdded } = postsSlice.actions;

export const selectAllPosts = (state) => state.posts.posts;

export default postsSlice.reducer;
