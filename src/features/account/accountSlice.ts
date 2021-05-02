import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface AccountState {
  connected: boolean;
}

const initialState: AccountState = {
  connected: false,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    logout: (state) => {
      return initialState;
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
  },
});

export const { setConnected, logout } = accountSlice.actions;

export function isConnected(state: RootState): boolean {
  return state.account.connected;
}

export default accountSlice.reducer;
