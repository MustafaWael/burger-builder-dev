import * as actions from '../actionsCreator/auth'
const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authPath: '/'
}


const reducer = (state = initialState, action) => {
  // console.log(action);

  // switch (action.type) {
  //   case actionTypes.AUTH_START: return actions.AUTH_START(state)
  //   case actionTypes.AUTH_SUCCESS: return actions.AUTH_SUCCESS(state, action)
  //   case actionTypes.AUTH_FAIL: return actions.AUTH_FAIL(state, action)
  //   default: return state
  // }

  return action.type.includes('AUTH_') ? actions[action.type](state, action) : state
}

export default reducer
