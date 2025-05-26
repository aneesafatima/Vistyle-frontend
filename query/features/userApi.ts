import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${Constants.expoConfig?.extra?.EXPO_BACKEND_URL}api/v1/users`,
  }),
  endpoints: (builder) => ({
    updateUserDetails: builder.mutation({
      query: ({
        userId,
        data,
      }: {
        userId: string;
        data: updatedUserDataType | null;
      }) => {
        return {
          url: `/${userId}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    updateUserPassword: builder.mutation({
      query: ({
        data,
        userId,
      }: {
        data: { password: string; newpassword: string };
        userId: string;
      }) => {
        return {
          url: `/update-password/${userId}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
  }),
});

export const { useUpdateUserDetailsMutation, useUpdateUserPasswordMutation } =
  userApi;
