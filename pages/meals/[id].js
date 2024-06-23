import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";
import Image from "next/image";
import { FaHeartBroken, FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  IconButton,
  Button,
  styled, // Import styled from @mui/system
} from "@mui/material";
import { AddCircleOutline, Home, Fastfood, Logout, Delete } from "@mui/icons-material";
import classes from "./meals.module.scss";
import Title from "../../components/text/Title";
import PointText from "../../components/text/PointText";
import IngredientsTable from "../../components/mealsPage/IngredientsTable";
import Text from "../../components/text/Text";
import Link from "next/link";

export const getSingleMeal = async ({ queryKey }) => {
  const { data } = await axios.get(`/lookup.php?i=${queryKey[1]}`);
  return data?.meals?.[0];
};

const LogoutButton = styled(Button)({
  color: "#fff",
  fontWeight: "bold",
  marginLeft: "10px",
});

function SingleMeals() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useQuery(["singleMeal", id], getSingleMeal);
  const [isSaved, setIsSaved] = React.useState(false);

  useEffect(() => {
    if (localStorage.getItem("savedMeals")) {
      const savedMeals = JSON.parse(localStorage.getItem("savedMeals"));
      if (savedMeals.includes(id)) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    } else {
      localStorage.setItem("savedMeals", JSON.stringify([]));
    }
  }, [id]);

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading || !data) {
    return <BeatLoader color="#fff" size={20} />;
  }

  const ingredients = Object.keys(data)
    .filter((key) => key.startsWith("strIngredient"))
    .filter((key) => data[key] !== "" && data[key] !== null);

  const ingredientsWithMeasures = ingredients.map((key, index) => ({
    index: index + 1,
    ingredient: data[key],
    measure: data[`strMeasure${index + 1}`],
  }));

  const handleSaveButtonClick = async () => {
    const savedMeals = JSON.parse(localStorage.getItem("savedMeals"));
    if (!isSaved) {
      savedMeals.push(data.idMeal);
      localStorage.setItem("savedMeals", JSON.stringify(savedMeals));
      toast.success("Meal saved successfully");
      setIsSaved(true);
    } else {
      savedMeals.splice(savedMeals.indexOf(data.idMeal), 1);
      localStorage.setItem("savedMeals", JSON.stringify(savedMeals));
      setIsSaved(false);
      toast.error("Meal Removed successfully");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/");
  };

  return (
    <div className={classes.pageWrapper}>
      <AppBar position="static" sx={{ backgroundColor: "#1976d2", marginBottom: "20px" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Recipe Finder
          </Typography>
          <Link href="/" passHref>
            <Button color="inherit" startIcon={<Home />}>
              Home
            </Button>
          </Link>
          <Link href="/savedMeals" passHref>
            <Button color="inherit" startIcon={<Fastfood />}>
              Saved Meals
            </Button>
          </Link>
          <Link href="/meals" passHref>
            <Button color="inherit" startIcon={<AddCircleOutline />}>
              Meals
            </Button>
          </Link>
          <LogoutButton variant="outlined" onClick={handleLogout} startIcon={<Logout />}>
            Logout
          </LogoutButton>
        </Toolbar>
      </AppBar>
      <Container>
        <div className={classes.topContainer}>
          <div className={classes.img}>
            <Image src={data.strMealThumb} height={300} width={300} alt={data.strMeal} />
          </div>
          <div className={classes.info}>
            <Title variant="primary">{data.strMeal}</Title>
            <PointText className={classes.infoText}>Category: {data.strCategory}</PointText>
            <PointText className={classes.infoText}>Area: {data.strArea}</PointText>
            <PointText className={classes.infoText}>tags: {data?.strTags?.split(",").join(", ")}</PointText>
            {isSaved && <Text className={classes.greenText}>You already saved the meal.</Text>}
            <Button
              variant="contained"
              color="primary"
              className={classes.saveButton}
              onClick={handleSaveButtonClick}
              startIcon={isSaved ? <FaHeartBroken /> : <FaHeart className={classes.saveIcon} />}
            >
              {isSaved ? "Remove" : "Save"}
            </Button>
          </div>
        </div>
        <div className={classes.ingredientsTable}>
          <IngredientsTable ingredientsWithMeasures={ingredientsWithMeasures} />
        </div>
        <div className={classes.instructions}>
          <Title>Instructions</Title>
          {data.strInstructions
            .split(".")
            .filter((sentence) => sentence !== "")
            .map((sentence, index) => (
              <PointText key={index}>{sentence.trim()}.</PointText>
            ))}
        </div>
      </Container>
    </div>
  );
}

export default SingleMeals;
