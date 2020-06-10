import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import * as actions from '../../../store/actions/auth'
import { connect } from 'react-redux'

class Logout extends Component {
  componentDidMount() {
    this.props.logout()
  }

  render() {
    return <Redirect to='/' />
  }
}

const mapDispatch = dispatch => ({
  logout: () => dispatch(actions.authLogout())
})

export default connect(null, mapDispatch)(Logout)
