import React, { useState } from 'react';
import Link from 'next/link';
import {
  Grid,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { AccountCircle, LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import classes from './HeroSection.module.scss';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    const endpoint = 'http://localhost/recipe_app_backend/login.php';
    const data = { username: values.username, password: values.password };

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
        setMessage('Authentication successful!');
        setIsLoggedIn(true);
        setTimeout(() => {
          handleLoginClose(); // Close the dialog after successful login
        }, 2000);
      } else {
        setMessage(response.data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={classes.container}>
      {/* Navbar */}
      <nav className={classes.navbar}>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <ul className={classes.navLinks}>
              <li>
                <Link href="/meals">
                  <Typography variant="body1" className={classes.link}>
                    Meals
                  </Typography>
                </Link>
              </li>
              {isLoggedIn && (
                <li>
                  <Link href="/savedMeals">
                    <Typography variant="body1" className={classes.link}>
                      Saved List
                    </Typography>
                  </Link>
                </li>
              )}
              {!isLoggedIn && (
                <li>
                  <Typography variant="body1" className={classes.link} onClick={handleLoginOpen}>
                    Sign In / Sign Up
                  </Typography>
                </li>
              )}
            </ul>
          </Grid>
        </Grid>
      </nav>

      {/* HeroSection */}
      <section className={classes.hero__section}>
        <div className={classes.hero__container}>
          <div className={classes.hero__info}>
            <Typography variant="h2" className={classes.hero__title}>
              Find the perfect <span>meal recipe</span> for you
            </Typography>
            <Typography variant="body1" className={classes.hero__text}>
              A listing website of meal recipes
            </Typography>
            <Grid container spacing={2} className={classes.hero__buttons}>
              {isLoggedIn ? (
                <>
                  <Grid item xs={12} sm={6}>
                    <Button variant="contained" color="primary" fullWidth>
                      Explore Meals
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button variant="outlined" color="primary" fullWidth>
                      Saved Meals
                    </Button>
                  </Grid>
                </>
              ) : (
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" fullWidth onClick={handleLoginOpen}>
                    Sign In / Sign Up
                  </Button>
                </Grid>
              )}
            </Grid>
          </div>
        </div>
      </section>

      {/* Login Dialog */}
      <Dialog open={loginOpen} onClose={handleLoginClose} fullWidth maxWidth="xs">
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          {message && <div className={classes.message}>{message}</div>}
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
              <Form className={classes.auth__form}>
                <Field
                  as={TextField}
                  type="text"
                  name="username"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  helperText={<ErrorMessage name="username" />}
                />
                <Field
                  as={TextField}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  helperText={<ErrorMessage name="password" />}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting || loading}
                  className={classes.submit__button}
                >
                  Sign In
                  {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
