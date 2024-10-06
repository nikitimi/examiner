import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import onboardingReducer from "@/redux/reducers/onboardingReducer";
import questionReducer from "@/redux/reducers/questionReducer";
import themeReducer from "./reducers/themeReducer";

// Inferred state type example:
// {todos: TodosState, counter: CounterState}
export type RootState = ReturnType<typeof store.getState>;

// Inferred dispatch type: Dispatch & ThunkDispatch<RootState, undefined, UnknownAction>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = configureStore({
  reducer: {
    question: questionReducer,
    theme: themeReducer,
    onboarding: onboardingReducer,
  },
});
