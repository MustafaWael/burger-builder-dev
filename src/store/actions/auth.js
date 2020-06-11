import axios from '../../axios-orders'

import * as actionTypes from './actionTypes'

export const authStart = () => ({
  type: actionTypes.AUTH_START,
})

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId,
})

export const authFail = (err) => ({
  type: actionTypes.AUTH_FAIL,
  error: err,
})

export const authLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('id')
  return { type: actionTypes.AUTH_LOGOUT }
}

const chechAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout())
    }, expirationTime * 1000)
  }
}

export const setAuthPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_PATH,
    authPath: path,
  }
}

export const auth = (email, password, isSignUp) => {
  return async (dispatch) => {
    dispatch(authStart())
    const authData = {
      email,
      password,
      returnSecureToken: true,
    }
    const method = isSignUp ? 'signUp' : 'signInWithPassword'

    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=AIzaSyAQ-KgArDt3z4qISKkcNKx9T46co8_I4uQ`,
        authData
      )
      const { localId, idToken, expiresIn } = res.data
      dispatch(authSuccess(idToken, localId))
      dispatch(chechAuthTimeout(expiresIn))
      localStorage.setItem('token', idToken)
      localStorage.setItem('id', localId)
      localStorage.setItem(
        'expirationDate',
        new Date(new Date().getTime() + expiresIn * 1000)
      )
    } catch (err) {
      if (err.response) dispatch(authFail(err.response.data.error))
    }
  }
}

export const checkLoginStatus = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    const expirationDate = new Date(localStorage.getItem('expirationDate'))

    if (!token) {
      dispatch(authLogout())
    } else {
      if (expirationDate < new Date()) {
        dispatch(authLogout())
      } else {
        dispatch(
          authSuccess(localStorage.getItem('token'), localStorage.getItem('id'))
        )
        dispatch(chechAuthTimeout((expirationDate - new Date()) / 1000))
      }
    }
  }
}
