import { EMPTY_STRING } from "@/constants/String";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  user: string;
};

const initialState: InitialState = {
  user: EMPTY_STRING,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUserCredentials: (
      state,
      action: {
        payload: InitialState["user"];
      }
    ) => {
      state.user = action.payload;
    },
  },
});

export const { setUserCredentials } = authenticationSlice.actions;
export default authenticationSlice.reducer;
