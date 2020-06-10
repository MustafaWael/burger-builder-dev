import * as actions from '../actionsCreator/burgerBuilder'

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: null,
  building: false
}

const reducer = (state = initialState, action) => {
  actions.initState(state)
  // switch (action.type) {
  //   case actionTypes.ADD_INGREDIENT: return actions.ADD_INGREDIENT(state, action)
  //   case actionTypes.REMOVE_INGREDIENT: return actions.REMOVE_INGREDIENT(state, action)
  //   case actionTypes.SET_INGREDIENTS: return actions.SET_INGREDIENTS(state, action)
  //   case actionTypes.FETCH_INGREDIENTS_FAILED: return actions.FETCH_INGREDIENTS_FAILED(state, action)
  //   default: return state
  // }

  return action.type.includes('_INGREDIENT') ? actions[action.type](state, action) : state
}

export default reducer
