import React from 'react'

// 高阶组件(函数)两个作用：
//   1、属性代理(拓展一些属性)
//   2、反向继承(重写需要的生命周期)
export default function Wrapper (Comp) {
  return class WrapperComp extends React.Component {
    constructor (props) {
      super(props)
      this.state = {}
      this.handleChange = this.handleChange.bind(this)
    }
    handleChange (key, val) {
      this.setState({
        [key]: val
      })
    }
    render () {
      return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
    }
  }
}