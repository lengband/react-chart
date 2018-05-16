import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chartuser.redux'
import UserCard from '../../component/usercard/UserCard'

@connect(
  state => state.chatuser,
  { getUserList }
)
class Boss extends React.Component {
  componentDidMount () {
    this.props.getUserList('genius') // 获取牛人列表
  }
  render () {
    return <UserCard userlist={this.props.userlist}></UserCard>
  }
}

export default Boss