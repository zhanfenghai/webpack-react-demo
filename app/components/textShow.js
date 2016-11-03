import React,{Component} from 'react'
import {connect} from 'react-redux'

class TextShow extends Component{
  render() {
    const {list,onChangeText} = this.props
    return (<div> {list[0].name}
        <input onClick={onChangeText} value="change" type="button"/>
        <a href="www.baidu.com"></a>
      </div>)
  }
}

function select(state) {
  return{
    appname:state.appname,
    users:state.users
  }
}

export default connect(select)(TextShow)
