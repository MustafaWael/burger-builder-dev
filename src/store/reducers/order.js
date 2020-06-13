import * as actionTypes from '../actions/actionTypes'
import * as actions from '../actionsCreator/index'

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return actions.purchase_burger_order_start(state)
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return actions.purchaseBurgerSuccess(state, action)
    case actionTypes.PURCHASE_BURGER_FAIL:
      return actions.purchase_burger_order_fail(state)
    case actionTypes.PURCHASE_INIT:
      return actions.purchaseInit(state)
    case actionTypes.FETCH_ORDERS_START:
      return actions.purchase_burger_order_start(state)
    case actionTypes.FETCH_ORDERS_SUCCSESS:
      return actions.fetchOrderSuccess(state, action)
    case actionTypes.FETCH_ORDERS_FAIL:
      return actions.purchase_burger_order_fail(state)
    default:
      return state
  }
}

export default reducer
