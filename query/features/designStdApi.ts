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
interface CreateStickerResponse {
  success: boolean;
  stickers: {
    category: string;
    position: string;
    price: number;
    url: string;
    code: string;
    _id: string;
  }[];
}
export const designStdApi = createApi({
  reducerPath: "designStdApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${Constants.expoConfig?.extra?.EXPO_BACKEND_URL}api/v1/design-studio`,
  }),
  endpoints: (builder) => ({
    createSticker: builder.mutation<
      CreateStickerResponse,
      CreateStickerRequest
    >({
      query: (body) => {
        console.log("Creating sticker with body:", body);
        return {
          url: "/create-sticker",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useCreateStickerMutation } = designStdApi;
