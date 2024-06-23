import Image from "next/image";
import Link from "next/link";
import React from "react";
import Title from "../text/Title";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import classes from "./SingleMealCard.module.scss";

function SingleMealCard({ meal }) {
  return (
    <Link legacyBehavior href={`/meals/${meal.idMeal}`}>
      <a className={classes.item}>
        <Card className={classes.card} elevation={0} sx={{ cursor: 'pointer', borderRadius: '12px', backgroundColor: '#f0f0f3', boxShadow: '9px 9px 16px #c5c5c6, -9px -9px 16px #ffffff' }}>
          <CardMedia
            component="img"
            height="200"
            image={meal.strMealThumb}
            alt={meal.strMeal}
            sx={{ objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
          />
          <CardContent sx={{ padding: '16px' }}>
            <Typography variant="h6" className={classes.title} sx={{ color: '#0976d2', textAlign: 'center', fontWeight: 'bold' }}>
              {meal.strMeal}
            </Typography>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}

export default SingleMealCard;
