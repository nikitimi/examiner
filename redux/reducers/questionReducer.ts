import * as books from "@/lib/utils/bookHelper";
import { createSlice } from "@reduxjs/toolkit";

type BookData = (typeof books)[keyof typeof books];
type BookNames = BookData["displayName"];

type InitialState = {
  bookData: BookData[];
  currentItemIndex: number;
  itemsLimit: number;
  selectedBook: BookNames;
};

const initialState: InitialState = {
  bookData: [books.hematology, books.hemostasisAndThrombosis],
  currentItemIndex: 0,
  itemsLimit: 10,
  selectedBook: "hematology",
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    selectBook: (state, action: { payload: InitialState["selectedBook"] }) => {
      state.selectedBook = action.payload;
    },
    setCurrentItemIndex: (
      state,
      action: { payload: InitialState["currentItemIndex"] }
    ) => {
      state.currentItemIndex = action.payload;
    },
  },
});

export const { selectBook, setCurrentItemIndex } = questionSlice.actions;
export default questionSlice.reducer;
