import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";
interface CreateStickerRequest {
  email: string;
  category: string;
  position: string;
  url: string;
  price: number;
  code: string;
}
export const designStdApi = createApi({
  reducerPath: "designStdApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${Constants.expoConfig?.extra?.EXPO_BACKEND_URL}api/v1/design-studio`,
  }),
  endpoints: (builder) => ({
    createSticker: builder.mutation<{ success: boolean }, CreateStickerRequest>(
      {
        query: (body) => ({
          url: "/create-sticker",
          method: "POST",
          body,
        }),
      }
    ),
  }),
});

export const { useCreateStickerMutation } = designStdApi;
