
#### Support for the experimental syntax ‘jsx‘ isn‘t currently enabled

>> 根目录下创建 .babelrc.js 
``` javascript 

  module.exports = function (api) {
    return {
      "presets": [
        "@babel/preset-env",
        [
          "@babel/preset-react",
          { "runtime": "automatic" }
        ],
        "@babel/preset-typescript"
      ],
      //  生产环境不使用react-refresh/babel
      "plugins": api.env("production")
        ? ["@babel/plugin-transform-runtime"]
        : [
          "@babel/plugin-transform-runtime",
          "react-refresh/babel"
        ]
    }
  }


```

#### Loading PostCSS "postcss-preset-env" plugin failed: Cannot find module 'postcss-preset-env'
>> webpack.config 文件中...

#### ReferenceError: $RefreshSig$ is not defined ### 

>> 1. npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh cross-env
>> 2. webpack.dev.js
  ``` javascript 
  const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

  module.exports = {
    ...,
    mode: 'development',
    plugins: [
      new ReactRefreshWebpackPlugin()
    ]
  }

  ```