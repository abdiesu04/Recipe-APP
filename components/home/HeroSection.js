import React from "react";
import Link from "next/link";
import classes from "./HeroSection.module.scss";
import Text from "../text/Text";
import ButtonWithLink from "../button/Button";

function HeroSection() {
  return (
    <section className={classes.hero__section}>
      <div className={classes.hero__container}>
        <div className={classes.hero__info}>
          <h1 className={classes.hero__title}>
            Find the perfect <span>meal recipe</span> for you
          </h1>
          <Text>a listing website of meal recipe</Text>
          <div className={classes.hero__buttons}>
            <ButtonWithLink link="/meals" variant="primary">
              Explore Meals
            </ButtonWithLink>
            <ButtonWithLink link="/savedMeals">Saved Meals</ButtonWithLink>
            <Link href="/auth">
              <span className={classes.auth__link}>Sign In / Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
