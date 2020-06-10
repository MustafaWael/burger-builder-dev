import { updateState } from '../reducers/utils'

const INGREDIENTS_PRICES = {
  salad: .5,
  cheese: .7,
  meat: 1.6,
  bacon: .3
};

export const initState = (state) => {
  let totalPrice = 0;
  for (const x in state.ingredients) {
    if (state.ingredients[x] > 0) {
      totalPrice += state.ingredients[x] * INGREDIENTS_PRICES[x]
    }
  }
  state = { ...state, totalPrice }
}

export const ADD_INGREDIENT = (state, action) => {
  return updateState(state, {
    ingredients: updateState(state.ingredients, { [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1 }),
    totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.payload.ingredientName],
    building: true
  })
}

export const REMOVE_INGREDIENT = (state, action) => {
  return updateState(state, {
    ingredients: updateState(state.ingredients, { [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1 }),
    totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.payload.ingredientName],
    building: true
  })
}

export const SET_INGREDIENTS = (state, action) => {
  return updateState(state, { ingredients: action.ingredients, totalPrice: 0, building: false })
}

export const FETCH_INGREDIENTS_FAILED = (state) => {
  return updateState(state, { error: true })
}
