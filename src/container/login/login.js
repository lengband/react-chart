import React from 'react'
import { Button, List, InputItem, WingBlank, WhiteSpace  } from 'antd-mobile'
import Logo from '../../component/logo/logo'
class Login extends React.Component {
  constructor (props) {
    super(props)
    this.register = this.register.bind(this) // 性能比箭头函数好
  }
  register () {
    console.log(this.props, 'register')
    this.props.history.push('./register') // 路由组件(因为塔直接写在路由组件下面)直接可以拿到路由信息
  }
  handleChange (key, val) {
    this.setState({
      [key]: val
    })
  }
  render () {
    return (
      <div>
        <Logo></Logo>
        <h2>登录页</h2>
        <WingBlank>
          <List>
            <InputItem
              onChange={v => this.handleChange('user', v)}
            >用户</InputItem>
            <InputItem
              onChange={v => this.handleChange('user', v)}
              type="password"              
            >密码</InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary">登录</Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.register}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login