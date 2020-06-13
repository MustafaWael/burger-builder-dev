export const updateState = (oldObj, updatedProperties) => {
  return {
    ...oldObj,
    ...updatedProperties,
  }
}

export const checkValidaity = (value, rules) => {
  let isValid = true

  if (!rules) {
    return true
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    isValid = pattern.test(value) && isValid
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/
    isValid = pattern.test(value) && isValid
  }

  return isValid
}

export const changedHandler = (state, ev, inputId, setState, route) => {
  const { value: evTargetValue } = ev.target
  const updatedOrderForm = {
    ...state.orderForm,
  }

  const { validation } = updatedOrderForm[inputId]

  updatedOrderForm[inputId].value = evTargetValue

  if (updatedOrderForm[inputId].elementType !== 'select') {
    updatedOrderForm[inputId].touched = true
    updatedOrderForm[inputId].valid = checkValidaity(evTargetValue, validation)
  }

  let formIsValid = true
  for (const id in updatedOrderForm) {
    if (updatedOrderForm[id].elementType !== 'select') {
      formIsValid = updatedOrderForm[id]?.valid && formIsValid
    }
  }

  route === 'auth'
    ? authErrorMessage(inputId, updatedOrderForm)
    : checkoutErrorMessage(inputId, updatedOrderForm)
  setState({ orderForm: updatedOrderForm, formIsValid })
}

const authErrorMessage = (inputId, updatedOrderForm) => {
  if (inputId === 'password') {
    if (
      !(
        updatedOrderForm.password.value.length >
        updatedOrderForm.password.validation.minLength
      )
    )
      updatedOrderForm[inputId].errorMessage = 'should be greater than 5'
    else updatedOrderForm[inputId].errorMessage = ''
  }
}

const checkoutErrorMessage = (inputId, updatedOrderForm) => {
  // if (inputId === 'name') {
  //   if (updatedOrderForm[inputId].value.length < 12) updatedOrderForm[inputId].errorMessage = 'should be 12'
  //   else updatedOrderForm[inputId].errorMessage = ''
  // }

  if (inputId === 'password') {
    if (
      !(
        updatedOrderForm.password.value.length >=
        updatedOrderForm.password.validation.minLength
      )
    )
      updatedOrderForm[inputId].errorMessage = 'should be greater than 4'
    else updatedOrderForm[inputId].errorMessage = ''
  }

  if (inputId === 'zipCode') {
    if (
      updatedOrderForm.zipCode.value.length >
        updatedOrderForm.zipCode.validation.minLength ||
      updatedOrderForm.zipCode.value.length <
        updatedOrderForm.zipCode.validation.maxLength
    )
      updatedOrderForm[inputId].errorMessage = 'should be 5'
    else updatedOrderForm[inputId].errorMessage = ''
  }
}
