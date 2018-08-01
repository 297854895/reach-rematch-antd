import React, { Component } from 'react'
import moment from 'moment'
import Proptypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'antd'
import posed from 'react-pose'
import ListItem from './ListItem'
import styles from './index.less'

const ListWrap = posed.div()
@connect(
  state => ({ todos: state.todos }),
  ({ todos }) => ({
    editTodos: v => todos.editTodos(v),
    addTodos: v => todos.addTodos(v)
  })
)
export default class Todo extends Component{
  todolist = React.createRef()
  input = React.createRef()
  state = {
    filter: 'All'
  }
  componentDidMount() {
    const height = document.body.offsetHeight
    this.todolist.current.style.height =`${height - 232}px`
  }
  addTodos = () => {
    if (!this.input.current) return
    const value = this.input.current.value
    if (!value) return
    this.input.current.value = ''
    this.props.addTodos({
      content: value,
      status: 'Doing',
      time: moment().format('YYYY-MM-DD hh:mm:ss')
    })
  }
  enterAdd = (event) => {
    if (event.which !== 13) return
    this.addTodos()
  }
  render () {
    return <div className={styles.todosContainer}>
      <div className={styles.todosWrap}>
        <input
          ref={this.input}
          onKeyDown={this.enterAdd}
          className={styles.todosInput}
          placeholder='Add something todos...' />
        <Button type='primary' onClick={this.addTodos} className={styles.addButton}>ADD</Button>
      </div>
      <ListWrap className={styles.poseWrap}>
        <div className={styles.filter}>
          {
            ['All', 'Doing', 'Done', 'Delete'].map(
              item => <div
                onClick={() => this.setState({ filter: item })}
                className={`${styles.item} ${this.state.filter === item ? styles.itemActive : ''}`}>
                {item.toUpperCase()}
              </div>
            )
          }
        </div>
        <ul className={styles.todosList} ref={this.todolist}>
          {
            this.state.filter === 'All'
            ? this.props.todos.map(item => <ListItem editTodos={this.props.editTodos} info={item.toJS()} />).reverse()
            : this.props.todos.filter(
              item => item.get('status') === this.state.filter
            ).map(item => <ListItem editTodos={this.props.editTodos} info={item.toJS()} />).reverse()
          }
        </ul>
      </ListWrap>
    </div>
  }
}
Todo.propTypes = {
  addTodos: Proptypes.func,
  editTodos: Proptypes.func
}
