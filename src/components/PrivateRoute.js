import React from "react"
import {Route, Redirect} from "react-router-dom"

const PrivateRoute = ({ component: Component, loggedIn: Sesame, ...rest }) => {
    debugger
    return (
    <Route {...rest} render={(props) => {
    debugger    
    return    (
      Sesame
        ? <Component {...props} />
        : <Redirect to='/login' />  
    )}} />
  )}

export default PrivateRoute