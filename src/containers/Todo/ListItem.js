import React, { Component } from 'react'
import Proptypes from 'prop-types'
import styles from './index.less'
import posed from 'react-pose'
import { Button } from 'antd'

const TodoItem = posed.li({
  added: { opacity: 1, y: 0 },
  adding: { opacity: 0, y: 20 }
})

export default class ListItem extends Component {
  state = {
    eidt: false,
    status: this.props.info.status,
    addFlag: false
  }
  input = React.createRef()
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.info.status !== prevState.status) {
      return {
        edit: false,
        status: nextProps.info.status
      }
    }
    return null
  }
  componentDidMount() {
    setTimeout(() => this.setState({
      addFlag: true
    }), 1)
  }
  toggleEdit = () => {
    const input = this.input.current
    if (!input) return
    const changeState = { edit: !this.state.edit }
    this.setState(changeState)
    this.props.editTodos({
      id: this.props.info.id,
      content: input.value
    })
  }
  onKeyDown = (event) => {
    if (event.which !== 13) return
    this.toggleEdit()
  }
  operate = (status) => () => {
    this.props.editTodos({
      id: this.props.info.id,
      status
    })
  }
  render () {
    const { status } = this.props.info
    const operate_1 = status === 'Doing' ? 'Done' : status === 'Done' ? 'Undone' : 'Doing'
    const operate_2 = status === 'Delete' ? 'Done' : 'Delete'
    return <TodoItem
      key={this.props.info.id}
      pose={this.state.addFlag ? 'added' : 'adding'}
      className={
        `${styles.todosItem}
         ${ status === 'Done' ? styles.todosItemComplete : '' }
         ${ status === 'Delete' ? styles.todosItemDelete : '' }
         ${ this.state.edit ? styles.todosItemEdit : '' }
        `}>
      <input
        ref={this.input}
        onKeyDown={this.onKeyDown}
        title={this.state.content}
        className={`${styles.input} ${ this.state.edit ? styles.inputEdit : '' }`}
        onClick={this.toggleEdit}
        defaultValue={this.props.info.content} />
      {
        this.state.edit
        ? <Button.Group>
          <Button
            onClick={this.operate(operate_1)}
            style={{ background: 'rgb(21,170,238)', borderColor: 'rgb(21,170,238)', color: '#fff' }}>
            { operate_1 }
          </Button>
          <Button
            onClick={this.operate(operate_2)}
            style={{ background: 'linear-gradient(135deg, #ff4c9f, #ff7b74)', borderColor: '#ff4c9f', color: '#fff' }}>
            { operate_2 }
          </Button>
        </Button.Group> : <span className={styles.timewrap}>{this.props.info.time}</span>
      }
    </TodoItem>
  }
}
ListItem.propTypes = {
  info: Proptypes.object,
  editTodos: Proptypes.object
}
