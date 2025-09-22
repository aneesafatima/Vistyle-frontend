import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";

export const hmApi = createApi({
  reducerPath: "hmApi",
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
    productListByText: builder.query<
      any,
      { searchText: string; countryCode: string | null }
    >({
      query: ({ searchText, countryCode }) => {
        console.log(searchText, countryCode)
        return {
          url: "list",
          method: "GET",
          params: {
            country: countryCode?.toLowerCase() || "in",
            lang: "en",
            currentpage: "0",
            pagesize: "30",
            query: searchText,
          },
        };
      },
    }),
    productDetail: builder.query({
      query: ({code, countryCode}:{code: string, countryCode: string}) => {
        console.log("Fetching product detail for code:", code);
        return {
          url: "detail",
          method: "GET",
          params: {
            country: countryCode.toLowerCase() || "in",
            lang: "en",
            productcode: code,
          },
        };
      },
    }),
  }),
});

export const { useProductListByTextQuery, useProductDetailQuery } = hmApi;
