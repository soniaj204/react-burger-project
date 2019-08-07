import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

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
    totalPrice: 4,
    purchaseBurger: false,
    purchasing: false
  };

  purchaseBurgerEvent(ingredients) {
    const sum = Object.keys(ingredients)
      .map(ingredientKey => {
        return ingredients[ingredientKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({
      purchaseBurger: sum > 0
    });
  }

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
    this.purchaseBurgerEvent(newIngredients);
  };

  removeIngredientEvent = type => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
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
    this.purchaseBurgerEvent(newIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert("You continue!");
  };

  render() {
    const disableButton = {
      ...this.state.ingredients
    };

    for (let key in disableButton) {
      disableButton[key] = disableButton[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredients={this.addIngredientEvent}
          removeIngredients={this.removeIngredientEvent}
          disabled={disableButton}
          price={this.state.totalPrice}
          purchaseBurger={this.state.purchaseBurger}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
