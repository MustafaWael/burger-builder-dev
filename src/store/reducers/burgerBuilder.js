import * as actions from '../actionsCreator/burgerBuilder'

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: null,
  building: false,
}

const reducer = (state = initialState, action) => {
  actions.initState(state)
  return action.type.includes('_INGREDIENT')
    ? actions[action.type](state, action)
    : state
}

export default reducer
