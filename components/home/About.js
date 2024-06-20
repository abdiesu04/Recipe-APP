import React from "react";
import Text from "../text/Text";
import Title from "../text/Title";
import classes from "./About.module.scss";

function About() {
  return (
    <div className={classes.about}>
      <Title className={classes.title}>What is Recipe-Finder</Title>

      <Text>
        A website used for listing food recipies build and powerd by NextJS.
        <br />
      </Text>
    </div>
  );
}

export default About;
