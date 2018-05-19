import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/Authroute'
import BossInfo from './container/bossInfo/BossInfo'
import GeniusInfo from './container/geniusinfo/GeniusInfo'
import Dashboard from './component/dashboard/Dashboard'
import Chat from './component/chat/Chat'

import reducers from './reducer'
import './config'
import './index.css'

// const store = createStore(reducers, compose( // 有兼容性问题
//   applyMiddleware(thunk),
//   window.devToolsExtension ? window.devToolsExtension() : function () {}
// ))
let store;
if(!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)){ // 没有redux插件
    store = createStore(
      reducers,
        applyMiddleware(thunk)
    );
}else{ //插件调试，未安装会报错
    store = createStore(
      reducers,
        compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    );
}

// boss genius ms msg
ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Switch>  {/* 在react-route4 里面，表示命中一个路由就跳转，route不写path就是没有命中路由的时候选中 */}
          <Route path="/bossinfo" component={BossInfo}></Route>
          <Route path="/geniusinfo" component={GeniusInfo}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/chat/:user" component={Chat}></Route>
          <Route component={Dashboard}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)
