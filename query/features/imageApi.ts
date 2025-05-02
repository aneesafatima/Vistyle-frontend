import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";
export const imageApi = createApi({
  reducerPath: "imageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${Constants.expoConfig?.extra?.EXPO_BACKEND_URL}api/v1/design-studio`,
  }),
  endpoints: (builder) => ({
    maskedImage: builder.query({
      query: (imgURL: string) => {
        return {
          url: "/create-item-mask",
          method: "GET",
          params: {
            imgURL,
          },
        };
      },
    }),
    removeBackground: builder.query({
      query: ({ imgURL, email }: { imgURL: string; email: string }) => {
        console.log("Image URL: ", imgURL);
        console.log("Email: ", email);
        return {
          url: "/remove-bg",
          method: "GET",
          params: {
            imgURL,
            email,
          },
        };
      },
    }),
  }),
});

export const { useMaskedImageQuery, useRemoveBackgroundQuery } = imageApi;
