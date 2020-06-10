import { updateState } from '../reducers/utils'

export const AUTH_START = state => updateState(state, { error: null, loading: true })
export const AUTH_SUCCESS = (state, action) => updateState(state, { token: action.token, userId: action.userId, loading: false, error: null })
export const AUTH_FAIL = (state, action) => updateState(state, { error: action.error, loading: false })
export const AUTH_LOGOUT = state => updateState(state, { token: null, userId: null })
export const SET_AUTH_PATH = (state, action) => updateState(state, { authPath: action.authPath })
