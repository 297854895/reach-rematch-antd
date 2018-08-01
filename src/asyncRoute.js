import React from 'react'
import PropTypes from 'prop-types'
// webpack 代码分割打包写法
export default class AsyncRoute extends React.Component {
  state = {
    mod: null
  }
  componentWillMount() {
    this.load(this.props)
  }
  load = (props) => {
    this.setState({
      mod: null
    })
    props.load().then(mod => this.setState({ mod: mod.default || mod }))
  }
  render() {
    return this.state.mod ? this.props.children(this.state.mod) : null
  }
}

AsyncRoute.propsTypes = {
  load: PropTypes.func,
  children: PropTypes.func
}
