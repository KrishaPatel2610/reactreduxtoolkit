//userApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const userApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    prepareHeaders: (headers) => {
      const token = getCookieToken();

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

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
    getUser: builder.query({
      query: (id) => ({
        url: `/users/get-user`,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: '/users/get-all-user',
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useGetUserQuery,
  useGetAllUsersQuery,
} = userApi;

const getCookieToken = () => {
  const token = Cookies.get('token');
  return token;
};
