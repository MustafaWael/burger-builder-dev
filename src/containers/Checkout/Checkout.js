import React, { Component } from 'react'
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery'
import ContactData from './ContactData/ContactData'
import { Route } from 'react-router-dom'

import { connect } from 'react-redux'

class Checkout extends Component {
  cancelHandler = () => {
    this.props.history.goBack()
  };

  continueHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  };

  render() {
    return (
      <div style={{ marginTop: 80 }}>
        <CheckoutSummery
          ingredients={this.props.ingredients}
          continue={this.continueHandler}
          cancel={this.cancelHandler}
        />

        <Route
          path={`${this.props.match.path}/contact-data`}
          component={ContactData}>
        </Route>
      </div>
    )
  }
}

const mapState = state => ({
  ingredients: state.ingredients
})

export default connect(mapState)(Checkout)
