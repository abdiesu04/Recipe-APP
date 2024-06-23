import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";
import Title from "../text/Title";
import classes from "./IngredientsTable.module.scss";

function IngredientsTable({ ingredientsWithMeasures }) {
  return (
    <>
      <Title className={classes.title}>Ingredients</Title>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableBody>
            {ingredientsWithMeasures.map((ingredient) => (
              <TableRow key={ingredient.index} className={classes.tableRow}>
                <TableCell className={classes.tableCell}>{ingredient.ingredient}</TableCell>
                <TableCell className={classes.tableCell}>{ingredient.measure}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default IngredientsTable;
