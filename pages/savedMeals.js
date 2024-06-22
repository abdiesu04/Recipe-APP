import React, { useEffect, useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { BeatLoader } from 'react-spinners';
import { useRouter } from 'next/router';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from '@mui/material';
import { AddPhotoAlternate, Fastfood, Delete } from '@mui/icons-material';
import Title from '../components/text/Title';
import MealCard from '../components/MealCard';
import { getSingleMeal } from './meals/[id]';
import classes from './savedMeals.module.scss';

function SavedMeals() {
  const [savedMealsId, setSavedMealsId] = useState([]);
  const [customMeals, setCustomMeals] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [detailMeal, setDetailMeal] = useState(null);
  const [newMeal, setNewMeal] = useState({
    idMeal: '',
    strMeal: '',
    strCategory: '',
    strArea: '',
    strInstructions: '',
    strMealThumb: '',
    strIngredient: '',
  });

  const categories = [
    'Chicken', 'Dessert', 'Lamb', 'Miscellaneous', 'Pasta', 'Pork', 'Seafood', 'Side', 'Starter',
    'Vegan', 'Vegetarian', 'Breakfast', 'Goat', 'Beef and Mustard Pie', 'Beef And Mustard Pie'
  ];

  const router = useRouter();

  const queries = savedMealsId.map((id) => ({
    queryKey: ['singleMeal', id],
    queryFn: () => getSingleMeal({ queryKey: ['singleMeal', id] }),
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
    setNewMeal({
      idMeal: '',
      strMeal: '',
      strCategory: '',
      strArea: '',
      strInstructions: '',
      strMealThumb: '',
      strIngredient: '',
    });
    setOpenDialog(false);
  };

  const handleMealClick = (meal) => {
    setDetailMeal(meal);
    setOpenDetailDialog(true);
  };

  const handleRemoveSavedMeal = (mealId) => {
    const updatedMeals = savedMealsId.filter((id) => id !== mealId);
    setSavedMealsId(updatedMeals);
    localStorage.setItem('savedMeals', JSON.stringify(updatedMeals));
  };

  const handleLogout = () => {
    // Perform logout actions here, e.g., clear authentication tokens
    localStorage.removeItem('accessToken'); // Example: Remove access token from local storage
    router.push('/login'); // Redirect to login page after logout
  };

  return (
    <div className={classes.pageWrapper}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Recipe Finder
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Home
          </Button>
          <Button color="inherit" onClick={() => setOpenDialog(true)}>
            Add Your Own
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Title variant="h4" className={classes.pageTitle}>
          My Saved Meal List
        </Title>
        <Grid container spacing={3}>
          {savedMealsId.length <= 0 && customMeals.length <= 0 && (
            <Typography variant="h5" className={classes.noMealsText}>
              You have no saved meals
            </Typography>
          )}
          {result &&
            result.map(({ data, isLoading }) => (
              <Grid item xs={12} sm={6} md={4} key={data?.idMeal}>
                <Card
                  className={classes.mealCard}
                  onClick={() => handleMealClick(data)}
                  elevation={3}
                >
                  {isLoading ? (
                    <BeatLoader color="#000" loading={isLoading} size={20} />
                  ) : (
                    <>
                      <CardMedia
                        component="img"
                        height="200"
                        image={data?.strMealThumb}
                        alt={data?.strMeal}
                        className={classes.cardImage}
                      />
                      <CardContent>
                        <Typography variant="h6" className={classes.mealTitle}>
                          {data?.strMeal}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Category: {data?.strCategory}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Area: {data?.strArea}
                        </Typography>
                        <IconButton
                          aria-label="delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveSavedMeal(data.idMeal);
                          }}
                          className={classes.deleteIcon}
                        >
                          <Delete />
                        </IconButton>
                      </CardContent>
                    </>
                  )}
                </Card>
              </Grid>
            ))}
          {customMeals.map((meal) => (
            <Grid item xs={12} sm={6} md={4} key={meal.idMeal}>
              <Card
                className={classes.mealCard}
                onClick={() => handleMealClick(meal)}
                elevation={3}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={meal.strMealThumb}
                  alt={meal.strMeal}
                  className={classes.cardImage}
                />
                <CardContent>
                  <Typography variant="h6" className={classes.mealTitle}>
                    {meal.strMeal}
                  </Typography>
                  <IconButton
                    aria-label="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveSavedMeal(meal.idMeal);
                    }}
                    className={classes.deleteIcon}
                  >
                    <Delete />
                  </IconButton>
                </CardContent>
              </Card>
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
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              name="strCategory"
              value={newMeal.strCategory}
              onChange={handleInputChange}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
          <TextField
            margin="dense"
            label="Ingredients"
            name="strIngredient"
            fullWidth
            multiline
            rows={2}
            value={newMeal.strIngredient}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            component="label"
            fullWidth
            startIcon={<AddPhotoAlternate />}
          >
            Upload Image
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
          {newMeal.strMealThumb && (
            <img src={newMeal.strMealThumb} alt="Meal" className={classes.previewImage} />
          )}
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

      <Dialog open={openDetailDialog} onClose={() => setOpenDetailDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>{detailMeal?.strMeal}</DialogTitle>
        <DialogContent>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={detailMeal?.strMealThumb}
              alt={detailMeal?.strMeal}
            />
            <CardContent>
              <Typography variant="h5" className={classes.detailText}>
                Category: <strong>{detailMeal?.strCategory}</strong>
              </Typography>
              <Typography variant="h5" className={classes.detailText}>
                Area: <strong>{detailMeal?.strArea}</strong>
              </Typography>
              <Typography variant="body1" className={classes.detailText}>
                Instructions: {detailMeal?.strInstructions}
              </Typography>
              <Typography variant="body1" className={classes.detailText}>
                Ingredients:
              </Typography>
              <List dense>
                {detailMeal?.strIngredient && detailMeal.strIngredient.split(',').map((ingredient, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Fastfood />
                    </ListItemIcon>
                    <ListItemText primary={ingredient.trim()} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetailDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SavedMeals;
