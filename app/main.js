// var ReactDOM = require('react-dom');
// var React = require('react');
// var AppComponent = require('./components/productBox');
import AppComponent from './components/productBox';
import { render }from 'react-dom';
import React, {Component} from 'react';//必须引用React在使用Component的时候
import {Router, Link, Route, browserHistory} from 'react-router';
import {Provider} from 'react-redux'//Provider用来将redux绑定到react上
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import todo from './reducers/reducers'//reducers,对捕捉到的action进行处理

const initState = {
    users:[
      {name:'zhan',age:19},
      {name:'cao',age:21}
    ]
}

const loggerMiddleware = createLogger()

/**
 * 可以写成嵌套路由的方式，那么绘制出来的App就像是一个盒子套着一个盒子，外层的都可以作为容器使用
 * 当某个路由有子路由时，记得在组件中使用{this.props.children}
 */
let store = createStore(todo,initState,
  applyMiddleware(
      thunkMiddleware, // 允许我们 dispatch() 函数
      loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
    ))
store.subscribe(()=>console.log(store.getState()))
class Root extends Component {
  render(){
    return (
      <Router history={browserHistory}>
        <Route path="/" component={AppComponent} />
      </Router>
    );
  }
}
/**
 * redux结合react-router
 * 把Provider和路由结合起来一起使用
 * 必须引用两个模块react & react-dom
 * render方法属于react-dom模块
 * createElement方法属于react模块
 */
render(<Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={AppComponent} />
  </Router>
</Provider>, document.getElementById('content'));
