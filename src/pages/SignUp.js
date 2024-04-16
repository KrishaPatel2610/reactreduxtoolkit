//Sign-up.jsx
import { useState } from 'react';
import { toast } from 'react-toastify';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllUsersQuery, useSignUpMutation } from '../services/userApi';
import { Link } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  let all_username = [];
  let all_emails = [];
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
  });

  const [error, setError] = useState({
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    userNameError: '',
    passwordError: '',
  });
  const [signUp, { isLoading }] = useSignUpMutation();
  const { data: users } = useGetAllUsersQuery();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateFirstName = () => {
    const { firstname } = formData;
    if (!firstname) {
      setError((prevState) => ({
        ...prevState,
        firstNameError: 'First Name is required.',
      }));
      return false;
    }
    setError((prevState) => ({
      ...prevState,
      firstNameError: '',
    }));
    return true;
  };
  const validateLastName = () => {
    const { lastname } = formData;
    if (!lastname) {
      setError((prevState) => ({
        ...prevState,
        lastNameError: 'Last Name is required.',
      }));
      return false;
    }
    setError((prevState) => ({
      ...prevState,
      lastNameError: '',
    }));
    return true;
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

  const validateUserName = () => {
    const { username } = formData;
    if (!username) {
      setError((prevState) => ({
        ...prevState,
        userNameError: 'Username is required.',
      }));
      return false;
    }

    setError((prevState) => ({
      ...prevState,
      userNameError: '',
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

  const handleSignUp = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isUserNameValid = validateUserName();
    const isPasswordValid = validatePassword();
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();

    users.data.forEach((element) => {
      all_username.push(element.username);
      all_emails.push(element.email);
    });

    let isEmailVerify = true;
    let isUserNameVerify = true;
    if (
      isEmailValid &&
      isFirstNameValid &&
      isLastNameValid &&
      isUserNameValid &&
      isPasswordValid
    ) {
      all_username.forEach((user) => {
        if (formData.username === user) {
          toast.error('Username already taken.');
          isUserNameVerify = false;
        }
      });

      all_emails.forEach((item) => {
        if (item === formData.email) {
          toast.error('Email already exists.');
          isEmailVerify = false;
        }
      });
      if (isEmailVerify && isUserNameVerify) {
        try {
          const userCredentials = { ...formData };
          const dataToSend = {
            ...userCredentials,
            isPrivate: true,
          };

          await signUp(dataToSend);
          toast.success('User registered successfully!');
          navigate('/sign-in');
        } catch (error) {
          const errorMessage =
            error?.data?.message || error?.error || 'Failed to register user.';
          toast.error(errorMessage);
        }
      }
    }
  };

  return (
    <div className='signUp-main'>
      <p className='sign-up' align='center'>
        Register Yourself!
      </p>
      <form className='signUp-form' onSubmit={handleSignUp}>
        <input
          type='text'
          className='first-name'
          name='firstname'
          placeholder='First Name'
          value={formData.firstname}
          onChange={handleChange}
        />
        {error.firstNameError && (
          <p className='error'>{error.firstNameError}</p>
        )}
        <input
          className='last-name'
          type='text'
          name='lastname'
          placeholder='Last Name'
          value={formData.lastname}
          onChange={handleChange}
        />
        {error.lastNameError && <p className='error'>{error.lastNameError}</p>}
        <input
          type='email'
          className='email'
          placeholder='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
        {error.emailError && <p className='error'>{error.emailError}</p>}
        <input
          className='user-name'
          type='text'
          name='username'
          placeholder='Username'
          value={formData.username}
          onChange={handleChange}
        />
        {error.userNameError && <p className='error'>{error.userNameError}</p>}
        <input
          type='password'
          className='password'
          placeholder='Password'
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
        {error.passwordError && <p className='error'>{error.passwordError}</p>}

        <button className='submit' disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>

        <Link to='/sign-in' className='footer'>
          <p style={{ textAlign: 'center' }}> Already a member?Login</p>
        </Link>
      </form>
    </div>
  );
}

export default SignUp;
