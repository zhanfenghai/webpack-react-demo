//var React = require('react');
import React,{Component} from 'react';
import style from 'css/product';
import imgsrc from 'css/images/applyfund-fail.png';
import { createStore,combineReducers } from 'redux'
import todo from '../reducers/reducers'
import {setAppName,addUser} from '../actions/actions.js'
import {connect} from 'react-redux'
import TextShow from './textShow'
import {Link} from 'react-router'
import remarkable from 'remarkable'
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

const HorizontalLoginForm = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      alert(values)
      console.log('Received values of form: ', values);
    });
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">Log in</Button>
        </FormItem>
      </Form>
    );
  },
}));

// function counter(state = initState, action) {
//   switch (action.type) {
//   case 'INCREMENT':
//     return state + 1;
//   case 'DECREMENT':
//     return state - 1;
//   default:
//     return state;
//   }
// }




/**
 * 通过createClass来定义一个组件
 * @type {[type]}
 */
// let ProductBox = React.createClass({
//   render: function () {
//     store.dispatch({type:'INCREMENT'})
//     return (
//       <div className="productBox">
//         <img src={imgsrc}/>
//         Hello World!{store.getState()}
//       </div>
//     );
//   }
// });

class ProductBox extends Component{
  constructor(props) {
    super(props)
    this.state = {          //在构造函数中初始化state es6+语法
      value: "false"
    }
    //显示绑定this到实例this.handleChange = this.handleChange.bind(this)
  }
  static defaultProps = {       //给当前组件设置默认props，即this.props.testValue
    testValue:'nothing'
  }
  static propTypes = {
    testValue: React.PropTypes.string
  }
  handleChange = (e) => {
    console.log(e.type)
    this.setState({
        value: e.target.value
      })
  }
  render() {
    const {dispatch,appname,users} = this.props
    const md = new remarkable()
    return (
      <div className="productBox">
        <div className="example-input">
          <Input size="large" placeholder="large size" />
          <Input placeholder="default size" />
          <Input size="small" placeholder="small size" />
        </div>
        <HorizontalLoginForm/>
        <Link to='/'>tiaozhuan</Link>
        <img src={imgsrc} />
        <input onClick = {()=>dispatch(setAppName('something'))} value="click" type='button'/>
        Hello World!{appname.toString()}         {/*不能渲染一个对象*/}
        <TextShow url='api/zhan' list={users} onChangeText = {()=>dispatch(addUser('xiaosan',12))}/>
        <input value={this.state.value} onChange={this.handleChange}/> {/*在使用es6语法的时候，class中定义的方法不会自动绑定this到实例上，须显示的bind到this或使用箭头函数或者在构造函数中显示的绑定*/}
      </div>
    );
  }
} ;

/**
 * [select description]
 * @param  {[type]} state [全局store的state]
 * @return {[type]}       [返回一个对象注入组件中，当前组件为ProductBox]
 * 在组件中可以使用this.props来访问相应的值，etc：this.props.appname
 */
function select(state) {
  return{
    appname:state.appname,
    users:state.users
  }
}

export default connect(select)(ProductBox)//connect方法默认会将dispatch方法传递给props
