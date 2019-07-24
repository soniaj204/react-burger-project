import React from "react";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import "./Burger.css";

const Burger = (props) => {

  const arrayIngredients = Object.keys(props.ingredients)
    .map(ingredientkey => {
      return [...Array(props.ingredients[ingredientkey])].map((_, i) => {
        return  <BurgerIngredient key={ingredientkey + i} type={ingredientkey} />
      });
  });

  return (
    <div className="burger">
      <BurgerIngredient type="bread-top" />
      {arrayIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
