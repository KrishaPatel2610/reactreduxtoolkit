//postApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const postApi = createApi({
  reducerPath: 'posts',
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
    createPost: builder.mutation({
      query: (postData) => ({
        url: '/posts/create-post',
        method: 'POST',
        body: postData,
      }),
    }),

    getFeedPost: builder.query({
      query: ({ page, perPage, search, isMyPostsOnly, isPrivate }) => ({
        url: '/posts/get-feed-posts',
        params: { page, perPage, search, isMyPostsOnly, isPrivate },
      }),
    }),

    getImage: builder.query({
      query: (postId) => ({
        url: `/posts/get-feed-image`,
        params: { postId },
      }),
    }),
  }),
});

export const { useCreatePostMutation, useGetFeedPostQuery, useGetImageQuery } =
  postApi;

const getCookieToken = () => {
  const token = Cookies.get('token');
  return token;
};
