import React, { Component } from 'react'
import classes from './Modal.module.css'
import Aux from '../../../hoc/AuxComponent/Aux'
import Backdrop from '../Backdrop/Backfrop'

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.show !== nextProps.show || this.props.children
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} click={() => this.props.modalClosed('cancel')} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? 1 : 0,
            pointerEvents: this.props.show ? 'auto' : 'none'
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    )
  }
}

export default Modal
