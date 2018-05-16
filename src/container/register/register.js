import React from 'react'
import Logo from '../../component/logo/logo'
import { Button, List, InputItem, WingBlank, WhiteSpace, Radio, NoticeBar  } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import Wrapper from '../../component/wrapper/Wrapper'

@connect(
  state => state.user,
  { register } // 非异步结果会自动 dispatch
)
@Wrapper
class Register extends React.Component {
  constructor (props) {
    super(props)
    this.register = this.register.bind(this) // 性能比箭头函数好
    this.handleRegister = this.handleRegister.bind(this)
  }
  componentDidMount () {
    this.props.handleChange('type', 'genius') // 默认值
  }
  register () {
    this.props.history.push('./register') // 路由组件(因为塔直接写在路由组件下面)直接可以拿到路由信息
  }
  handleRegister () {
    this.props.register(this.props.state)
  }
  render () {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        <h2>注册页</h2>
        <WingBlank>
          <NoticeBar>
            {this.props.msg}
          </NoticeBar>
          <WhiteSpace />
          <List>
            <InputItem
              onChange={v => this.props.handleChange('user', v)}
            >用户名</InputItem>
            <WhiteSpace />
            <InputItem
              type='password'
              onChange={v => this.props.handleChange('pwd', v)}
            >密码</InputItem>
            <WhiteSpace />
            <InputItem
              type='password'
              onChange={v => this.props.handleChange('repeatpwd', v)}
            >确认密码</InputItem>
            <WhiteSpace />
            <RadioItem
              checked={this.props.state.type === 'genius'}
              onChange={() => this.props.handleChange('type', 'genius')}
              >牛人</RadioItem>
            <RadioItem
              checked={this.props.state.type === 'boss'}
              onChange={() => this.props.handleChange('type', 'boss')}
              >boss</RadioItem>
            <WhiteSpace />
          </List>
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
          <WhiteSpace />
        </WingBlank>
      </div>
    )
  }
}

export default Register