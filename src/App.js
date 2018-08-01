import React, { Component } from 'react';
import { Link, Router } from '@reach/router'
import './static/css/App.css'
import logo from './static/img/logo.svg';
import { Todo, Page, Home } from './containers'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React</h1>
        </header>
        <div>
          <Link to='/' >Home</Link>&nbsp;&nbsp;
          <Link to='/todolist'>Todos</Link>&nbsp;&nbsp;
          <Link to='/page2'>PAGE-2</Link>&nbsp;&nbsp;
          <Link to='/page3'>PAGE-3</Link>
        </div>
        {/* router config */}
        <Router>
          <Home path='/' />
          <Todo path='/todolist' />
          <Page path='/page2' text='two' />
          <Page path='/page3' text='three' />
        </Router>
      </div>
    )
  }
}
