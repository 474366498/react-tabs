
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import Header from './header'
import Sidebar from './sidebar'
import Content from './content'
import Footer from './footer'
import './index.scss'
export default function Index(params) {
  return <div className='flex flex-dir-c app-index'>
    <Header /> 
    <div className='flex flex-jc-sb flex-1'>
      <Sidebar /> 
      <Content /> 
    </div>
    <Footer />
  </div>
}