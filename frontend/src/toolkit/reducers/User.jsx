import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, actions) => {
      (state.isAuthenticated = true),
        (state.isLoading = false),
        (state.user = actions.payload);
    },
    logOut: (state) => {
      (state.isAuthenticated = false),
        (state.isLoading = true),
        (state.user = null);
    },
  },
});

export const { logOut, setAuth } = authSlice.actions;
export default authSlice.reducer;
