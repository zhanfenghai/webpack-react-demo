
const SET_APPNAME = 'SET_APPNAME';
const ADD_USER = 'ADD_USER';

/**
 * action生成器函数
 * action creator
 * @param {[任意类型]} text [相当于数据]
 */
export function setAppName(text){
  return{
    type:SET_APPNAME,
    text
  }
}
export function addUser(name,age){
  return{
    type:ADD_USER,
    name,
    age
  }
}
