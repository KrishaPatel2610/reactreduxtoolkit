// pages/Home.js
import React from 'react';
import { Outlet } from 'react-router-dom';

import Navigation from '../components/Navigation';

export const Home = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
};
