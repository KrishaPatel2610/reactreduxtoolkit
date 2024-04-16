//store.js
import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../services/userApi';
import { postApi } from '../services/postApi';

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, postApi.middleware),
});

export default store;
