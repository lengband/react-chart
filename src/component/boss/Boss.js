import React from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chartuser.redux'
@connect(
  state => state.chatuser,
  { getUserList }
)
class Boss extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount () {
    this.props.getUserList('genius')
    getUserList
  }

  render () {
    const Header = Card.Header
    const Body = Card.Body
    return (
      <WingBlank>
        <WhiteSpace size='lg'/>
        { this.props.userlist.map(v => (
          v.avatar ? (
            <div key={v._id}>
              <Card>
                <Header
                  title={v.user}
                  thumb={require(`../img/${v.avatar}.png`)}
                  extra={<span>{v.title}</span>}
                ></Header>
                <Body>{v.desc.split('\n').map(v => (
                  <div key={v}>{v}</div>
                ))}</Body>
                <WhiteSpace />
              </Card>
              <WhiteSpace />
            </div>
          ) : null
        )) }
      </WingBlank>
    )
  }
}

export default Boss