import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "" || null,
  isLoggedIn: false,
  user: null,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      // console.log("action", action);
      state.token = action.payload;
      // console.log("state.token", state.token);
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  //   },
});

export const { setToken, setIsLoggedIn, setUser } = auth.actions;

export default auth.reducer;
