// pages/auth.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import classes from './AuthPage.module.scss';

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').when('isSignup', {
      is: true,
      then: Yup.string().required('Email is required'),
    }),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    const endpoint = isSignup
      ? 'http://localhost/recipe_app_backend/register.php'
      : 'http://localhost/recipe_app_backend/login.php';
    const data = isSignup
      ? { username: values.username, email: values.email, password: values.password }
      : { username: values.username, password: values.password };
  
    try {
      const response = await axios.post(endpoint, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        transformRequest: [(data) => {
          return Object.entries(data)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
        }],
      });
      console.log(response.data);
      if (response.data.status === 'success') {
        setMessage(isSignup ? 'Registration successful!' : 'Authentication successful!');
        setTimeout(() => {
          router.push('/'); // Redirect to the home page or desired location
        }, 2000); // Adjust delay as needed
      } else {
        setMessage(response.data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className={classes.auth__container}>
      <h1>{isSignup ? 'Sign Up' : 'Sign In'}</h1>
      {message && <div className={classes.message}>{message}</div>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={classes.auth__form}>
            <div className={classes.form__group}>
              <Field type="text" name="username" placeholder="Username" className={classes.input} />
              <ErrorMessage name="username" component="div" className={classes.error} />
            </div>
            {isSignup && (
              <div className={classes.form__group}>
                <Field type="email" name="email" placeholder="Email" className={classes.input} />
                <ErrorMessage name="email" component="div" className={classes.error} />
              </div>
            )}
            <div className={classes.form__group}>
              <Field type="password" name="password" placeholder="Password" className={classes.input} />
              <ErrorMessage name="password" component="div" className={classes.error} />
            </div>
            <button type="submit" disabled={isSubmitting} className={classes.submit__button}>
              {isSignup ? 'Sign Up' : 'Sign In'}
            </button>
          </Form>
        )}
      </Formik>
      <button className={classes.toggle__button} onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
      </button>
    </div>
  );
};

export default AuthPage;
