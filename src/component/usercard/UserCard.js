import React from 'react'
import PropTypes from 'prop-types'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends React.Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }
  handlerClick (v) {
    this.props.history.push(`/chat/${v._id}`)
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
              <Card onClick={() => this.handlerClick(v)}>
                <Header
                  title={v.user}
                  thumb={require(`../img/${v.avatar}.png`)}
                  extra={<span>{v.title}</span>}
                ></Header>
                <Body>
                  {v.type === 'boss' ? <div>公司: {v.company}</div> : null}
                  {v.desc.split('\n').map(v => (
                    <div key={v}>{v}</div>
                  ))}
                </Body>
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

export default UserCard