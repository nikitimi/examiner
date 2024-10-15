import * as books from "@/lib/utils/bookHelper";
import { createSlice } from "@reduxjs/toolkit";

type BookData = (typeof books)[keyof typeof books];
type BookNames = BookData["displayName"];

type InitialState = {
  bookData: BookData[];
  currentTopic: string;
  itemsLimit: number;
  selectedBook: BookNames;
};

const initialState: InitialState = {
  bookData: [
    books.hematology,
    books.hemostasisAndThrombosis,
    books.immunohematology,
    books.immunology,
    books.laboratoryOperations,
    books.microbiology,
  ],
  currentTopic: "",
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
    setCurrentTopic: (
      state,
      action: { payload: InitialState["currentTopic"] }
    ) => {
      state.currentTopic = action.payload;
    },
  },
});

export const { selectBook, setCurrentTopic } = questionSlice.actions;
export default questionSlice.reducer;
