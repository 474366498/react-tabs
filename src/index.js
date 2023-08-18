
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'


import store from './redux/store.js'
// import router from './router/index'
import './styles/index.css'
import './styles/index.scss'
import './styles/index.less'


// import App from './app'
import Layout from './layout/index'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter >
        <Layout />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)

// function APP() {
//   return (
//     <div> APP </div>
//   )
// } 
