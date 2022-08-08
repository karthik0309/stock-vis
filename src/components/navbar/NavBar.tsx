import React from 'react'
import { Link } from 'react-router-dom'
import classes from './NavBar.module.css'

const NavBar = () => {
  return (
    <div className={classes.nav}>
        <h1 className={classes.nav__title}>
            STOX
        </h1>
        <ul className={classes.nav__items}>
            <Link to="/stocks" className={classes.link}>
                <li>Trade</li>
            </Link>
            <Link to="/" className={classes.link}>
                <li>Dashboard</li>
            </Link>
            <Link to="/" className={classes.link}>
                <li>Developer</li>
            </Link>
            <Link to="/" className={classes.link}>
                <li>Contact us</li>
            </Link>
        </ul>
    </div>
  )
}

export default NavBar