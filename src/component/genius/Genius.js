import React from 'react'
import { connect } from 'react-redux'
import UserCard from '../../component/usercard/UserCard'
import { getUserList } from '../../redux/chartuser.redux'

@connect(
  state => state.chatuser,
  { getUserList }
)
class Genius extends React.Component {
  componentDidMount () {
    this.props.getUserList('boss')
  }
  render () {
    return (
      <UserCard userlist={this.props.userlist}></UserCard>
    )
  }
}

export default Genius