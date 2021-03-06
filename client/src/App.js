import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ClientContext } from 'graphql-hooks'

import GQLClient from './services/GQLNetworkClient'

import PrivateRoute from './components/PrivateRoute/PrivateRoute'

import AuthPage from './pages/Auth'
import MainPage from './pages/Main'
import SecuredPage from './pages/Secured'
import UsersPage from './pages/Users'
import LogoutPage from './pages/Logout'
import ProductsPage from './pages/Products'

import Navbar from './components/Navigation/Navigation'
import './App.css'

import UserProvider from './services/user/provider'

function App() {
    return (
        <BrowserRouter>
            <ClientContext.Provider value={GQLClient}>
                <UserProvider>
                    <React.Fragment>
                        <Navbar />
                        <div className="container-sm">
                            <Switch>
                                <Route path="/" component={MainPage} exact />
                                <Route path="/auth" component={AuthPage} />
                                <Route path="/Main" component={MainPage} />
                                <Route
                                    path="/secured"
                                    component={SecuredPage}
                                />
                                <PrivateRoute
                                    path="/products"
                                    component={ProductsPage}
                                />
                                {/* <Route path="/users" component={UsersPage} /> */}
                                <PrivateRoute
                                    path="/users"
                                    component={UsersPage}
                                />
                                <PrivateRoute
                                    path="/logout"
                                    component={LogoutPage}
                                />
                            </Switch>
                        </div>
                    </React.Fragment>
                </UserProvider>
            </ClientContext.Provider>
        </BrowserRouter>
    )
}

export default App
