import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies' // 操作 cookie
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  { logoutSubmit }
)
class User extends React.Component {
  constructor (props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout () {
    const alert = Modal.alert
    alert('注销', '确认退出登录吗？', [
      { text: '取消', onPress: () => {} },
      { text: '确认', onPress: () => {
        browserCookie.erase('userid') // 清空 cookie
        this.props.logoutSubmit()
      } },
    ])
  }
  render () {
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief
    if (!props.user) {
      if (props.redirectTo) {
        return <Redirect to={props.redirectTo}></Redirect>
      }
      return null
    }
    return (
      <div>
        <Result
          img={<img src={require(`../img/${props.avatar}.png`)} style={{width: 50}} alt='' />}
          title={this.props.user}
          message={props.type === 'boss' ? props.company : null}/>
          <List renderHeader={() => '简介'}>
            <Item multipleLine>
              {props.title}
              {props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
              {props.money ? <Brief>薪资: {props.money}</Brief> : null}
            </Item>
          </List>
          <WhiteSpace size="lg"></WhiteSpace>
          <List>
            <Item onClick={this.logout}>退出登录</Item>
          </List>
      </div>
    )
  }
}

export default User