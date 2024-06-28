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
import Home from './HeroSection';

const Welcome = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSignup, setIsSignup] = useState(false); // State to toggle between login and signup forms
    const router = useRouter();
  const handleLoginOpen = () => {
    setLoginOpen(true);
  };
  const handleLoginClose = () => {
    setLoginOpen(false);
    setIsSignup(false); // Reset to login form when closing dialog
  };
  return (
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
</section>  )
}

export default Welcome