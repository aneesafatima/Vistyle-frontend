import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./features/authApi";
import { imageApi } from "./features/imageApi";
import { productsApi } from "./features/productApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(imageApi.middleware).concat(productsApi.middleware),
});
