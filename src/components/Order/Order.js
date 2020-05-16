import React from 'react'
import classes from './Order.module.css'

const order = ({ price, ingredients }) => {
  const ingredientsArr = []
  for (const [key, value] of Object.entries(ingredients)) {
    ingredientsArr.push({ key, value })
  }

  const ingredientOutput = ingredientsArr.map(ingredient =>
    <span
      key={ingredient.key}
      style={{
        padding: '4px 6px',
        border: '1px solid black',
        marginLeft: 8,
        textTransform: 'capitalize',
        display: 'flex',

        flexGrow: 2,
        flexBasis: '2px'
      }}
    >
      {ingredient.key}: {ingredient.value}
    </span>)

  return (
    <div className={classes.Order}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', }}>
        <p style={{ marginRight: 2, }}>ingredients</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
          {ingredientOutput}
        </div>
      </div>
      <p>Price <span>{price.toFixed(2)} USD</span></p>
    </div>
  )
}

export default order
