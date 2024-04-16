import React, { useEffect } from 'react';
import { useGetFeedPostQuery, useGetImageQuery } from '../services/postApi';
import Cookies from 'js-cookie';
import 'primeicons/primeicons.css';

const ViewPost = () => {
  const userId = Cookies.get('userID');
  const postId = Cookies.get('postId');

  const {
    data: postData,
    error: postError,
    isLoading: postLoading,
    refetch: refetchPostData,
  } = useGetFeedPostQuery({
    page: 1,
    perPage: 20,
    search: { id: userId },
    isMyPostsOnly: false,
    isPrivate: false,
  });

  useEffect(() => {
    if (userId) {
      refetchPostData();
    }
  }, [userId, refetchPostData]);

  const {
    data: imageData,
    error: imageError,
    isLoading: imageLoading,
  } = useGetImageQuery(postId);

  if (postLoading || imageLoading) return <div>Loading...</div>;
  if (postError)
    return <div>Error loading post details: {postError.message}</div>;
  if (imageError) return <div>Error loading image: {imageError.message}</div>;

  return (
    <div>
      {postData?.data.data.map((item) => (
        <div className='post-feed'>
          <h5
            style={{
              paddingLeft: '2em',
              paddingTop: '2em',
              margin: 0,
            }}
          >
            {item.userData.username}
          </h5>

          {imageData && (
            <img
              src={`${imageData.imageData}`}
              className='post-img'
              alt='Post'
            />
          )}
          <div className='feed-icons' style={{ marginLeft: '2em' }}>
            <i className='pi pi-heart' style={{ margin: '1em' }}></i>
            <i className='pi pi-comment' style={{ margin: '1em' }}></i>
            <i className='pi pi-share-alt' style={{ margin: '1em' }}></i>
          </div>
          <ul className='feed-data'>
            <li key={item._id}>
              <h4> {item.title}</h4>
            </li>
            <li key={item._id}>
              <h6>{item.description}</h6>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ViewPost;
