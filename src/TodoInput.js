import React, { Component } from 'react';
import './TodoInput.css'
export default class TodoInput extends Component {
    submit(e) {
        if (e.key === 'Enter') {
            console.log('用户按回车了');

            this.props.onSubmit(e);
        }
    }
    changeTitle(e) {
        this.props.onChange(e)
    }
    render() {
        return <input type="text" value={this.props.content}
            className="TodoInput"
            onChange={this.changeTitle.bind(this)}
            onKeyPress={this.submit.bind(this)} />
    }
}
