
import { useEffect , useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useWatcher  } from 'alova' 
import { MenuApi } from '@/api/menu'

import Header from './header'
import Sidebar from './sidebar'
import Content from './content'
import Footer from './footer'
import './index.scss'

import {useAppDispatch} from '@/redux/store'
import {getMovieData , fetchUserById } from '@/redux/tabs'

console.log(16,getMovieData , fetchUserById , useAppDispatch)

export default function Index(params) {
  const dispatch = useAppDispatch()
  const [key , setKey] = useState('');
  // Menu.base().then(res => {
  //   console.log(17,res)
  // }).catch(err => {
  //   console.log(19,err)
  // })
  
  const { loading, onSuccess, onError } = useWatcher(() => {

    return MenuApi[key] && MenuApi[key]()
  }, [key])
      onSuccess(res => {
        console.log(51, res.data) 
      })
      onError(err => {
        console.log(53,headerMenu,err)
      })
 
  useEffect(() => {
    if (!key) {
      dispatch(getMovieData(123))
      dispatch(fetchUserById(123))
      // .then(res => {
      //   console.log(41,res)
      // }).catch(error => {
      //   console.log(43,error)
      // })
      // setKey('base')
    }
  }, [key])
  
  return <div className='flex flex-dir-c app-index'>
    {loading ? 'loading' : null}
    <Header /> 
    <div className='flex flex-jc-sb flex-1'>
      <Sidebar /> 
      <Content /> 
    </div>
    <Footer />
  </div>
}