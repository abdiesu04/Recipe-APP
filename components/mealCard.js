import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import PointText from './text/PointText';
import Title from './text/Title';
import classes from './MealCard.module.scss';

function MealCard({ meal, onClick }) {
  return (
    <Card className={classes.mealCard} onClick={onClick}>
      <CardMedia
        component="img"
        height="140"
        image={meal.strMealThumb}
        alt={meal.strMeal}
        className={classes.mealImage}
      />
      <CardContent>
        <Title variant="secondary" className={classes.mealTitle}>
          {meal.strMeal}
        </Title>
        <PointText>Category: {meal.strCategory}</PointText>
        <PointText>Area: {meal.strArea}</PointText>
      </CardContent>
    </Card>
  );
}

export default MealCard;
