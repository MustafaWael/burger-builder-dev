import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.module.css'

const Burger = props => {
  // First one

  // let transformedIngredients = Object.keys(props.ingredients)
  //   .map(igKey => {
  //     return [...Array(props.ingredients[igKey])].map((_, i) => {
  //       return <BurgerIngredient key={igKey + i} type={igKey} />
  //     })
  //   }).reduce((arr, el) => {
  //     return arr.concat(el)
  //   }, [])

  // if (transformedIngredients.length === 0) {
  //   transformedIngredients = <p>Please start adding ingredients!</p>
  // }


  // Second one
  let ingredients = []

  for (const id of Object.keys(props.ingredients)) {
    for (let index = 0; index < props.ingredients[id]; index++) {
      ingredients.unshift(<BurgerIngredient key={id + index} type={id} />)
    }
  }

  if (ingredients.length === 0) {
    ingredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {ingredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  )
}

export default Burger
