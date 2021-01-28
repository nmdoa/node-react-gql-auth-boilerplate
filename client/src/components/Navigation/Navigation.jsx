import React from 'react'

import { NavItem } from './NavItem'

import useUser from '../../services/user/use'

import './style.css'

const Navigation = () => {
    const {
        state: { user },
    } = useUser()

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light px-3">
            <div className="container-md">
                <a className="navbar-brand" href="/">
                    Merch Store
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarNavAltMarkup"
                >
                    <div className="navbar-nav">
                        <NavItem to="/Main" className="nav-link">
                            Main
                        </NavItem>
                        <NavItem
                            to="/Secured"
                            className="nav-link"
                            doShow={user ? true : false}
                        >
                            Secured
                        </NavItem>
                        <NavItem
                            to="/Products"
                            className="nav-link"
                            doShow={user ? true : false}
                        >
                            Products
                        </NavItem>
                        <NavItem
                            to="/Users"
                            className="nav-link"
                            doShow={user ? true : false}
                        >
                            Users
                        </NavItem>
                        <NavItem
                            to="/Auth"
                            className="nav-link"
                            doShow={user ? false : true}
                        >
                            Auth
                        </NavItem>
                        <NavItem
                            to="/logout"
                            className="nav-link"
                            doShow={user ? true : false}
                        >
                            Logout ({user && user.email})
                        </NavItem>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
