import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session"; // Session Storage
import { persistReducer, persistStore } from "redux-persist";
import { reducers, persisted } from "./slices";
import { reducerApi, apiSlices } from "./services";

// Redux Persist config
const authPersistConfig = {
  key: "auth",
  storage: storageSession,
};

// Persisted auth reducer
const persistedAuthReducer = persistReducer(
  authPersistConfig,
  persisted.authReducer
);
// Combine all reducers
const rootReducer = combineReducers({
  ...reducerApi,
  authData: persistedAuthReducer,
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

// create Persistor
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
