import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "@/redux/reducers/questionReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Infer the `RootState` and `AppDispatch` types from the store itself

// Inferred state type: {todos: TodosState, counter: CounterState}
export type RootState = ReturnType<typeof store.getState>;

// Inferred dispatch type: Dispatch & ThunkDispatch<RootState, undefined, UnknownAction>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = configureStore({
  reducer: {
    question: questionReducer,
  },
});
