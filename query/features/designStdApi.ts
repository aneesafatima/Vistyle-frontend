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
    createSticker: builder.mutation<CreateStickerResponse, CreateStickerRequest>({
      query: (body) => {
        console.log("Creating sticker with body:", body);
        return {
          url: "/create-sticker",
          method: "POST",
          body,
        };
      },
    }),
    deleteSticker: builder.mutation({
      query: ({ id, email }: { id: string; email: string }) => ({
        url: `/delete-sticker`,
        method: "DELETE",
        body: { email, stickerId: id },
      }),
    }),
    deleteCategory: builder.mutation({
      query: ({ category, email }: { category: string; email: string }) => ({
        url: `/delete-category`,
        method: "DELETE",
        body: { email, category },
      }),
    }),
  }),
});

export const {
  useCreateStickerMutation,
  useDeleteStickerMutation,
  useDeleteCategoryMutation,
} = designStdApi;
