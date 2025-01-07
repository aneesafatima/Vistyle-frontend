import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/auth' }),
    endpoints: (builder) => ({
        signUpUser: builder.mutation({
        query: (userData) => (
            {
                url: '/signup',
                method: 'POST',
                body: userData //change this as needed
                     
            }
        ),
        }),
        loginUser: builder.mutation({
            query: (userData) => (
                {
                    url: '/login',
                    method: 'POST',
                    body: userData //change this as needed 
                }
            ),
        }),
    }),
})


export const { useSignUpUserMutation, useLoginUserMutation } = authApi;