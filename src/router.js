import React, { Component } from 'react'
import { Router } from "@reach/router"
import { App } from './containers'

export default class Route extends Component {
  render() {
    return <Router>
      <App path='/' />
    </Router>
  }
}
