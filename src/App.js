import React, { Component } from 'react';
import './App.css';
import 'normalize.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
      todoList: [{title:'第一个代办'},{title:'第二个代办'},{title:'第三个代办'}]
    }
  }
  addTodo(){
    console.log('我得添加一个 todo 了')
  }
  render() { 
    let todos = this.state.todoList.map((item, index) => {
      return (<li><TodoItem todo={item} /></li>)
    })
    return <div className="App">
      <h1>我的待办</h1>
      <div className="inputWrapper"></div>
      <TodoInput content={this.state.newTodo} onSubmit={this.addTodo} />
      <ol>
      {todos}
      </ol>
    </div>;
  }
}

export default App;
