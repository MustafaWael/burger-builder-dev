import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import classes from './Auth.module.css'
import Input from '../../components/Ui/Input/Input'
import Button from '../../components/Ui/Button/Button'
import Spinner from '../../components/Ui/Spinner/Spinner'

import { changedHandler } from '../../shared/utils'
import { auth, setAuthPath } from '../../store/actions/index'
import { connect } from 'react-redux'

class Auth extends Component {
  state = {
    orderForm: {
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
    },
    formIsValid: false,
    isSignUp: true,
  }

  signUpToggle = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp }
    })
  }

  authHandler = (e) => {
    e.preventDefault()
    const { email, password } = this.state.orderForm

    this.props.onAuth(email.value, password.value, this.state.isSignUp)
  }

  componentDidMount() {
    if (!this.props.burgerBuild && this.props.authPath !== '/') {
      this.props.onSetAuthPath()
    }
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
              'auth'
            )
          }
        />
      )
    })

    let form = (
      <>
        <h4>Enter your contact data.</h4>
        <form onSubmit={this.authHandler}>
          {inputElement}
          <Button btnType="Success" disabled={!this.state.formIsValid}>
            ORDER
          </Button>
        </form>
        <Button clicked={this.signUpToggle}>
          {this.state.isSignUp ? 'Sign in' : 'Sign up'}
        </Button>
      </>
    )

    let errorMessage = null
    if (this.props.error) {
      if (this.props.error.message.includes('EXIST'))
        errorMessage = <p>Sorry email exist, try another email</p>
      if (this.props.error.message.includes('NOT_FOUND'))
        errorMessage = <p>Sorry you are not signed up!!</p>
    }

    if (this.props.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.Auth}>
        {errorMessage ?? errorMessage}
        {this.props.auth ? <Redirect to={this.props.authPath} /> : form}
      </div>
    )
  }
}

const mapState = (state) => {
  const { auth, burgerBuilder } = state
  return {
    loading: auth.loading,
    error: auth.error,
    auth: auth.token,
    authPath: auth.authPath,
    burgerBuild: burgerBuilder.building,
  }
}

const mapDispatch = (dispatch) => ({
  onAuth: (email, password, isSignUp) =>
    dispatch(auth(email, password, isSignUp)),
  onSetAuthPath: () => dispatch(setAuthPath('/')),
})
export default connect(mapState, mapDispatch)(Auth)
