//api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (dataToSend) => ({
        url: '/sign-up',
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: dataToSend,
      }),
    }),

    signIn: builder.mutation({
      query: (formData) => ({
        url: '/login',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = api;
