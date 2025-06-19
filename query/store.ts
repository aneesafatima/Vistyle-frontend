import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/authApi";
import { productsApi } from "./features/productApi";
import { userApi } from "./features/userApi";
import { designStdApi } from "./features/designStdApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [designStdApi.reducerPath]: designStdApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(designStdApi.middleware)
      .concat(productsApi.middleware)
      .concat(userApi.middleware),
});
