// pages/SignIn.js
import '../index.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSignInMutation } from '../services/api';

export const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    emailError: '',
    passwordError: '',
  });
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useSignInMutation();

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
        console.log('Tu bhi yaar', result);
        const { data, error } = result;
        if (data) {
          navigate('/');
          toast.success('Logged in successfully!');
        } else if (error) {
          toast.error(error.message || 'Failed to sign in.');
        }
      } catch (error) {
        console.error('Sign In Error:', error);
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
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useSignInMutation } from '../services/api';

// export const SignIn = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState({
//     emailError: '',
//     passwordError: '',
//   });
//   const navigate = useNavigate();
//   const [signIn, { isLoading }] = useSignInMutation();

//   const onHandleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const validateEmail = () => {
//     // Validation logic remains the same
//   };

//   const validatePassword = () => {
//     // Validation logic remains the same
//   };

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     const isEmailValid = validateEmail();
//     const isPasswordValid = validatePassword();
//     if (isEmailValid && isPasswordValid) {
//       try {
//         const result = await signIn(formData);
//         const { data, error } = result;
//         if (data) {
//           // Assuming backend returns a token upon successful authentication
//           // Store token in local storage or cookies
//           localStorage.setItem('token', data.token); // Change 'token' to match your actual token key
//           navigate('/');
//           toast.success('Logged in successfully!');
//         } else if (error) {
//           toast.error(error.message || 'Failed to sign in.');
//         }
//       } catch (error) {
//         console.error('Sign In Error:', error);
//         toast.error('Failed to sign in.');
//       }
//     }
//   };

//   return (
//     <div className='signIn-main'>
//       {/* Sign-in form code remains the same */}
//     </div>
//   );
// };
