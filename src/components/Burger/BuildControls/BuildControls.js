import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.css'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
]

const BuildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>Current price: <strong>{props.price.toFixed(2)}$</strong></p>
      {controls.map(ctrl => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            addIngHandler={() => props.addIngHandler(ctrl.type)}
            removeIngHandler={() => props.removeIngHandler(ctrl.type)}
            disabled={props.disabled(ctrl.type)}
          />
        )
      })}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        Order now
        </button>
    </div>
  )
}

export default BuildControls
