import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, Selector } from "../app/store";
import { Optional } from "../lib/types";

export enum Suggestion {
  POSITION_LOW,
  THRESHOLD_LOW,
  THRESHOLD_HIGH,
  SINGLE_LOW,
}

export interface SuggestionType {
  type: Suggestion;
  text: string;
  button: string;
  data?: any;
}

interface HelpState {
  suggestions: SuggestionType[];
  implement: Optional<SuggestionType>;
  ignore: Suggestion[];
}

const initialState: HelpState = {
  suggestions: [],
  implement: null,
  ignore: [],
};

export const helpSlice = createSlice({
  name: "help",
  initialState,
  reducers: {
    addSuggestion: (state, action: PayloadAction<SuggestionType>) => {
      const newSuggestions = [...state.suggestions];
      state.suggestions = newSuggestions.filter(
        (suggestion: SuggestionType) => suggestion.type !== action.payload.type
      );
      state.suggestions.push(action.payload);
    },
    removeSuggestion: (state, action: PayloadAction<Suggestion>) => {
      state.implement = null;
      const newSuggestions = [...state.suggestions];
      state.suggestions = newSuggestions.filter(
        (suggestion: SuggestionType) => suggestion.type !== action.payload
      );
    },
    implementSuggestion: (state, action: PayloadAction<SuggestionType>) => {
      state.implement = action.payload;
      const newSuggestions = [...state.suggestions];
      state.suggestions = newSuggestions.filter(
        (suggestion: SuggestionType) => suggestion.type !== action.payload.type
      );
    },
    ignoreSuggestion: (state, action: PayloadAction<Suggestion>) => {
      state.ignore.push(action.payload);
    },
  },
});

export const selectSuggestions: Selector<SuggestionType[]> = (state: RootState) =>
  state.help.suggestions.filter(
    (suggestion: SuggestionType) => !state.help.ignore.includes(suggestion.type)
  );

export const selectImplement: Selector<Optional<SuggestionType>> = (state: RootState) =>
  state.help.implement;

export const { addSuggestion, removeSuggestion, implementSuggestion, ignoreSuggestion } =
  helpSlice.actions;

export default helpSlice.reducer;