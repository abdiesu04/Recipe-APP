import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { BeatLoader } from 'react-spinners';
import PointText from '../components/text/PointText';
import Text from '../components/text/Text';
import Title from '../components/text/Title';
import { getSingleMeal } from './meals/[id]';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { AddPhotoAlternate, AccountCircle, LockOutlined } from '@mui/icons-material';
import classes from './savedMeals.module.scss';

function SavedMeals() {
  const [savedMealsId, setSavedMealsId] = useState([]);
  const [customMeals, setCustomMeals] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newMeal, setNewMeal] = useState({
    idMeal: '',
    strMeal: '',
    strCategory: '',
    strArea: '',
    strInstructions: '',
    strMealThumb: '',
  });

  const queries = savedMealsId.map((id) => ({
    queryKey: ['singleMeal', id],
    queryFn: getSingleMeal,
  }));

  const result = useQueries({ queries });

  useEffect(() => {
    if (localStorage.getItem('savedMeals')) {
      setSavedMealsId(JSON.parse(localStorage.getItem('savedMeals')));
    }
    if (localStorage.getItem('customMeals')) {
      setCustomMeals(JSON.parse(localStorage.getItem('customMeals')));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeal((prevMeal) => ({ ...prevMeal, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewMeal((prevMeal) => ({ ...prevMeal, strMealThumb: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddMeal = () => {
    const newMealId = `custom_${Date.now()}`;
    const updatedMeals = [...customMeals, { ...newMeal, idMeal: newMealId }];
    setCustomMeals(updatedMeals);
    localStorage.setItem('customMeals', JSON.stringify(updatedMeals));
    setOpenDialog(false);
  };

  return (
    <div className={classes.pageWrapper}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Recipe Finder
          </Typography>
          <Button color="inherit" onClick={() => router.push('/')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => setOpenDialog(true)}>
            Add Your Own
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Title variant="primary" className={classes.pageTitle}>
          My Saved Meal List
        </Title>
        <Grid container spacing={3} className={classes.list_container}>
          {savedMealsId.length <= 0 && customMeals.length <= 0 && <Text>You have no saved meals</Text>}
          {result &&
            result.map(({ data, isLoading }, index) => {
              if (isLoading) {
                return (
                  <Grid item xs={12} sm={6} md={4} key={savedMealsId[index]}>
                    <BeatLoader color="#000" loading={isLoading} size={20} />
                  </Grid>
                );
              }

              return (
                <Grid item xs={12} sm={6} md={4} key={data.idMeal}>
                  <Link href={`/meals/${data.idMeal}`} passHref>
                    <Paper elevation={3} className={classes.singleMeal}>
                      <img src={data.strMealThumb} alt={data.strMeal} className={classes.mealImage} />
                      <Title variant="secondary" className={classes.mealTitle}>
                        {data.strMeal}
                      </Title>
                      <PointText>Category: {data.strCategory}</PointText>
                      <PointText>Area: {data.strArea}</PointText>
                    </Paper>
                  </Link>
                </Grid>
              );
            })}
          {customMeals &&
            customMeals.map((meal) => (
              <Grid item xs={12} sm={6} md={4} key={meal.idMeal}>
                <Paper elevation={3} className={classes.singleMeal}>
                  <img src={meal.strMealThumb} alt={meal.strMeal} className={classes.mealImage} />
                  <Title variant="secondary" className={classes.mealTitle}>
                    {meal.strMeal}
                  </Title>
                  <PointText>Category: {meal.strCategory}</PointText>
                  <PointText>Area: {meal.strArea}</PointText>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </Container>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Your Own Recipe</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Meal Name"
            name="strMeal"
            fullWidth
            value={newMeal.strMeal}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Category"
            name="strCategory"
            fullWidth
            value={newMeal.strCategory}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Area"
            name="strArea"
            fullWidth
            value={newMeal.strArea}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Instructions"
            name="strInstructions"
            fullWidth
            multiline
            rows={4}
            value={newMeal.strInstructions}
            onChange={handleInputChange}
          />
          <Button variant="contained" component="label" fullWidth startIcon={<AddPhotoAlternate />}>
            Upload Image
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
          {newMeal.strMealThumb && <img src={newMeal.strMealThumb} alt="Meal" className={classes.previewImage} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddMeal} color="primary">
            Add Recipe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SavedMeals;
