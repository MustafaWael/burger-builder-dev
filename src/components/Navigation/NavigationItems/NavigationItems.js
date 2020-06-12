import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" closeDrawer={props.closeDrawer}>
      Burger Builder
    </NavigationItem>
    {!props.auth ? (
      <NavigationItem link="/orders" closeDrawer={props.closeDrawer}>
        Orders
      </NavigationItem>
    ) : null}
    {props.auth ? (
      <NavigationItem link="/auth" closeDrawer={props.closeDrawer}>
        Authenticate
      </NavigationItem>
    ) : (
      <NavigationItem link="/logout" closeDrawer={props.closeDrawer}>
        Logout
      </NavigationItem>
    )}
  </ul>
)

export default navigationItems
