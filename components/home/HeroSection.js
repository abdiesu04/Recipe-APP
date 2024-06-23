import React, { useState, useEffect } from 'react';
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
  AppBar,
  Toolbar,
  Container,
  Box,
  Paper,
  Divider,
  ListItem,
  List,
  ListItemText,
} from '@mui/material';
import { AccountCircle, LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import classes from './HeroSection.module.scss';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false); // State to toggle between login and signup forms
  const router = useRouter();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
    setIsSignup(false); // Reset to login form when closing dialog
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost/recipe_app_backend/logout.php');
      if (response.data.status === 'success') {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        // Additional logout logic, if any
      } else {
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleToggleForm = () => {
    setIsSignup(!isSignup); // Toggle between login and signup forms
    setMessage(''); // Clear any existing messages
  };

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
    setLoading(true);
    const endpoint = isSignup ? 'http://localhost/recipe_app_backend/register.php' : 'http://localhost/recipe_app_backend/login.php';
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
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        setTimeout(() => {
          handleLoginClose(); // Close the dialog after successful login or signup
          setIsSignup(false); // Reset to login form if registered
          if (!isSignup) {
            // Redirect or update state for logged in user
            // Example: Router.push('/meals');
          }
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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Recipe Finder
          </Typography>
          {isLoggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLoginOpen}>
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* HeroSection */}
      <section className={classes.hero__section} style={{ background: '#f0f0f0', color: '#333', minHeight: '100vh' }}>
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
                    <Link href="/meals" passHref>
                      <Button variant="contained" color="primary" fullWidth>
                        Explore Meals
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="/savedMeals" passHref>
                      <Button variant="outlined" color="primary" fullWidth>
                        Saved Meals
                      </Button>
                    </Link>
                  </Grid>
                </>
              ) : (
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" fullWidth onClick={handleLoginOpen}>
                    Sign In
                  </Button>
                </Grid>
              )}
            </Grid>
          </div>
        </div>
      </section>

      {/* Login Dialog */}
      <Dialog open={loginOpen} onClose={handleLoginClose} fullWidth maxWidth="xs">
        <DialogTitle>{isSignup ? 'Sign Up' : 'Sign In'}</DialogTitle>
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
                {isSignup && (
                  <Field
                    as={TextField}
                    type="email"
                    name="email"
                    label="Email"
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
                    helperText={<ErrorMessage name="email" />}
                  />
                )}
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
                  {isSignup ? 'Sign Up' : 'Sign In'}
                  {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </Button>
              </Form>
            )}
          </Formik>
          <Typography variant="body2" align="center">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <Button color="primary" onClick={handleToggleForm}>
              {isSignup ? 'Sign In' : 'Sign Up'}
            </Button>
          </Typography>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className={classes.footer}>
        <Paper elevation={3} className={classes.footerContent}>
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">About Us</Typography>
                <Typography variant="body2">
                  Recipe Finder is a platform dedicated to helping you find the perfect meal recipes.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Contact Us</Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="Email" secondary="contact@recipefinder.com" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Phone" secondary="+1234567890" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Legal</Typography>
                <Typography variant="body2">
                  © 2024 Recipe Finder. All rights reserved.
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </footer>
    </div>
  );
};

export default Home;
