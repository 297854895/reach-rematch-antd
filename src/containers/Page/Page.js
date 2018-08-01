import React, { Component } from 'react'
import Proptypes from 'prop-types'

export default class Page extends Component{
  render () {
    return <div>
      This is Page { this.props.text }
    </div>
  }
}

Page.propTypes = {
  text: Proptypes.string
}
