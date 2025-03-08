import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducers } from "./slices";
import { reducerApi, apiSlices } from "./services";

// Combine all reducers
const rootReducer = combineReducers({
  ...reducerApi,
  ...reducers,
});

// config middleware
const apiMiddlewares = Object.values(apiSlices).map((api) => api.middleware);

// Configure store with middleware
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(...apiMiddlewares),
});

// Export types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
