import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, Selector } from "../app/store";

export interface SuggestionType {
  value: string;
  label: string;
}

interface HelpState {
  suggestions: SuggestionType[];
  implement: string;
  ignore: string[];
}

const initialState: HelpState = {
  suggestions: [],
  implement: "",
  ignore: [],
};

export const helpSlice = createSlice({
  name: "help",
  initialState,
  reducers: {
    addSuggestion: (state, action: PayloadAction<SuggestionType>) => {
      const newSuggestions = [...state.suggestions];
      state.suggestions = newSuggestions.filter(
        (suggestion: SuggestionType) => suggestion.value !== action.payload.value
      );
      state.suggestions.push(action.payload);
    },
    removeSuggestion: (state, action: PayloadAction<string>) => {
      state.implement = "";
      const newSuggestions = [...state.suggestions];
      state.suggestions = newSuggestions.filter(
        (suggestion: SuggestionType) => suggestion.value !== action.payload
      );
    },
    implementSuggestion: (state, action: PayloadAction<string>) => {
      state.implement = action.payload;
      const newSuggestions = [...state.suggestions];
      state.suggestions = newSuggestions.filter(
        (suggestion: SuggestionType) => suggestion.value !== action.payload
      );
    },
    ignoreSuggestion: (state, action: PayloadAction<string>) => {
      state.ignore.push(action.payload);
    },
  },
});

export const selectSuggestions: Selector<SuggestionType[]> = (state: RootState) =>
  state.help.suggestions.filter(
    (suggestion: SuggestionType) => !state.help.ignore.includes(suggestion.value)
  );

export const selectImplement: Selector<string> = (state: RootState) => state.help.implement;

export const { addSuggestion, removeSuggestion, implementSuggestion, ignoreSuggestion } =
  helpSlice.actions;

export default helpSlice.reducer;
