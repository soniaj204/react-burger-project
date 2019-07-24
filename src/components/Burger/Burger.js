import React from "react";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import "./Burger.css";

const Burger = (props) => {

  let arrayIngredients = Object.keys(props.ingredients)
    .map(ingredientkey => {
      return [...Array(props.ingredients[ingredientkey])].map((_, i) => {
        return  <BurgerIngredient key={ingredientkey + i} type={ingredientkey} />
      });
  }).reduce((arr, el) => {
    return arr.concat(el)
  }, []);

  if(arrayIngredients.length === 0) {
      arrayIngredients = <p>Please add Ingredients!</p>;
  }

  return (
    <div className="burger">
      <BurgerIngredient type="bread-top" />
      {arrayIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
