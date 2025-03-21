import resetPassword from "@/app/(auth)/forgot-password";
import OtpVerify from "@/components/OtpVerify";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";
type userData = {
  name?: string;
  email: string;
  password?: string;
  passwordConfirm?: string;
  otp?: string;
};
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${Constants.expoConfig?.extra?.EXPO_BACKEND_URL}api/v1/auth`,
  }),
  endpoints: (builder) => ({
    signUpUser: builder.mutation({
      query: (userData: userData) => {
        return {
          url: "/signup",
          method: "POST",
          body: userData, //change this as needed
        };
      },
    }),
    loginUser: builder.mutation({
      query: (userData: userData) => ({
        url: "/login",
        method: "POST",
        body: userData, //change this as needed
      }),
    }),
    tokenStatus: builder.query({
      query: (token: string) => {
        console.log("checking token status");
        return {
          url: "/token-status",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    forgotPassword: builder.mutation({
      query: (userData: userData) => {
        console.log("Data in forgot password", userData);
        return {
          url: "/forgot-password",
          method: "POST",
          body: userData, //change this as needed
        };
      },
    }),
    OtpVerify: builder.mutation({
      query: (userData: userData) => {
        console.log("Data in otp verify", userData);
        return {
          url: "/check-otp",
          method: "POST",
          body: userData, //change this as needed
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (userData: userData) => {
        console.log("Data in reset password", userData);
        return {
          url: "/reset-password",
          method: "PATCH",
          body: userData, //change this as needed
        };
      },
    }),
  }),
});

export const {
  useSignUpUserMutation,
  useLoginUserMutation,
  useTokenStatusQuery,
  useForgotPasswordMutation,
  useOtpVerifyMutation,
  useResetPasswordMutation,
} = authApi;
