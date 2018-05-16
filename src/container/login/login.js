import React from 'react'
import { Button, List, InputItem, WingBlank, WhiteSpace, NoticeBar  } from 'antd-mobile'
import Logo from '../../component/logo/logo'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import Wrapper from '../../component/wrapper/Wrapper'

@connect(
  state => state.user,
  { login }
)
@Wrapper
class Login extends React.Component {
  constructor (props) {
    super(props)
    this.register = this.register.bind(this) // 性能比箭头函数好
    this.handleLogin = this.handleLogin.bind(this)
  }
  register () {
    this.props.history.push('./register') // 路由组件(因为塔直接写在路由组件下面)直接可以拿到路由信息
  }
  handleLogin () {
    this.props.login(this.props.state)
  }
  render () {
    return (
      <div>
        {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        <NoticeBar>
          {this.props.msg}
        </NoticeBar>
        <WhiteSpace />
        <WingBlank>
          <List>
            <InputItem
              onChange={v => this.props.handleChange('user', v)}
            >用户</InputItem>
            <InputItem
              onChange={v => this.props.handleChange('pwd', v)}
              type="password"              
            >密码</InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleLogin}>登录</Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.register}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login