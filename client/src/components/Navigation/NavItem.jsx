import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavItem = ({doShow = true, children, ...rest}) => {
    return (
        doShow?<NavLink {...rest}>
            {children}
        </NavLink>:null
    )
}