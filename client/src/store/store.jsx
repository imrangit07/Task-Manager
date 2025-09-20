import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/AuthSlice"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
};

const UsersdReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: {
        auth: UsersdReducer,
    },
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
})


export default store;
export const persistor = persistStore(store);