import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${Constants.expoConfig?.extra?.EXPO_BACKEND_URL}api/v1/products`,
  }),
  endpoints: (builder) => ({
    productList: builder.query({
      query: (store: string) => {
        return {
          url: "/",
          method: "GET",
          params: {
            store,
          },
        };
      },
    }),
  }),
});

export const { useProductListQuery } = productsApi;
