// pages/SignIn.js
import Cookies from 'js-cookie';
import '../index.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSignInMutation } from '../services/userApi';

export const SignIn = () => {
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useSignInMutation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    emailError: '',
    passwordError: '',
  });

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEmail = () => {
    const { email } = formData;
    if (!email) {
      setError((prevState) => ({
        ...prevState,
        emailError: 'Email is required.',
      }));
      return false;
    }

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      setError((prevState) => ({
        ...prevState,
        emailError: 'Please enter a valid email.',
      }));
      return false;
    }

    setError((prevState) => ({
      ...prevState,
      emailError: '',
    }));
    return true;
  };

  const validatePassword = () => {
    const { password } = formData;
    if (!password) {
      setError((prevState) => ({
        ...prevState,
        passwordError: 'Password is required.',
      }));
      return false;
    }

    if (password.length < 6) {
      setError((prevState) => ({
        ...prevState,
        passwordError: 'Password must be at least 6 characters long.',
      }));
      return false;
    }

    setError((prevState) => ({
      ...prevState,
      passwordError: '',
    }));
    return true;
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    if (isEmailValid && isPasswordValid) {
      try {
        const result = await signIn(formData);
        const { data } = result;

        if (data && data.data._id) {
          Cookies.set('userID', data.data._id);
        }
        const token = data.data.accessToken;
        if (data && token) {
          Cookies.set('token', token);
          navigate('/');
          toast.success('Logged in successfully!');
        }
      } catch (error) {
        toast.error('Failed to sign in.');
      }
    }
  };

  return (
    <div className='signIn-main'>
      <p className='sign' align='center'>
        Sign in
      </p>
      <form className='form1'>
        <input
          className='email'
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={onHandleChange}
        />
        {error.emailError && <p className='error'>{error.emailError}</p>}

        <input
          type='password'
          className='password'
          placeholder='Password'
          name='password'
          value={formData.password}
          onChange={onHandleChange}
        />
        {error.passwordError && <p className='error'>{error.passwordError}</p>}
        <button className='submit' onClick={handleSignIn}>
          {isLoading ? '  Loading...' : 'Submit'}
        </button>

        <Link to='/sign-up' className='footer'>
          Register first!
        </Link>
      </form>
    </div>
  );
};
