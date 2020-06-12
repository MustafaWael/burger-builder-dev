import React from 'react'
import classes from './SideDrawer.module.css'
import Aux from '../../../hoc/AuxComponent/Aux'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../Ui/Backdrop/Backfrop'

const sideDrawer = (props) => {
  const attachedClasses = [
    classes.SideDrawer,
    props.open ? classes.Open : classes.Close,
  ].join(' ')

  return (
    <Aux>
      <Backdrop show={props.open} click={props.closed} />
      <div className={attachedClasses}>
        <Logo height="11%" />
        <nav>
          <NavigationItems auth={props.auth} closeDrawer={props.closed} />
        </nav>
      </div>
    </Aux>
  )
}

export default sideDrawer
