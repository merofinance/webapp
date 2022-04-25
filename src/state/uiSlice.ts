import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface UiState {
  betaSnackbarDismissed: boolean;
  pausedSnackbarDismissed: boolean;
}

const initialState: UiState = {
  betaSnackbarDismissed: false,
  pausedSnackbarDismissed: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    dismissBetaSnackbar: (state) => {
      state.betaSnackbarDismissed = true;
    },
    dismissPausedSnackbar: (state) => {
      state.pausedSnackbarDismissed = true;
    },
  },
});

export const { dismissBetaSnackbar, dismissPausedSnackbar } = uiSlice.actions;

export const selectBetaSnackbarDismissed = (state: RootState): boolean =>
  state.ui.betaSnackbarDismissed;

export const selectPausedSnackbarDismissed = (state: RootState): boolean =>
  state.ui.pausedSnackbarDismissed;

export default uiSlice.reducer;
