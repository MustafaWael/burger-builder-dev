import React, { Component } from 'react'
import classes from './layout.module.css'
import Aux from '../AuxComponent/Aux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

import { connect } from 'react-redux'
document.querySelector('body').className = classes.bgDark


class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false })
  }

  sideDrawerOpenedHandler = prevState => {
    return this.setState({ showSideDrawer: !prevState.showSideDrawer })
  }

  render() {
    return (
      <Aux>
        <Toolbar
          auth={this.props.auth}
          drawerToggleClicked={this.sideDrawerOpenedHandler}
        />
        <SideDrawer
          auth={this.props.auth}
          open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

const mapState = state => ({
  auth: !state.auth.token
})

export default connect(mapState)(Layout)
