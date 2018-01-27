import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: 'Test',
      todoList: []
    }
  }
  render() {
    let todos = this.state.todoList.map((item, index) => {
      return <li>{item.title}</li>;
    });
    return <div className="App">
      <h1>我的待办</h1>
      <div className="inputWrapper"></div>
      <TodoInput content={this.state.newTodo} />
      <ol>
      {todos}
      </ol>
    </div>;
  }
}

export default App;
