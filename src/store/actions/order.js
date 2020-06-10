import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

const purchaseBurgerSuccsess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData
  }
}

const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  }
}

const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const onOrderPurchased = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart())
    axios.post(`/orders.json/?auth=${token}`, orderData)
      .then(res => {
        console.log(orderData);
        console.log(res.data.name);

        dispatch(purchaseBurgerSuccsess(res.data.name, orderData))
      })
      .catch(err => {
        dispatch(purchaseBurgerFail(err))
      })
  }
}


export const fetchOrdersSuccsess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCSESS,
  orders
})

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START
})

export const fetchOrdersFail = () => ({
  type: actionTypes.FETCH_ORDERS_FAIL
})


export const fetchOrders = (token) => {
  return dispatch => {
    dispatch(fetchOrdersStart())
    axios.get(`/orders.json/?auth=${token}`)
      .then(res => {
        const orders = []
        for (const key in res.data) {
          orders.push({
            ...res.data[key],
            id: key
          })
        }
        dispatch(fetchOrdersSuccsess(orders))
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err))
      })
  }
}
