import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMegList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'

@connect(
  state => state,
  { getMegList, sendMsg, recvMsg, readMsg }
)
class Chat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      msg: [],
      showEmoji: false
    }
  }
  componentDidMount () {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMegList()
      this.props.recvMsg()
    }
    // this.fixCarousel()
  }
  componentWillUnmount () { // 退出或者隐藏当前路由会走这个hook
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }
  fixCarousel () {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }
  handleSubmit () {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({
      text: ''
    })
  }
  render () {
    const emoji = '😄 😃 😀 😊 😉 😍 😘 😚 😗 😙 😜 😝 😛 😳 😁 😔 😌 😒 😞 😣 😢 😂 😭 😪 😥 😰 😅 😓 😩 😫 😨 😱 😠 😡 😤 😖 😆 😋 😷 😎 😴 😵 😲 😟 😦 😧 😈 👿 😮 😬 😐 😕 😯 😶 😇 😏 😑 👲 👮 👷 💂 👶 👦 👧 👨 👩 👴 👵 👱 👼 👸 😺 😸 😻 😽 😼 🙀 😿 😹 😾 👹 👺 🙈 🙉 🙊 💀 👽 💩 🔥 ✨ 🌟 💫 💥 💢 💦 💧 💤 💨 👂 👀 👃 👅 👄 👍 👎 👌 👊 ✊ ✌ 👋 ✋ 👐 👆 👇 👉 👈 🙌 🙏 ☝ 👏 💪 🚶 🏃 💃 👫 👪 👬 👭 💏 💑 👯 🙆 🙅 💁 🙋 💆 💇 💅 👰 🙎 🙍 🙇 🎩 👑 👒 👟 👞 👡 👠 👢 👕 👔 👚 👗 🎽 👖 👘 👙 💼 👜 👝 👛 👓 🎀 🌂 💄 💛 💙 💜 💚 ❤ 💔 💗 💓 💕 💖 💞 💘 💌'
                  .split(' ').filter(v => v).map(v => ({ text: v }))
    const Item = List.Item
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
              extra={
                <div>
                  <span
                    aria-label=''
                    role='img'
                    onClick={() => {
                      this.setState({
                        showEmoji: !this.state.showEmoji
                      })
                      this.fixCarousel()
                    }}
                    style={{ marginRight: 10 }} >😄</span>
                  <span onClick={() => this.handleSubmit()}>发送</span>
                </div>
              }
            >信息</InputItem>
          </List>
          
          {this.state.showEmoji ? (<Grid
                    onClick={(e) => {
                      this.setState({
                        text: this.state.text + e.text
                      })
                    }}
                    isCarousel={true}
                    columnNum={9}
                    carouselMaxRow={4}
                    data={emoji}  />) : null}
        </div>
      </div>
    )
  }
}
export default Chat