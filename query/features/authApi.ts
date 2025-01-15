import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
type userData = {
  name?: string;
  email: string;
  password: string;
  passwordConfirm?: string;
};
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:5000/api/v1/auth`,
  }),
  endpoints: (builder) => ({
    signUpUser: builder.mutation({
      query: (userData: userData) => {
        console.log("Making hook call");
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
  }),
});

export const {
  useSignUpUserMutation,
  useLoginUserMutation,
  useTokenStatusQuery,
} = authApi;
