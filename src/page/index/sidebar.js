
import React, { Component, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
// import { useSelector , useDispatch } from 'react-redux';
import { connect, useDispatch } from 'react-redux';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';

import {
  updateTabsKey,
  updateTabsRoutes,
} from '@/redux/tabs'

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type
  }
}


export default function Sidebar() {

  const [collapsed, setCollapsed] = useState(false),
    [selectId, setSelectId] = useState(),
    [openId, setOpenId] = useState([])

  const items = [
    getItem('Option 1', 'one', <PieChartOutlined />),
    { type: 'divider' },
    getItem('Option 2', 'two', <DesktopOutlined />),
    { type: 'divider' },
    getItem('Option 3', 'three', <ContainerOutlined />),
    { type: 'divider' },
    getItem('Navigation One', 'sub1', <MailOutlined />, [
      getItem('Option 5', 'five'),
      getItem('Option 6', 'six'),
      getItem('Option 7', 'seven'),
      getItem('Option 8', 'eight'),
    ]),
    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
      getItem('Option 9', 'nine'),
      getItem('Option 10', 'ten'),
      getItem('Submenu', 'sub3', null, [
        getItem('Option 11', 'eleven'),
        getItem('Option 12', 'twelve', null, [
          getItem('Option 15', 'fifteen'),
          getItem('Option 16', 'sixteen'),
        ])
      ]),
    ]),
  ]

  const navigate = useNavigate(),
    dispatch = useDispatch(),
    location = useLocation()


  useEffect(() => {
    console.log(676, location, items)
    let pathname = location.pathname.replace(/\//g, '')
    setSelectId(pathname)
    return () => {
      console.log('即将卸载')
    }
  })

  useEffect(() => {
    if (!selectId) return
    let find = findTreeItem(items, selectId)
    console.log(75, find)
    if (find) {
      setOpenId(find.parent)
      dispatch(updateTabsKey({ key: selectId, isTabs: find.parent.length > 1 }))
      dispatch(updateTabsRoutes({ key: selectId, keyPath: find.parent || '', label: find.label }))
    }
  }, [selectId])

  const onClickMenu = (e) => {
    console.log(53, e,)
    let { key, keyPath } = e
    dispatch(updateTabsKey({ key, isTabs: keyPath.length > 1 }))
    dispatch(updateTabsRoutes({ key, keyPath, label: e.domEvent.target.innerText }))
    navigate(`${key}?keyPath=${keyPath.length}`)
  },
    onOpenMenu = e => {
      console.log(96, e)
      setOpenId(e)
    },
    onSelectMenu = e => {
      console.log(74, e)
      setSelectId(e.key)
    }

  return <div className='flex flex-dir-c app-sidebar' >
    <Menu
      defaultOpenKeys={openId}
      // openKeys={openId}
      defaultSelectedKeys={selectId}
      selectedKeys={selectId}
      style={{ height: '100%' }}
      mode='inline'
      inlineCollapsed={collapsed}
      items={items}
      onClick={e => onClickMenu(e)}
      onOpenChange={onOpenMenu}
      onSelect={onSelectMenu}
    />
  </div>
}


function findTreeItem(items, key) {
  let f = items.find(item => item.key == key)
  if (f) {
    return f
  } else {
    let _items = treeToArray(items)
    console.log(_items)
    return _items.find(item => item.key == key)
  }
}


function treeToArray(data) {
  let result = data.reduce(function (arr, item) {
    if (!item.key) return arr
    if (item.children && item.children.length > 0) {
      item.children.forEach(c => {
        c.parent = [item.key, c.key]
        if (item.parent) {
          c.parent = item.parent.concat(c.key)
          // c.parent = [...new Set(item.parent.concat(c.parent))]
        }
        // console.log(122, item.key, item, item.parent, c.parent)
      })
      arr.push(item)
      return arr.concat(treeToArray(item.children))
    } else {
      // console.log(124, item)
      return arr.concat(item)
    }
  }, [])
  // console.log(128, result)
  return result
}


/*
function WithRouter(WrapperComponent) {
  return function (props) {
    const navigate = useNavigate(),
      params = useParams(),
      router = { navigate, params },
      location = useLocation()
    return <WrapperComponent {...props} router={router} location={location} params={params} />
  }
}



class Sidebar extends Component {

  constructor(props) {
    super(props)
    const items = [
      getItem('Option 1', 'one', <PieChartOutlined />),
      { type: 'divider' },
      getItem('Option 2', 'two', <DesktopOutlined />),
      { type: 'divider' },
      getItem('Option 3', 'three', <ContainerOutlined />),
      { type: 'divider' },
      getItem('Navigation One', 'sub1', <MailOutlined />, [
        getItem('Option 5', 'five'),
        getItem('Option 6', 'six'),
        getItem('Option 7', 'seven'),
        getItem('Option 8', 'eight'),
      ]),
      getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
        getItem('Option 9', 'nine'),
        getItem('Option 10', 'ten'),
        getItem('Submenu', 'sub3', null, [
          getItem('Option 11', 'eleven'),
          getItem('Option 12', 'twelve')
        ]),
      ]),
    ]
    this.state = {
      items,
      collapsed: false
    }
  }
  onClickMenu(e) {
    console.log(53, e, this.props)
    let { router, updateTabsKey, updateTabsRoutes } = this.props
    let { key, keyPath } = e
    updateTabsKey({ key, isTabs: keyPath.length > 1 })
    updateTabsRoutes({ key, keyPath })
    router.navigate(`${key}?keyPath=${keyPath.length}`)
  }
  render() {
    let { collapsed, items } = this.state
    return <div className='flex flex-dir-c sidebar'>
      <Menu
        style={{ height: '100%' }}
        mode='inline'
        inlineCollapsed={collapsed}
        items={items}
        onClick={e => this.onClickMenu(e)}
      />
    </div>
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  // console.log(97, dispatch)
  return {
    updateTabsKey: (value) => {
      // console.log(103, value)
      return dispatch({ type: 'updateTabsKey', value })
    },
    updateTabsRoutes: value => (dispatch({ type: 'updateTabsRoutes', value }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithRouter(Sidebar))
*/
