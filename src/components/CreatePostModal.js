import React from 'react';
import { useRef, useState } from 'react';

const CreatePostModal = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  function handleImageClick() {
    fileInputRef.current.click();
  }
  function handleChangeImg(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    } else {
      setFile(
        'https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg'
      );
    }
  }
  return (
    <div className='post-content'>
      <input
        type='file'
        accept='image/png,image/gif,image/jpeg'
        onChange={handleChangeImg}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />

      <img
        src={
          file ||
          'https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg'
        }
        className='profile-img'
        alt='profile'
        onClick={handleImageClick}
      />

      <input
        type='text'
        className='title'
        placeholder='Title'
        name='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder='Description'
        className='description'
        name='description '
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className='submit'>Save</button>
    </div>
  );
};

export default CreatePostModal;
