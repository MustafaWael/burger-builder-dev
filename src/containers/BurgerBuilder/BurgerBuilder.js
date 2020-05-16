import React, { Component } from 'react'
import Aux from '../../hoc/AuxComponent/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/Ui/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
import Spinner from '../../components/Ui/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

import * as burgerBuilderActions from '../../store/actions/index'
import { connect } from 'react-redux'


class BurgerBuilder extends Component {
  _isMounted = false

  state = {
    purchasing: false,
    loading: false,
  };

  updatePurchaseState(updatedIngredients) {
    let sum = 0;
    for (const i in updatedIngredients) {
      sum += updatedIngredients[i]
    }
    return sum > 0
  }

  disabled = type => {
    const ingredients = { ...this.props.ingredients };
    if (ingredients[type] < 1) {
      return 'disabled'
    }
  };

  purchaseHandler = target => {
    this.setState({ purchasing: target !== 'cancel' })
  };

  purchaseContinueHandler = () => {
    this.props.history.push('checkout')
  };

  // componentDidMount() {
  //   this._isMounted = true

  //   axios.get('/ingredients.json')
  //     .then(res => {
  //       this._isMounted && this.setState({ ingredients: res.data });
  //       let totalPrice = 0;
  //       for (const x in this.state.ingredients) {
  //         if (this.state.ingredients[x] > 0) {
  //           totalPrice += this.state.ingredients[x] * INGREDIENTS_PRICES[x]
  //         }
  //       }
  //       this._isMounted && this.setState({ totalPrice });
  //       this.updatePurchaseState(this.state.ingredients)
  //     }).catch(err => {
  //       this._isMounted && this.setState({ error: err.message })
  //     })
  // }

  componentWillUnmount() {
    this._isMounted = false
  }

  componentDidMount() {
    this.props.onInitIngredients()
    console.log(this.props);

  }

  render() {

    let orderSummery = null;
    let burger = this.props.error ? <p style={{ textAlign: "center" }}>{this.props.error}</p> : <Spinner />;
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            addIngHandler={this.props.addIng}
            removeIngHandler={this.props.removeIng}
            price={this.props.totalPrice}
            disabled={this.disabled}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummery = <OrderSummery
        ingredients={this.props.ingredients}
        totalPrice={this.props.totalPrice}
        cancelled={this.purchaseHandler}
        continued={this.purchaseContinueHandler}
      />;
      if (this.state.loading) {
        orderSummery = <Spinner />
      }
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseHandler}>
          {orderSummery}
        </Modal>
        {burger}
      </Aux>
    )
  }

}

const mapState = (state) => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice,
  error: state.error
})

const mapDispatches = (dispatch) => ({
  addIng: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
  removeIng: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
  onInitIngredients: () => dispatch(burgerBuilderActions.initialIngredients())
})

export default connect(mapState, mapDispatches)(withErrorHandler(BurgerBuilder, axios))
