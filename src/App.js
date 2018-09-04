import React, {Component} from 'react';
import './App.css';
import Person from './Person/Person';

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
        // const persons = this.state.persons.slice();
        const persons = [...this.state.persons];
        persons.splice(index, 1);
        this.setState({persons: persons});
    };

    nameChangedHandler = (event, id) => {
        /** Too much code, but this is the best way to change
         * state without mutating it, the best practice */

        const personIndex = this.state.persons.findIndex((pers) => {
          return pers.id === id;
        });

        // const person = Object.assign({}, this.state.persons[personIndex]);
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
        const style = {
            backgroundColor: 'green',
            color: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer'
        };

        let persons = null;

        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return (
                            <Person
                                key={person.id}
                                click={this.deletePersonHandler.bind(this, index)}
                                name={person.name}
                                age={person.age}
                                changed={(event) => this.nameChangedHandler(event, person.id)}
                            />
                        )
                    })}
                </div>
            );

            style.backgroundColor = 'red'
        }

        let classes = [];

        if(this.state.persons.length <= 2) {
            classes.push('red');
        }
        if(this.state.persons.length <= 1) {
            classes.push('bold');
        }

        return (
            <div className="App">
                <h1>Hi, I am a bad MotherFucker</h1>
                <p className={classes.join(' ')} >This is really working.</p>
                <button
                    style={style}
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
