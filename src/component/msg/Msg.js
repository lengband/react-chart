import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

@connect(
  state => state
)
class Msg extends React.Component {
  getLast (arr) {
    return arr[arr.length - 1]
  }
  render () {
    // 按照聊天用户分组，根据 chatid
    const msgGroup = {}
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const userInfo = this.props.chat.users // 获取所有用户信息列表
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return b_last - a_last
    })
    // 根据聊天用户分组，根据chatid
    return (
      <div>
          { chatList.map(v => {
            const lastItem = this.getLast(v)
            const targetid = v[0].from === userid ? v[0].to : v[0].from
            if (!userInfo[targetid]) return null
            const name = userInfo[targetid].name
            const avatar = userInfo[targetid].avatar
            // TODO: 每一条信息的未读消息, 只有 v.to = 当前登录人id 的时候才能显示
            const unredNum = v.filter(v => !v.read && v.to === userid).length
            return (
              <List key={lastItem._id}>
                <Item
                  onClick={() => {
                    this.props.history.push(`/chat/${targetid}`)
                  }}
                  arrow='horizontal'
                  extra={ <Badge text={unredNum}></Badge>  }
                  thumb={ require(`../img/${avatar}.png`) }>
                  { lastItem.content }
                  <Brief>{ name }</Brief>
                </Item>
              </List>
            )
          }) }
      </div>
    )
  }
}

export default Msg