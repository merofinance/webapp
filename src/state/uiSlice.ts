import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface UiState {
  betaSnackbarDismissed: boolean;
}

const initialState: UiState = {
  betaSnackbarDismissed: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    dismissBetaSnackbar: (state) => {
      state.betaSnackbarDismissed = true;
    },
  },
});

export const { dismissBetaSnackbar } = uiSlice.actions;

export const selectBetaSnackbarDismissed = (state: RootState): boolean =>
  state.ui.betaSnackbarDismissed;

export default uiSlice.reducer;
