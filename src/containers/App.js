import React, {Component} from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';

class App extends Component {
    state = {
        persons: [
            {id: 0, name: 'Max', age: 28},
            {id: 1, name: 'Many', age: 29},
            {id: 3, name: 'Stephanie', age: 25},
            {id: 4, name: 'Julia', age: 29},
        ],
        otherState: 'some other value',
        showPersons: false
    };

    deletePersonHandler = (index) => {
        // const Persons = this.state.Persons.slice();
        const persons = [...this.state.persons];
        persons.splice(index, 1);
        this.setState({persons: persons});
    };

    nameChangedHandler = (event, id) => {
        /** Too much code, but this is the best way to change
         * state without mutating it, the best practice */

        const personIndex = this.state.persons.findIndex((pers) => {
            return pers.userId === id;
        });

        // const person = Object.assign({}, this.state.Persons[personIndex]);
        const person = {...this.state.persons[personIndex]};

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({
            persons: persons
        })
    };

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    };

    render() {
        let persons = null;
        let btnClass = '';

        if (this.state.showPersons) {
            persons = (
                <div>
                    <Persons
                        persons={this.state.persons}
                        clicked={this.deletePersonHandler}
                        changed={this.nameChangedHandler}
                    />
                </div>
            );

            btnClass = classes.Red;

        }

        let assignedClasses = [];

        if (this.state.persons.length <= 2) {
            assignedClasses.push(classes.red);
        }
        if (this.state.persons.length <= 1) {
            assignedClasses.push(classes.bold);
        }

        return (
            <div className={classes.App}>
                <h1>Hi, I am a bad MotherFucker</h1>
                <p className={assignedClasses.join(' ')}>This is really working.</p>
                <button className={btnClass}
                        onClick={this.togglePersonsHandler}
                >Toggle Persons
                </button>
                {persons}
            </div>
        )
        //   return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Is it work now?'), 'Hi, I am a bad MotherFucker')
    }
}

export default App;
