import React, {PureComponent} from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from "../components/Cockpit/Cockpit";
import Aux from '../hoc/Auxx';
import withClass from '../hoc/WithClass';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
    constructor(props) {
        super(props);
        console.log('[App.js] From the constructor.', props);
        this.state = {
            persons: [
                {id: 0, name: 'Max', age: 28},
                {id: 1, name: 'Many', age: 29},
                {id: 3, name: 'Stephanie', age: 25},
                {id: 4, name: 'Julia', age: 29},
            ],
            otherState: 'some other value',
            showPersons: false,
            toggleClicked: 0,
            authenticated: false
        };
    }

    componentWillMount() {
        console.log('[App.js] From the Component Will Mount.');
    }

    componentDidMount() {
        console.log('[App.js] From the Component Did Mount.');
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[UPDATE App.js] From Should Component Update', nextProps, nextState);
    //     return nextState.persons !== this.state.persons ||
    //         nextState.showPersons !== this.state.showPersons;
    // }

    componentWillUpdate(nextProps, nextState) {
        console.log('[UPDATE App.js] From Component Will Update', nextProps, nextState);

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('[UPDATE App.js] From Component Get Derived State From Props',
            nextProps,
            prevState);

        return prevState;
    }

    getSnapshotBeforeUpdate() {
        console.log('[UPDATE App.js] From Component Get Snapshot Before Update');

    }

    componentDidUpdate() {
        console.log('[UPDATE App.js] From Component Did Update');
    }

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

        this.setState((prevState, props) => {
            return {
                showPersons: !doesShow,
                toggleClicked: prevState.toggleClicked + 1
            }
        });
        /** It is a wrong way - use this.state in setState*/
        // this.setState({
        //     showPersons: !doesShow,
        //     toggleClicked: this.state.toggleClicked + 1
        // });
    };

    loginHandler = () => {
        this.setState({authenticated: true})
    };

    render() {
        let persons = null;

        console.log('[RENDER App.js] From the render.');

        if (this.state.showPersons) {
            persons = <Persons
                persons={this.state.persons}
                clicked={this.deletePersonHandler}
                changed={this.nameChangedHandler}
                // isAuthenticated={this.state.authenticated}
            />
        }


        return (
            <Aux>
                <button onClick={() => {
                    this.setState({showPersons: true})
                }}>Show persons
                </button>
                <Cockpit
                    appTitle={this.props.title}
                    showPersons={this.state.showPersons}
                    persons={this.state.persons}
                    login={this.loginHandler}
                    clicked={this.togglePersonsHandler}
                />
                <AuthContext.Provider
                    value={this.state.authenticated}
                >{persons}</AuthContext.Provider>
            </Aux>
        )
        //   return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Is it work now?'), 'Hi, I am a bad MotherFucker')
    }
}

export default withClass(App, classes.App);
