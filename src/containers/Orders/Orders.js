import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import Spinner from '../../components/Ui/Spinner/Spinner'
import axios from '../../axios-orders'
import withError from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
  _isMounted = false
  state = {
    orders: [],
    loading: true,
    active: false,
  }

  componentDidMount = () => {
    this._isMounted = true
    this.setState({ active: true })
    axios.get('/orders.json')
      .then(res => {
        const orders = []
        for (const key in res.data) {
          orders.push({
            ...res.data[key],
            id: key
          })
        }
        this._isMounted && this.setState({ orders, loading: false })
      })
      .catch(err => {
        this._isMounted && this.setState({ loading: err.meesage })
      })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    let orders = <Spinner />
    if (!this.state.loading) {
      orders = (
        this.state.active
          ? this.state.orders.length > 0
            ? this.state.orders.map(order =>
              <Order
                key={order.id}
                ingredients={order.ingredients}
                price={+order.totalPrice}
              />
            )
            : <p style={{ textAlign: 'center' }}>There is no orders yet!!</p>
          : null
      )
    }
    return (
      <div style={{ marginTop: 80 }}>
        {
          orders
        }
      </div>
    )
  }
}

export default withError(Orders, axios)
