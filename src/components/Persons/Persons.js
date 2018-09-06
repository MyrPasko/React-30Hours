import React, {Component} from 'react';
import Person from './Person/Person';

class Persons extends Component {
    constructor(props) {
        super(props);
        console.log('[Persons.js] From the constructor.', props);
    }

    componentWillMount() {
        console.log('[Persons.js] From the Component Will Mount.');
    }

    componentDidMount() {
        console.log('[Persons.js] From the Component Did Mount.');
    }

    componentWillReceiveProps(nextProps) {
        console.log('[UPDATE Persons.js] From Component Will Receive Props', nextProps);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[UPDATE Persons.js] From Should Component Update', nextProps, nextState);
        return nextProps.persons !== this.props.persons;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('[UPDATE Persons.js] From Component Will Update', nextProps, nextState);

    }

    componentDidUpdate() {
        console.log('[UPDATE Persons.js] From Component Did Update');

    }

    render() {
        console.log('[Persons.js] From the render.');
        return this.props.persons.map((person, index) => {
            return <Person
                click={() => this.props.clicked(index)}
                key={person.id}
                name={person.name}
                age={person.age}
                changed={(event) => this.props.changed(event, person.id)}
            />
        });
    }
}

export default Persons;