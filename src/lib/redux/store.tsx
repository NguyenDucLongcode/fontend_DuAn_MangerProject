import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/reducer";
import modalReducer from "./slices/modal/reducer";
import datePickerReducer from "./slices/datePick/reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    datePicker: datePickerReducer,
  },
});

// Types cho TypeScript
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
