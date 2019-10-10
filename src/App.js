import React, { Component } from "react";
import Persons from "../Components/Persons/Persons";
import Cockpit from "../Components/Cockpit/Cockpit";

import classes from "./App.css";

class App extends Component {
  state = {
    persons: [
      { id: "8676", name: "Max", age: 27 },
      { id: "8654", name: "Maxine", age: 227 },
      { id: "7844", name: "Sdx", age: 137 }
    ],
    showPersons: false
  };
  //handler for evens
  deletePersonHandler = index => {
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({
      persons: persons
    });
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  };

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  render() {
    let persons = null;

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
    }

    return (
      <div className={classes.App}>
        <Cockpit
          clicked={this.togglePersonHandler}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          title={this.props.appTitle}
        />
        {persons}
      </div>
    );
  }
}

export default App;
