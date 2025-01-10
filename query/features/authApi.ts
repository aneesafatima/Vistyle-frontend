import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
type userData = {
    name?: string;
    email: string;
    password: string;
    passwordConfirm?: string;
}
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.1.105:5000/api/v1/auth' }),
    endpoints: (builder) => ({
        signUpUser: builder.mutation({
        query: (userData:userData) =>{ 
            console.log("Making hook call")
            return(
            {
                url: '/signup',
                method: 'POST',
                body: userData //change this as needed
                     
            }
        )},
        }),
        loginUser: builder.mutation({
            query: (userData:userData) => (
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