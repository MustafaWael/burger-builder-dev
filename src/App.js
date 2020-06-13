import React, { Suspense } from 'react'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
// import Logout from './containers/Auth/Logout/Logout'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { checkLoginStatus } from './store/actions/index'

class App extends React.Component {
  componentDidMount() {
    this.props.onCheckLoginStatus()
  }

  render() {
    const AsyncAuth = React.lazy(() => import('./containers/Auth/Auth'))
    const AsyncOrders = React.lazy(() => import('./containers/Orders/Orders'))
    const AsyncCheckout = React.lazy(() =>
      import('./containers/Checkout/Checkout')
    )
    const AsyncLogout = React.lazy(() =>
      import('./containers/Auth/Logout/Logout')
    )

    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route
          path="/auth"
          render={() => (
            <Suspense fallback={<div>Loading...</div>}>
              <AsyncAuth />
            </Suspense>
          )}
        />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route
            path="/checkout"
            render={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <AsyncCheckout />
              </Suspense>
            )}
          />
          <Route
            path="/orders"
            render={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <AsyncOrders />
              </Suspense>
            )}
          />
          <Route
            path="/logout"
            render={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <AsyncLogout />
              </Suspense>
            )}
          />
          <Route
            path="/auth"
            render={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <AsyncAuth />
              </Suspense>
            )}
          />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    )
  }
}

const mapState = (state) => ({
  isAuthenticated: state.auth.token,
})

const mapDispatch = (dispatch) => ({
  onCheckLoginStatus: () => dispatch(checkLoginStatus()),
})

export default connect(mapState, mapDispatch)(App)
