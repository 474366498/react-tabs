import { Fragment } from "react"
import { Navigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useLocation } from "react-router-dom"

const RouteAuth = ({ children }) => {
  const login = useSelector(state => state.user.userInfo),
        {pathname} = useLocation()
  // console.log(5, login,children , pathname)
  if (login && pathname !== '/login') {
    return <Navigate to='/login' />
  }
  return <Fragment>{ children }</Fragment>
} 

export default RouteAuth
