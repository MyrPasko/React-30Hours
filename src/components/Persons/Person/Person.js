import React, {Component} from 'react';
import classes from './Person.css';

class Person extends Component {
    constructor(props) {
        super(props);
        console.log('[Person.js] From the constructor.', props);
    }

    componentWillMount() {
        console.log('[Person.js] From the Component Will Mount.');
    }

    componentDidMount() {
        console.log('[Person.js] From the Component Did Mount.');
    }

    render() {
        console.log('[RENDER Person.js] From the render.');

        return (
            <div className={classes.Person}>
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!!!</p>
                <p>{this.props.children}</p>
                <input type="text"
                       onChange={this.props.changed}
                       defaultValue={this.props.name}/>
            </div>
        )
    }
}

export default Person;