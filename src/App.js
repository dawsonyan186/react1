import React, { Component } from 'react';
import './App.css';
import 'normalize.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'
import { getCurrentUser, signOut,TodoModel } from './leanCloud'
import {stateCopyFn,idMaker} from  './utils'

class App extends Component {
  constructor(props) {
    super(props);
    let user = getCurrentUser()
    this.state = {
      user: user || {},
      newTodo: '',
      todoList: []
    }
  }
  addTodo(event) {
    let newTodo = {
      title: event.target.value,
      status: '',
      deleted: false
    }
    TodoModel.create(newTodo, (id) => {
      newTodo.id = id
      this.state.todoList.push(newTodo)
      this.setState({
        newTodo: '',
        todoList: this.state.todoList
      })
    }, (error) => {
      console.log(error)
    })
  }
  changeTitle(event) {
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }
  toggle(e, todo) {
    let oldStatus = todo.status
    todo.status = todo.status === 'completed' ? '' : 'completed'
    TodoModel.update(todo, () => {
      this.setState(this.state)
    }, (error) => {
      todo.status = oldStatus
      this.setState(this.state)
    })
  }
  delete(event, todo) {
    TodoModel.destroy(todo.id, () => {
      todo.deleted = true
      this.setState(this.state)
    })
  }
  componentDidUpdate() {
    console.log("componentDidUpdate")

  }
  render() {
    let todos = this.state.todoList
      .filter((item) => !item.deleted)
      .map((item, index) => {
        return (<li key={index}><TodoItem todo={item}
          onToggle={this.toggle.bind(this)}
          onDelete={this.delete.bind(this)} /></li>)
      })
    console.log(todos);
    return <div className="App">
      <h1>{this.state.user.username || '我'}的待办
        {this.state.user.id ? <button onClick={this.signOut.bind(this)}>登出</button> : null}
      </h1>
      <div className="inputWrapper"></div>
      <TodoInput content={this.state.newTodo}
        onChange={this.changeTitle.bind(this)}
        onSubmit={this.addTodo.bind(this)} />
      <ol className="todoList">
        {todos}
      </ol>
      {this.state.user.id ?
        null :
        <UserDialog
          onSignUp={this.onSignUpOrSignIn.bind(this)}
          onSignIn={this.onSignUpOrSignIn.bind(this)} />}
    </div>;
  }
  onSignUpOrSignIn(user) {
    let stateCopy = stateCopyFn(this.state)
    stateCopy.user = user
    this.setState(stateCopy)

    if (user) {
      TodoModel.fetchTodoByUser(user, (todos) => {
        let stateCopy = stateCopyFn(this.state)
        stateCopy.todoList = todos
        this.setState(stateCopy)
      })
    }
  }
  signOut() {
    signOut()
    let stateCopy = stateCopyFn(this.state)
    stateCopy.user = {}
    this.setState(stateCopy)
  }
}

export default App;
