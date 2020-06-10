import React, { Component } from 'react'
import Aux from '../../../hoc/AuxComponent/Aux'
import Button from '../../Ui/Button/Button'

class OrderSummery extends Component {
  // componentDidUpdate() {
  //   console.log('OrderSummery Updated!!');

  // }

  render() {
    const ingredientSummery = Object.keys(this.props.ingredients)
      .map(id => {
        return (
          <li key={id}>
            <span style={{ textTransform: 'capitalize' }}>{id}</span>: {this.props.ingredients[id]}
          </li>
        )
      });

    return (
      <Aux>
        <h3>Your order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummery}
        </ul>
        <p><strong>Total price: {this.props.totalPrice.toFixed(2)}$</strong></p>
        <p>Continue to checkout?</p>
        <Button
          btnType='Danger'
          clicked={() => this.props.cancelled('cancel')}
        >
          CANCEL
        </Button>


        <Button
          btnType='Success'
          clicked={() => this.props.continued()}
        >
          CONTINUE
        </Button>

      </Aux>
    )
  }
}

export default OrderSummery
