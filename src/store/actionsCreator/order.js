import { updateState } from '../reducers/utils'

export const purchase_burger_order_start = state => updateState(state, { loading: true })

export const purchaseBurgerSuccess = (state, action) => {
  return updateState(state, {
    orders: state.orders.concat(updateState(action.orderData, { id: action.orderId })),
    loading: false,
    purchased: true
  })
}

export const purchaseInit = state => updateState(state, { purchased: false })

export const fetchOrderSuccess = (state, action) => updateState(state, { orders: action.orders, loading: false })

export const purchase_burger_order_fail = state => updateState(state, { loading: false })
