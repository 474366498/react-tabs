

import { Navigate , useRoutes } from 'react-router'
import { useSelector } from 'react-redux'
import { Outlet, Routes , Route} from 'react-router-dom'
import Login from '../page/login'
import Index from '../page/index'
import RouteAuth from './auth'
import router  from '../router'

export default function Layout() {
  const Elements = useRoutes(router) 
  // console.log(13, Elements) 

  return (<>
    <RouteAuth>{Elements}</RouteAuth>
  </>)
}
