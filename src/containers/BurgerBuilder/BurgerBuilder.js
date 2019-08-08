import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import axios from "../../axios-orders";

const ingredientsPrice = {
  salad: 0.5,
  cheese: 4,
  meat: 1.3,
  bacon: 2
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseBurger: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("https://react-burger-project-sonia.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({
          ingredients: response.data
        });
      })
      .catch(error => {
        this.setState({
          error: true
        })
      });
  }

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
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Sonia",
        address: {
          street: "Ahmedabad",
          zipcode: "380007",
          state: "Gujarat",
          country: "India"
        },
        email: "test@gmail.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({
          loading: false,
          purchasing: false
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          purchasing: false
        });
      });
  };

  render() {
    const disableButton = {
      ...this.state.ingredients
    };

    for (let key in disableButton) {
      disableButton[key] = disableButton[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients can't be loaded.</p> : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Aux>
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

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);
