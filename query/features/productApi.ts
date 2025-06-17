import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/",
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
    productListByText: builder.query({
      query: (searchText: string) => {
        console.log("searchText", searchText);
        
        return ({
        url: "list",
        method: "GET",
        params: {
          country: "in",
          lang: "en",
          currentpage: "0",
          pagesize: "30",
          query: searchText,
        },
      })},
    }),
  }),
});

export const { useProductListByTextQuery } = productsApi;
