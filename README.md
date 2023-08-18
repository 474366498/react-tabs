# react-tabs-router
react tabs router auth

webpack react react-router react-redux redux  
就是为了单纯的做一个react-tabs 式的页面  
路由(sidebar) 进行的嵌套路由  路由中如果是子菜单则通过 antd tabs + router outlet 进行tabs式显示 如果是单独菜单(前三个)或home 则是通过 router outlet 进行展示 
内容(content) 对 tabs 进行切换 移除操作 redux tabs 中进行 tabsKey tabsRoutes 进行更新 移除 处理
权限(layout) 对登录状态作出处理  无后台 只进行了简单的boolean 判断


