import { Link, useNavigate } from "react-router-dom";


import {updateTabsKey} from '@/redux/tabs'
import { useDispatch } from "react-redux";


export default function PageError() {
  const navigate = useNavigate() ,
        dispatch = useDispatch() 
  const goHome = () => {
    dispatch(updateTabsKey({}))
    navigate('home')
  }
  return <div>
    page ~ error
    <p> 这是默认的错误页面 </p>
    <a style={{cursor:'pointer'}} onClick={ goHome}> 回到 home</a>
  </div>
} 