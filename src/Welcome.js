import React from 'react';
class Welcome extends React.Component {
    // constructor
    constructor(props) {
        super(props);
        console.log("this is constructor")
        this.state = {
            date: new Date()
        }
    }
    componentWillMount() {
        console.log('运行到这里的话，说明马上就要运行 render 了')
        this.setState({
            date: new Date(), // 更新 date
            test: '钩子名称'
        })
    }
    render() {
        console.log("this is render")
        return (
            <div>
                <h1>Hello, {this.props.name}</h1>
                <h2>{this.state.date.toString()}</h2>
            </div>
        )
    }
    componentDidMount() {
        this.setState({
            date: new Date(), // 更新 date
            test: '钩子名称'
        })
        console.log('已经挂载到页面里了')
    }
}

export default Welcome