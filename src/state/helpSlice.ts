import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, Selector } from "../app/store";
import { Optional } from "../lib/types";

export enum SuggestionType {
  POSITION_LOW,
  THRESHOLD_LOW,
  THRESHOLD_HIGH,
  SINGLE_LOW,
}

export interface Suggestion {
  type: SuggestionType;
  text: string;
  button: string;
  link: string;
  data?: any;
}

interface HelpState {
  suggestions: Suggestion[];
  activeSuggestion: Optional<Suggestion>;
  ignore: SuggestionType[];
}

const initialState: HelpState = {
  suggestions: [],
  activeSuggestion: null,
  ignore: [],
};

export const helpSlice = createSlice({
  name: "help",
  initialState,
  reducers: {
    addSuggestions: (state, action: PayloadAction<Suggestion[]>) => {
      let newSuggestions = [...state.suggestions];
      action.payload.forEach((sugg: Suggestion) => {
        newSuggestions = newSuggestions.filter(
          (suggestion: Suggestion) => suggestion.type !== sugg.type
        );
      });
      state.suggestions = newSuggestions;
      state.suggestions.push(...action.payload);
    },
    addSuggestion: (state, action: PayloadAction<Suggestion>) => {
      state.suggestions = state.suggestions.filter(
        (suggestion: Suggestion) => suggestion.type !== action.payload.type
      );
      state.suggestions.push(action.payload);
    },
    removeSuggestion: (state, action: PayloadAction<SuggestionType>) => {
      state.activeSuggestion = null;
      state.suggestions = state.suggestions.filter(
        (suggestion: Suggestion) => suggestion.type !== action.payload
      );
    },
    implementSuggestion: (state, action: PayloadAction<Suggestion>) => {
      state.activeSuggestion = action.payload;
      state.suggestions = state.suggestions.filter(
        (suggestion: Suggestion) => suggestion.type !== action.payload.type
      );
    },
    ignoreSuggestion: (state, action: PayloadAction<SuggestionType>) => {
      state.ignore.push(action.payload);
    },
  },
});

export const selectSuggestions: Selector<Suggestion[]> = (state: RootState) =>
  state.help.suggestions.filter(
    (suggestion: Suggestion) => !state.help.ignore.includes(suggestion.type)
  );

export const selectActiveSuggestion: Selector<Optional<Suggestion>> = (state: RootState) =>
  state.help.activeSuggestion;

export const {
  addSuggestion,
  removeSuggestion,
  implementSuggestion,
  ignoreSuggestion,
  addSuggestions,
} = helpSlice.actions;

export default helpSlice.reducer;
