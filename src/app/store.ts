import {
  Action,
  AsyncThunk,
  AsyncThunkOptions,
  AsyncThunkPayloadCreator,
  combineReducers,
  configureStore,
  createAsyncThunk,
  getDefaultMiddleware,
  ThunkAction,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import poolsReducer from "../state/poolsListSlice";
import lendingReducer from "../state/lendingSlice";
import userReducer from "../state/userSlice";
import errorReducer from "../state/errorSlice";
import positionsReducer from "../state/positionsSlice";
import transactionsReducer from "../state/transactionsSlice";
import uiReducer from "../state/uiSlice";
import helpReducer from "../state/helpSlice";

const rootReducer = combineReducers({
  pools: poolsReducer,
  lending: lendingReducer,
  user: userReducer,
  positions: positionsReducer,
  transactions: transactionsReducer,
  error: errorReducer,
  ui: uiReducer,
  help: helpReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  blacklist: ["error", "user", "positions", "transactions", "help"],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;

declare type AppAsyncThunkConfig = {
  state?: unknown;
  dispatch?: AppDispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

export function appCreateAsyncThunk<
  Returned,
  ThunkArg,
  ThunkApiConfig extends AppAsyncThunkConfig = { dispatch: AppDispatch }
>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, ThunkApiConfig>,
  options?: AsyncThunkOptions<ThunkArg, ThunkApiConfig>
): AsyncThunk<Returned, ThunkArg, ThunkApiConfig> {
  return createAsyncThunk<Returned, ThunkArg, ThunkApiConfig>(typePrefix, payloadCreator, options);
}

export type Selector<T> = (state: RootState) => T;

export const persistor = persistStore(store);
