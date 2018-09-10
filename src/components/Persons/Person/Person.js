import React, {Component} from 'react';
import classes from './Person.css';
import Aux from '../../../hoc/Auxx';
import withClass from '../../../hoc/WithClass';
import PropTypes from 'prop-types';

import {AuthContext} from "../../../containers/App";

class Person extends Component {
    constructor(props) {
        super(props);
        console.log('[Person.js] From the constructor.', props);
        this.inputElement = React.createRef();
    }

    componentWillMount() {
        console.log('[Person.js] From the Component Will Mount.');
    }

    componentDidMount() {
        console.log('[Person.js] From the Component Did Mount.');
        if (this.props.position === 1) {
            // this.inputElement.focus();
            this.inputElement.current.focus();
        }
    }

    focus() {
        this.inputElement.current.focus();
    }

    render() {
        console.log('[RENDER Person.js] From the render.');

        /** auth there is 'value' of AuthContext.Provider we passing to
         * {persons} in a render method of App.js. It could be everything,
         * but now it's a boolean*/
        return (
            <Aux>
                <AuthContext.Consumer>
                    {auth => auth ? <p>I am authenticated</p> : null}
                </AuthContext.Consumer>
                {/*{this.props.authenticated ? <p>I am authenticated</p> : null}*/}
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!!!</p>
                <p>{this.props.children}</p>
                <input
                    // ref={(input) => {
                    //     this.inputElement = input;
                    // }}
                    ref={this.inputElement}
                    type="text"
                    onChange={this.props.changed}
                    defaultValue={this.props.name}/>
            </Aux>
        )
        // return [
        //         <p key={1} onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!!!</p>,
        //         <p key={2}>{this.props.children}</p>,
        //         <input key={3} type="text"
        //                onChange={this.props.changed}
        //                defaultValue={this.props.name}/>
        // ]
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, classes.Person);