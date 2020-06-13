import React, { Component } from 'react'
import classes from './ContactData.module.css'
import Input from '../../../components/Ui/Input/Input'
import Button from '../../../components/Ui/Button/Button'
import Spinner from '../../../components/Ui/Spinner/Spinner'
import axios from '../../../axios-orders'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

import { changedHandler } from '../../../shared/utils'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'

class ContactData extends Component {
  _isMounted = false
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        errorMessage: '',
      },
      street: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Your street',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail',
        },
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'password',
          placeholder: 'password',
        },
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
        errorMessage: '',
      },
      country: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Your country',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip code',
        },
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
          isNumeric: true,
        },
        valid: false,
        touched: false,
        errorMessage: '',
      },
      deliveryMethod: {
        elementType: 'select',
        value: 'fastest',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
      },
    },
    formIsValid: false,
  }

  OrderHandler = (e) => {
    e.preventDefault()
    const orderForm = {}
    for (const [key, val] of Object.entries(this.state.orderForm)) {
      orderForm[key] = val.value.toLowerCase()
    }
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.price,
      orderData: orderForm,
      userId: this.props.userId,
    }

    this._isMounted && this.props.onOrderBurger(order, this.props.token)
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  componentDidMount() {
    this._isMounted = true
  }

  render() {
    const formConfig = []
    for (const [key, val] of Object.entries(this.state.orderForm)) {
      formConfig.push({ id: key, config: val })
    }
    const inputElement = formConfig.map((ele) => {
      return (
        <Input
          key={ele.id}
          elementType={ele.config.elementType}
          elementConfig={ele.config.elementConfig}
          value={ele.config.value}
          invalid={!ele.config.valid}
          shouldValidate={ele.config.validation}
          touched={ele.config.touched}
          errorMessage={ele.config.errorMessage}
          changed={(ev) =>
            changedHandler(
              this.state,
              ev,
              ele.id,
              this.setState.bind(this),
              'checkout'
            )
          }
        />
      )
    })

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data.</h4>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.OrderHandler}>
            {inputElement}
            <Button btnType="Success" disabled={!this.state.formIsValid}>
              ORDER
            </Button>
          </form>
        )}
      </div>
    )
  }
}

const mapState = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
})

const mapActions = (dispatch) => ({
  onOrderBurger: (orderData, token) =>
    dispatch(actions.purchaseBurger(orderData, token)),
})

export default connect(
  mapState,
  mapActions
)(withErrorHandler(ContactData, axios))
