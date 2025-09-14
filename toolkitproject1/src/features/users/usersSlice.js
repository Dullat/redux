import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Dude Lebowaski" },
  { id: "1", name: "Neil Young" },
  { id: "2", name: "Dullat jatt" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
