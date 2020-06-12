import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import Spinner from '../../components/Ui/Spinner/Spinner'
import axios from '../../axios-orders'
import withError from '../../hoc/withErrorHandler/withErrorHandler'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

class Orders extends Component {
  componentDidMount = () => {
    this._isMounted = true
    this.setState({ active: true })
    this.props.fetchOrders(this.props.token, this.props.userId)
  }

  render() {
    let orders = <Spinner />
    if (!this.props.loading) {
      orders =
        this.props.orders.length > 0 ? (
          this.props.orders.map((order) => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={+order.totalPrice}
            />
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>There is no orders yet!!</p>
        )
    }
    return <div style={{ marginTop: 80 }}>{orders}</div>
  }
}

const mapState = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
})

const mapDispatch = (dispatch) => ({
  fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
})

export default connect(mapState, mapDispatch)(withError(Orders, axios))
