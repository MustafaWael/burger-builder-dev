import React, { Component } from 'react'
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery'
import ContactData from './ContactData/ContactData'
import { Route, Redirect, withRouter } from 'react-router-dom'

import { connect } from 'react-redux'

class Checkout extends Component {
  cancelHandler = () => {
    this.props.history.replace('/')
  }

  continueHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    let summery = <Redirect to="/" />
    const purchased = this.props.purchased ? <Redirect to="/" /> : null

    if (this.props.ingredients) {
      summery = (
        <div style={{ marginTop: 80 }}>
          {purchased}
          <CheckoutSummery
            ingredients={this.props.ingredients}
            continue={this.continueHandler}
            cancel={this.cancelHandler}
          />

          <Route
            path={`${this.props.match.path}/contact-data`}
            component={ContactData}
          ></Route>
        </div>
      )
    }

    return summery
  }
}

const mapState = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  purchased: state.order.purchased,
})

export default withRouter(connect(mapState)(Checkout))
