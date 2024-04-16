// UserProfile.js
import React from 'react';
import { useGetUserQuery } from '../services/userApi';

const UserProfile = () => {
  const { data: user, error, isLoading } = useGetUserQuery();
  console.log('data', user);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className='user-profile'>
      <h1>Heyy {user.data.username}</h1>
      <hr />
      <p>
        {user.data.firstname} {user.data.lastname}
      </p>
      <div className='feed-icons' style={{ marginLeft: '8em' }}>
        <i className='pi pi-heart' style={{ margin: '1em' }}></i>
        <i className='pi pi-envelope' style={{ margin: '1em' }}></i>
        <i className='pi pi-users' style={{ margin: '1em' }}></i>
      </div>
    </div>
  );
};

export default UserProfile;
