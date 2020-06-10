import React from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout.js'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import { Route, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import { checkLoginStatus } from './store/actions/index'

class App extends React.Component {
  componentDidMount() {
    this.props.onCheckLoginStatus()
  }
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/' exact component={BurgerBuilder} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/auth' component={Auth} />
            <Route path='/orders' component={Orders} />
            <Route path='/logout' component={Logout} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  onCheckLoginStatus: () => dispatch(checkLoginStatus())
})

export default connect(null, mapDispatch)(App);
