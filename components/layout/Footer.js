import React from "react";
import Image from "next/image";
import classes from "./Footer.module.scss";
import Text from "../text/Text";

function Footer() {
  return (
    <footer className={classes.footer}>
      <Text>Find the perfect meal recipe for you</Text>
      <Text className={classes.copyright}>
        © RSenterprices 2023 All right reserved.
      </Text>
    </footer>
  );
}

export default Footer;
