import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/reducer";
import userReducer from "./slices/user/reducer";
import projectReducer from "./slices/project/reducer";
import groupDevReducer from "./slices/groupDev/reducer";
import modalReducer from "./slices/modal/reducer";
import subscriptionReducer from "./slices/subscription/reducer";
import datePickerReducer from "./slices/datePick/reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    datePicker: datePickerReducer,
    user: userReducer,
    groupDev: groupDevReducer,
    project: projectReducer,
    subscription: subscriptionReducer,
  },
});

// Types cho TypeScript
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
