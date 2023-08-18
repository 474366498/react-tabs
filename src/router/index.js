

import { lazy, Suspense } from 'react'


import Layout from "../layout";
import Login from "@p/login";
import Index from '@p/index'
import Home from '@p/home'

function lazyLoad(C) {
  // console.log(12, C, New)
  return <Suspense> <C /> </Suspense>
}

const router = [

  {
    path: '/',
    // element: lazyLoad(lazy(() => import('../layout'))),
    children: [
      {
        path: '/login',
        element: lazyLoad(lazy(() => import('../page/login')))
      },
      {
        path: '/',
        element: lazyLoad(lazy(() => import('../page/index'))),
        children: [
          { path: '', element: lazyLoad(lazy(() => import('../page/home'))) },
          { path: 'home', element: lazyLoad(() => <Home />) },
          { path: 'one', element: lazyLoad(lazy(() => import('../page/num/one'))) },
          { path: 'two', element: lazyLoad(lazy(() => import('../page/num/two'))) },
          { path: 'three', element: lazyLoad(lazy(() => import('../page/num/three'))) },
          { path: 'five', element: lazyLoad(lazy(() => import('../page/num/five'))) },
          { path: 'six', element: lazyLoad(lazy(() => import('../page/num/six'))) },
          { path: 'seven', element: lazyLoad(lazy(() => import('../page/num/seven'))) },
          { path: 'eight', element: lazyLoad(lazy(() => import('../page/num/eight'))) },
          { path: 'nine', element: lazyLoad(lazy(() => import('../page/num/nine'))) },
          { path: 'ten', element: lazyLoad(lazy(() => import('../page/num/ten'))) },
          { path: 'eleven', element: lazyLoad(lazy(() => import('../page/num/eleven'))) },
          { path: '*', element: lazyLoad(lazy(() => import('../page/error/index'))) },
        ]
      }
    ]
  }
]

export default router
