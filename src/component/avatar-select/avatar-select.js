import React from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelecter extends React.Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    const avatarList = 'boy,girl,woman,man,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'.split(',').map(v => ({
      icon: require(`../img/${v}.png`),
      text: v
    }))
    const gridHeader = this.state.text ? (<div><span>已选择头像</span><img src={this.state.icon} style={{width: 20, marginLeft: 10}} alt=""/></div>) : '请选择头像'
    return (
      <div>
        <List renderHeader={gridHeader}>
          <Grid
            data={avatarList}
            onClick={elm => {
              this.setState(elm)
              this.props.selectAvatar(elm.text)
            }}
            columnNum="5"/>
        </List>
      </div>
    )
  }
}

export default AvatarSelecter