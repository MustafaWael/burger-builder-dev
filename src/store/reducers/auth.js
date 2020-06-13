import * as actions from '../actionsCreator/auth'
const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authPath: '/',
}

const reducer = (state = initialState, action) => {
  return action.type.includes('AUTH_')
    ? actions[action.type](state, action)
    : state
}

export default reducer
