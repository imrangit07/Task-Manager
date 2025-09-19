import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/AuthSlice"
import taskReducer from './reducers/TaskSlice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
};

const UsersdReducer = persistReducer(persistConfig, authReducer);
const TasksReducer = persistReducer(persistConfig, taskReducer);

const store = configureStore({
    reducer: {
        auth: UsersdReducer,
        task:TasksReducer
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