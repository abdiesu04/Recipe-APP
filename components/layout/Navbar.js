import React from "react";
import Link from "next/link";
import classes from "./Navbar.module.scss";

function Navbar() {
  return (
    <nav className={classes.navbar}>
      <ul className={classes.navLinks}>
        <li>
          <Link href="/meals">Meals</Link>
        </li>
        <li>
          <Link href="/savedMeals">Saved List</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
