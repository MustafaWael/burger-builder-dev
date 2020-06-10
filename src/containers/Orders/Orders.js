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
    // axios.get('/orders.json')
    //   .then(res => {
    //     const orders = []
    //     for (const key in res.data) {
    //       orders.push({
    //         ...res.data[key],
    //         id: key
    //       })
    //     }
    //     this._isMounted && this.setState({ orders, loading: false })
    //   })
    //   .catch(err => {
    //     this._isMounted && this.setState({ loading: err.meesage })
    //   })

    this.props.fetchOrders(this.props.token)
  }

  render() {
    let orders = <Spinner />
    if (!this.props.loading) {
      orders = (
        this.props.orders.length > 0
          ? this.props.orders.map(order =>
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={+order.totalPrice}
            />
          )
          : <p style={{ textAlign: 'center' }}>There is no orders yet!!</p>
      )
    }
    return (
      <div style={{ marginTop: 80 }}>
        {orders}
      </div>
    )
  }
}

const mapState = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token
})

const mapDispatch = dispatch => ({
  fetchOrders: token => dispatch(actions.fetchOrders(token))
})


export default connect(mapState, mapDispatch)(withError(Orders, axios))
