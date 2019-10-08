import React, { Component } from "react";
import "./App.css";

import Validation from "./ValidationComponent";
import Char from "./CharComponent";

class App extends Component {
  state = {
    userInput: "",
    shift: "1",
    encodedOutput: ""
  };
  outputHandler = event => {
    const userInput = event.target.value;
    this.setState({
      userInput: userInput
    });
  };
  deleteCharHandler = index => {
    const text = this.state.userInput.split("");
    text.splice(index, 1);
    const ui = text.join("");
    this.setState({ userInput: ui });
  };
  shiftChangeHandler = event => {
    const newShift = event.target.value;
    this.setState({
      shift: newShift
    });
  };

  encode = () => {
    const shift = parseInt(this.state.shift, 10);
    const text = this.state.userInput;
    let output = "";

    for (let i = 0; i < text.length; i++) {
      let c = text[i];
      if (c.match(/[a-z]/i)) {
        let code = text.charCodeAt(i);
        // Uppercase letters
        if (code >= 65 && code <= 90)
          c = String.fromCharCode(((code - 65 + shift) % 26) + 65);
        // Lowercase letters
        else if (code >= 97 && code <= 122)
          c = String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
      output += c;
    }
    this.setState({ encodedOutput: output });
  };
  render() {
    const letters = this.state.userInput.split("").map((ch, index) => {
      return (
        <Char
          key={index}
          letter={ch}
          click={() => this.deleteCharHandler(index)}
        />
      );
    });

    return (
      <div className="App">
        <h1>Ceasar Cipher Generator</h1>
        <p>
          With the number of cyber attacks increasing and the fight for privacy
          has becoming more fierce, <strong>strong</strong> passwords are
          becoming a lot more important. This tool is a simple Ceasar Cipher
          which can help make passwords more secure by shifting the letters in
          your passwords into new letters given the shift number (I.E. Shift=1:
          A=B, B=C, C=D...)
        </p>

        <p>
          Good passwords will have a minimum length of 12 characters, being a
          mix of letters, numbers, and special characters.
        </p>
        <input
          type="text"
          value={this.state.shift}
          onChange={this.shiftChangeHandler}
          maxLength="2"
          size="2"
        />

        <input
          type="text"
          onChange={this.outputHandler}
          value={this.state.userInput}
        />
        <br></br>
        <button onClick={this.encode}>Encoded Password:</button>
        <h4>{this.state.encodedOutput}</h4>
        <Validation input={this.state.userInput} />

        {letters}

        {/* <Char letter={this.state.userInput} /> */}
      </div>
    );
  }
}

export default App;
