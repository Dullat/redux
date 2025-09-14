import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: "1",
    title: "Learning Redux toolkit",
    content: "I am learning redux toolkit",
  },
  {
    id: "2",
    title: "Learning Cloud express",
    content: "I am learning cloud express",
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload); // immer js taking care under the hood , it creating new state
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

export const selectAllPosts = (state) => state.posts;

export default postsSlice.reducer;
