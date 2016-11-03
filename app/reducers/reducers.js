// combineReducers 接收一个对象并返回一个函数，当 combineReducers 被调用时，它会去调用每个
// reducer，并把返回的每一块 state 重新组合成一个大 state 对象（也就是 Redux 中的 Store）。
// 长话短说，下面演示一下如何使用多个 reducer 创建一个 Redux 实例：
import {combineReducers} from 'redux'
import appname from './appname'
import users from './users'

const todo = combineReducers({
  appname,
  users
})

export default todo
