import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";

import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";

import { bookParadiseApi } from "@/services/bookParadiseApi";

import cartSlice from "../slices/cartSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const combinedReducers = combineReducers({
  [bookParadiseApi.reducerPath]: bookParadiseApi.reducer,
  cart: cartSlice,
});

const persistedReducers = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookParadiseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch: () => AppDispatch = useDispatch;

setupListeners(store.dispatch);
