import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
    constructor(props) {
        super(props);
        console.log('[Persons.js] From the constructor.', props);
        this.lastPersonRef = React.createRef();
    }

    componentWillMount() {
        console.log('[Persons.js] From the Component Will Mount.');
    }

    componentDidMount() {
        console.log('[Persons.js] From the Component Did Mount.');
        this.lastPersonRef.current.focus();
    }

    componentWillReceiveProps(nextProps) {
        console.log('[UPDATE Persons.js] From Component Will Receive Props', nextProps);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[UPDATE Persons.js] From Should Component Update', nextProps, nextState);
    //     return nextProps.persons !== this.props.persons ||
    //         nextProps.changed !== this.props.changed ||
    //         nextProps.clicked !== this.props.clicked;
    //     // return true;
    // }

    componentWillUpdate(nextProps, nextState) {
        console.log('[UPDATE Persons.js] From Component Will Update', nextProps, nextState);

    }

    componentDidUpdate() {
        console.log('[UPDATE Persons.js] From Component Did Update');

    }

    render() {
        console.log('[RENDER Persons.js] From the render.');
        return this.props.persons.map((person, index) => {
            return <Person
                click={() => this.props.clicked(index)}
                key={person.id}
                position={index}
                name={person.name}
                // forwardedRef={this.lastPersonRef}
                ref={this.lastPersonRef}
                // authenticated={this.props.isAuthenticated}
                age={person.age}
                changed={(event) => this.props.changed(event, person.id)}
            />
        });
    }
}

export default Persons;