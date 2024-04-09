// pages/Home.js
import React from 'react';
// import { useQuery } from 'react-query';
import { useAuth } from '../contexts/AuthContext';
// import { getPosts } from '../api/posts';
// import { Post } from '../components/Post';
import { CreatePostModal } from '../components/CreatePostModal';
import { Link, Outlet } from 'react-router-dom';

import Navigation from '../components/Navigation';

export const Home = () => {
  // const { isAuthenticated, logout } = useAuth();
  //  const { data: posts, isLoading, isError } = useQuery('posts', getPosts);
  // if (!isAuthenticated()) return null;

  return (
    <div>
      <Navigation />

      {/* {isError && <div>Error fetching posts</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )} */}
      {/* <CreatePostModal /> */}
      <Outlet />
    </div>
  );
};
