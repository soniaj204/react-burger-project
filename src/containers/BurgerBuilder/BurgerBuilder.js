import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const ingredientsPrice = {
  salad: 0.5,
  cheese: 4,
  meat: 1.3,
  bacon: 2
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  };

  addIngredientEvent = type => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const newIngredients = {
      ...this.state.ingredients
    };
    newIngredients[type] = newCount;

    const priceAdded = ingredientsPrice[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAdded;
    this.setState({ totalPrice: newPrice, ingredients: newIngredients });
  };

  removeIngredientEvent = type => {
    const oldCount = this.state.ingredients[type];

    if(oldCount <= 0) {
      return;
    }

    const newCount = oldCount - 1;
    const newIngredients = {
      ...this.state.ingredients
    };
    newIngredients[type] = newCount;

    const priceRemoved = ingredientsPrice[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceRemoved;
    this.setState({ totalPrice: newPrice, ingredients: newIngredients });
  };

  render() {

    const disableButton = {
      ...this.state.ingredients
    }

    for(let key in disableButton) {
      disableButton[key] = disableButton[key] <= 0
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredients={this.addIngredientEvent}
          removeIngredients={this.removeIngredientEvent}
          disabled={disableButton}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
