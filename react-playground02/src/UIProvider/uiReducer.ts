// uiReducer.ts
import { type UIAction, type UIState } from "./UIState";

export const initialUIState: UIState = {
  isLoading: false,
  toast: null,
};

export function uiReducer(state: UIState, action: UIAction): UIState {

  switch (action.type) {
    case "SHOW_LOADING":
      return { ...state, isLoading: true };

    case "HIDE_LOADING":
      return { ...state, isLoading: false };

    case "SHOW_TOAST":
      return {
        ...state,
        toast: {
          message: action.payload.message,
          type: action.payload.toastType,
        },
      };

    case "CLEAR_TOAST":
      return { ...state, toast: null };

    default:
      return state;
  }
}
