// CreatePostModel.js

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreatePostMutation } from '../services/postApi';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function CreatePostModal({ isPrivate }) {
  const [image, setImage] = useState(null);
  const [isPostPrivate, setIsPostPrivate] = useState(isPrivate || false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [createPost] = useCreatePostMutation();

  const handleImageUpload = (event) => {
    const uploadedImage = event.target.files[0];
    setImage(uploadedImage);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('image', image);
    formData.append('isPrivate', isPostPrivate);

    try {
      const response = await createPost(formData).unwrap();
      Cookies.set('postId', response.data._id);
      navigate('/view-post');
      toast.success('Post Added Successfully!!');
      setImage(null);
      reset();
    } catch (error) {
      toast.error('Failed to add post');
    }
  };

  return (
    <div className='post-content'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <div>
              <input
                {...register('image', {
                  validate: () => {
                    if (!image) {
                      return 'Image is required';
                    } else {
                      return true;
                    }
                  },
                })}
                id='image-upload'
                type='file'
                ref={inputRef}
                accept='image/*'
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
              <label htmlFor='image-upload'>
                <div>
                  {image ? (
                    <img
                      className='profile-img'
                      src={URL.createObjectURL(image)}
                      alt='Uploaded avatar'
                      onClick={handleClick}
                    />
                  ) : (
                    <label htmlFor='image-upload'>
                      <img
                        src='https://cdn-icons-png.flaticon.com/512/2809/2809039.png'
                        alt='profile-img'
                        className='profile-img'
                      />
                    </label>
                  )}
                </div>
              </label>
            </div>
          </div>
          {errors.image && !image && (
            <div>
              <p className='error'>{errors.image.message}</p>
            </div>
          )}
          <div>
            <input
              type='text'
              {...register('title', { required: true })}
              className='title'
              placeholder='Title'
            />
            {errors.title && <p className='error'>Title is required</p>}
          </div>
          <div>
            <input
              type='text'
              {...register('description', { required: true })}
              className='description'
              placeholder='Description'
            />
            {errors.description && (
              <p className='error'>Description is required</p>
            )}
          </div>
          <div className='radio-button'>
            <label>
              <input
                type='radio'
                checked={isPostPrivate}
                onChange={() => setIsPostPrivate(!isPostPrivate)}
              />
              <span style={{ color: '#8c55aa', fontSize: '0.7em' }}>
                Private Post
              </span>
            </label>
            <label>
              <input
                type='radio'
                checked={!isPostPrivate}
                onChange={() => setIsPostPrivate(!isPostPrivate)}
              />
              <span style={{ color: '#8c55aa', fontSize: '0.7em' }}>
                Public Post
              </span>
            </label>
          </div>

          <div>
            <button className='submit' type='submit'>
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

CreatePostModal.propTypes = {
  isPrivate: PropTypes.bool,
};
