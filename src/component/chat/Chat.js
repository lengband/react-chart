import React from 'react'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMegList, sendMsg, recvMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'

@connect(
  state => state,
  { getMegList, sendMsg, recvMsg }
)
class Chat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }
  componentDidMount () {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMegList()
      this.props.recvMsg()
    }
  }
  handleSubmit () {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({ text: '' })
  }
  render () {
    const Item = List.Item
    console.log(this.props, 'pp')
    const userid = this.props.match.params.user // 获取当前聊天 userId ??? 为什么 params.user 能获取id
    const users = this.props.chat.users // 获取当前 user
    if (!users[userid]) {
      return null
    }
    const chatid = getChatId(userid, this.props.user._id) // 聊天ID，当前用户ID
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid)
    return (
      <div id='chat-page'>
        <NavBar
        mode='dark'
        icon={ <Icon type='left' />  }
        onLeftClick={() => {
          this.props.history.goBack()
        }}>
          { users[userid].name }
        </NavBar>

        {chatmsgs.map((v, i) => {
          const avatar = require(`../img/${users[v.from].avatar}.png`)
          console.log(avatar);
          return v.from === userid ? (
            <List key={v._id}>
              <Item
                thumb={avatar}>{v.content}</Item>
            </List>
          ) : (
            <List key={v._id}>
              <Item
                extra={<img src={avatar} alt='' />}
                className='chat-me'>{v.content}</Item>
            </List>
          )
        })}
        <div className="stick-footer">
          <List>
          <InputItem
            placeholder='请输入'
            value={this.state.text}
            onChange={v => this.setState({text: v})}
            extra={<span onClick={() => this.handleSubmit()}>发送</span>}
          >信息</InputItem>
          </List>
        </div>
        {/* <h2>chat with user: {this.props.match.params.user}</h2> */}
      </div>
    )
  }
}
export default Chat