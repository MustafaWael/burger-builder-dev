import * as actionTypes from '../actions/actionTypes'

const initialState = {
  ingredients: null,
  totalPrice: 0,
  // purchasable: false,
  error: null
}

const INGREDIENTS_PRICES = {
  salad: .5,
  cheese: .7,
  meat: 1.6,
  bacon: .3
};

// const updatePurchasable = (updateIngredients) => {
//   let sum = 0;

//   for (const i in updateIngredients) {
//     sum += updateIngredients[i]
//   }

//   console.log(sum);
//   return sum
// }


const reducer = (state = initialState, action) => {
  // console.log(action);

  let totalPrice = 0;
  for (const x in state.ingredients) {
    if (state.ingredients[x] > 0) {
      totalPrice += state.ingredients[x] * INGREDIENTS_PRICES[x]
    }
  }
  state = { ...state, totalPrice }

  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.payload.ingredientName],
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1
        },
        // purchasable: true,
      }

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.payload.ingredientName],
        // purchasable: updatePurchasable(state.ingredients) > 0,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1
        }
      }

    case actionTypes.SET_INGREDIENTS:
      console.log(action);

      return {
        ...state,
        ingredients: action.ingredients
      }

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      }

    default:
      return state
  }
}

export default reducer
