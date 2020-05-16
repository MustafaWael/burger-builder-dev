import React, { Component } from 'react'
import classes from './ContactData.module.css'
import Input from '../../../components/Ui/Input/Input'
import Button from '../../../components/Ui/Button/Button'
import Spinner from '../../../components/Ui/Spinner/Spinner'
import axios from '../../../axios-orders'

import { connect } from 'react-redux'

class ContactData extends Component {
  _isMounted = false
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        errorMessage: ''
      },
      street: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Your street'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Your country'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip code'
        },
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
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
    loading: false
  }

  changedHandler = (ev, inputId) => {
    const { value: evTargetValue } = ev.target
    const updatedOrderForm = {
      ...this.state.orderForm
    }

    const { validation } = updatedOrderForm[inputId]

    updatedOrderForm[inputId].value = evTargetValue;

    if (updatedOrderForm[inputId].elementType !== 'select') {
      updatedOrderForm[inputId].touched = true
      updatedOrderForm[inputId].valid = this.checkValidaity(evTargetValue, validation)
    }

    let formIsValid = true
    for (const id in updatedOrderForm) {
      if (updatedOrderForm[id].elementType !== 'select') {
        formIsValid = updatedOrderForm[id]?.valid && formIsValid
      }
    }

    this.errorMessage(inputId, updatedOrderForm)
    this.setState({ orderForm: updatedOrderForm, formIsValid })
  }

  errorMessage = (inputId, updatedOrderForm) => {
    // if (inputId === 'name') {
    //   if (updatedOrderForm[inputId].value.length < 12) updatedOrderForm[inputId].errorMessage = 'should be 12'
    //   else updatedOrderForm[inputId].errorMessage = ''
    // }

    if (inputId === 'zipCode') {
      if (updatedOrderForm.zipCode.value.length > updatedOrderForm.zipCode.validation.minLength ||
        updatedOrderForm.zipCode.value.length < updatedOrderForm.zipCode.validation.maxLength
      ) updatedOrderForm[inputId].errorMessage = 'should be 5'
      else updatedOrderForm[inputId].errorMessage = ''
    }
  }

  checkValidaity = (value, rules) => {
    let isValid = true

    if (rules?.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (rules?.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules?.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }
    return isValid
  }

  OrderHandler = (e) => {
    e.preventDefault()
    this.setState({ loading: true });
    const orderForm = {}
    for (const [key, val] of Object.entries(this.state.orderForm)) {
      orderForm[key] = val.value.toLowerCase()
    }
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.price,
      orderData: orderForm
    };
    this._isMounted = true

    axios.post('/orders.json', { ...order })
      .then(() => {
        this.props.history.push('/')
        this._isMonted && this.setState({ loading: false })
      })
      .catch(() => {
        this.props.history.push('/')
        this._isMonted && this.setState({ loading: false })
      })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    const formConfig = []
    for (const [key, val] of Object.entries(this.state.orderForm)) {
      formConfig.push({ id: key, config: val })
    }
    const inputElement = formConfig.map(ele => {
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
          changed={(ev) => this.changedHandler(ev, ele.id)}
        />
      )
    })


    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data.</h4>
        {
          this.state.loading
            ? <Spinner />
            : <form onSubmit={this.OrderHandler}>
              {inputElement}
              <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        }
      </div>
    )
  }
}

const mapState = state => ({
  ingredients: state.ingredients,
  price: state.totalPrice
})
export default connect(mapState)(ContactData)
