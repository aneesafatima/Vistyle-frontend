import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";
interface Product {
  email: string;
  title: string;
  price: number;
  size: string;
  url: string;
  code: string;
  img:string
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${Constants.expoConfig?.extra?.EXPO_BACKEND_URL}api/v1/products/`,
    prepareHeaders: (headers) => {
      headers.set(
        "x-rapidapi-key",
        Constants.expoConfig?.extra?.EXPO_RAPID_API_KEY
      );
      headers.set(
        "x-rapidapi-host",
        Constants.expoConfig?.extra?.EXPO_RAPID_API_HOST
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (product: Product) => {
        return {
          url: "add-to-cart",
          method: "POST",
          body: product,
        };
      },
    }),
    deleteFromCart: builder.mutation({
      query: (product: { email: string; code: string }) => {
        return {
          url: "delete-from-cart",
          method: "DELETE",
          body: product,
        };
      },
    }),
  }),
});

export const { useAddToCartMutation, useDeleteFromCartMutation } = productsApi;
