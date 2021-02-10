import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import poolsReducer from "../features/pools-list/poolsListSlice";

export const store = configureStore({
  reducer: {
    pools: poolsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;
