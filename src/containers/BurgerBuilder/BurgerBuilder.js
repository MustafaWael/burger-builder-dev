import React, { Component } from 'react'
import Aux from '../../hoc/AuxComponent/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/Ui/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
import Spinner from '../../components/Ui/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'

class BurgerBuilder extends Component {
  _isMounted = false

  state = {
    purchasing: false,
    // loading: false,
  }

  updatePurchaseState(updatedIngredients) {
    let sum = 0
    for (const i in updatedIngredients) {
      sum += updatedIngredients[i]
    }
    return sum > 0
  }

  disabled = (type) => {
    const ingredients = { ...this.props.ingredients }
    if (ingredients[type] < 1) {
      return 'disabled'
    }
  }

  purchaseHandler = (target) => {
    this.props.isAuth
      ? this.setState({ purchasing: target !== 'cancel' })
      : this.props.history.push('/auth')

    if (this.props.isAuth) {
      this.setState({ purchasing: target !== 'cancel' })
    } else {
      this.props.onSetAuthPath('/checkout')
      this.props.history.push('/auth')
    }
  }

  purchaseContinueHandler = () => {
    this._isMounted && this.props.onPerchaseInit()
    this.props.history.push('checkout')
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  componentDidMount() {
    this._isMounted = true
    this._isMounted && this.props.onInitIngredients()
  }

  render() {
    let orderSummery = null
    let burger = this.props.error ? (
      <p style={{ textAlign: 'center' }}>{this.props.error}</p>
    ) : (
      <Spinner />
    )
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
            isAuth={this.props.isAuth}
          />
        </Aux>
      )
      orderSummery = (
        <OrderSummery
          ingredients={this.props.ingredients}
          totalPrice={this.props.totalPrice}
          cancelled={this.purchaseHandler}
          continued={this.purchaseContinueHandler}
        />
      )
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
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  isAuth: state.auth.token,
})

const mapDispatches = (dispatch) => ({
  addIng: (ingName) => dispatch(actions.addIngredient(ingName)),
  removeIng: (ingName) => dispatch(actions.removeIngredient(ingName)),
  onInitIngredients: () => dispatch(actions.initialIngredients()),
  onPerchaseInit: () => dispatch(actions.onOrderPurchased()),
  onSetAuthPath: (path) => dispatch(actions.setAuthPath(path)),
})

export default connect(
  mapState,
  mapDispatches
)(withErrorHandler(BurgerBuilder, axios))
