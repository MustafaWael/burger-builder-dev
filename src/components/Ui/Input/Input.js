import React from 'react'
import classes from './Input.module.css'

const input = ({ elementType, elementConfig, value, changed, invalid, shouldValidate, touched, errorMessage }) => {
  let inputElement = null
  const inputClasses = [classes.InputElement]
  if (invalid && shouldValidate && touched) {
    inputClasses.push(classes.Invalid)
  }

  switch (elementType) {
    case 'input':
      inputElement = <input
        className={inputClasses.join(' ')}
        {...elementConfig}
        value={value}
        onChange={changed} />
      break
    case 'textarea':
      inputElement =
        <textarea className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed} />
      break
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={value}
          onChange={changed}
        >
          {elementConfig.options.map(option =>
            <option
              key={option.value}
              value={option.value}
            >
              {option.displayValue}
            </option>
          )}
        </select>
      )
      break
    default:
      inputElement = <input className={inputClasses.join(' ')} />
  }

  return (
    <div className={classes.Input}>
      {inputElement}
      {errorMessage ? <label className={classes.Error}>{errorMessage}</label> : null}
    </div>
  )
}

export default input
