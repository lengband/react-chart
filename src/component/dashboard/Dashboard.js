import React from 'react'
import { TabBar, NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import NavLinkBar from '../navlinkbar/NavLinkBar'
import { Route, Switch } from 'react-router-dom'
import Boss from '../../component/boss/Boss'

const Genius = () => <h2>Genius首页</h2>
const Msg = () => <h2>Msg首页</h2>
const User = () => <h2>User首页</h2>

@connect(
  state => state
)
class Dashboard extends React.Component {
  render () {
    const { pathname } = this.props.location
    const user = this.props.user
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'boss列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    let navItem = navList.find(v => v.path === pathname) || {}
    return (
      <div>
        <NavBar mode='dard' className='fixd-header'>{navItem.title}</NavBar>
        <div style={{marginTop: 45}}>
          <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>
        {/* <Route path='/boss' component={} />
        <Route path='/boss' component={} /> */}
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default Dashboard