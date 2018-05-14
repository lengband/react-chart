import React from 'react'
import { NavBar, InputItem, WhiteSpace, TextareaItem, Button } from 'antd-mobile'
import AvatarSelecter from './../../component/avatar-select/avatar-select'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  { update }
)
class BossInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      desc: '',
      company: '',
      money: ''
    }
  }
  onChange (key, val) {
    this.setState({
      [key]: val
    })
  }
  selectAvatar (imgName) {
    this.setState({
      avatar: imgName
    })
  }
  render () {
    const path = this.props.location.pathname.replace('/', '')
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && path !== redirect ? <Redirect to={this.props.redirectTo} /> : null}
        <NavBar mode="dark">Boss完善信息页面</NavBar>
        <AvatarSelecter selectAvatar={imgName => this.selectAvatar(imgName)}></AvatarSelecter>
        <WhiteSpace />
        <InputItem onChange={v => this.onChange('title', v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={v => this.onChange('company', v)}>
          公司名称
        </InputItem>
        <InputItem onChange={v => this.onChange('money', v)}>
          职位薪资
        </InputItem>
        <TextareaItem onChange={v => this.onChange('desc', v)} rows={3} title="职位要求">
        </TextareaItem>
        <WhiteSpace size="lg" />
        <Button type="primary"
          onClick={() => {
            this.props.update(this.state)
          }}
        >保存</Button>
      </div>
    )
  }
}

export default BossInfo