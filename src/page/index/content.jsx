
import React , { useMemo , useState} from 'react'

import { Outlet, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { Tabs } from "antd";

import { updateTabsKey , tabsRoutesRemove} from '@/redux/tabs'


export default function Content() {
  
  const navigate = useNavigate(),
        dispatch = useDispatch()

  const isTabs = useSelector(state => state.tabs.isTabs),
    tabsKey = useSelector(state => state.tabs.tabsKey),
        tabsRoutes = useSelector(state => state.tabs.tabsRoutes)
  const tabsList = new Array(50).fill(null).map((_, i) => {
          const id = String(i);
          return {
            label: `Tab-${id}`,
            key: id,
            disabled: i === 28,
            children: `Content of tab ${id}`,
          };
        })
  const onTabsChange = (e) => {
    console.log(19, e)
    dispatch(updateTabsKey({key:e,isTabs}))
    navigate(e)
  },
    onTabsEdit = (event,action) => {
      console.log(28, event,tabsKey ,  action)
      if (action == 'remove') {
        if (event !== tabsKey) {
          dispatch(tabsRoutesRemove(event))
        } else {
          
          let index = tabsRoutes.findIndex(tab => tab.key == event) 
          let key = index ? tabsRoutes[index - 1].key : tabsRoutes[1].key
          console.log(key) 
          dispatch(updateTabsKey({ key, isTabs }))
          dispatch(tabsRoutesRemove(event))
          navigate(event)
        }
      }
  }
  return <div className="flex flex-dir-c flex-1 app-content" >
    <div className='tabs-info' style={{color:'blue'}}>是否是tabs路由 : {isTabs ? 'True':'False' } tabs路由关键字(key){tabsKey} ~ tabs路由数量：{tabsRoutes.length}  </div>
    {
      isTabs
        ? <>
          <Tabs
            type='editable-card'
            items={tabsRoutes}
            activeKey={tabsKey}
            onChange={onTabsChange}
            onEdit={onTabsEdit}
            hideAdd={true}
          >
          </Tabs>
          <div className='flex flex-dir-c flex-1 tabs-view'>
            <Outlet /> 
          </div>
        </> 
        : <div className='flex flex-dir-c flex-1 view'> {tabsKey} <Outlet />  </div>
    }
    
  </div>
}

