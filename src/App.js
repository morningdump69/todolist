import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    list: [],
    inputText: "",
    errorText: "Please type something into the input box"
  };

  changeHandler = event => {
    if (event.target.value === "") {
      this.setState({
        inputText: event.target.value,
        errorText: "Please type something into the input box"
      });
    } else {
      this.setState({
        inputText: event.target.value,
        errorText: ""
      });
    }
  };

  onSubmit = () => {
    let storeInput = this.state.list;
    storeInput.push(this.state.inputText);
    this.setState({ list: storeInput, inputText: "" });
  };

  removeHandler = index => {
    let temp = this.state.list;
    temp.splice(index, 1);
    this.setState({ list: temp });
    console.log("test");
  };

  render() {
    const isActive = this.state.inputText === "";
    return (
      <div className="Full">
        <p>{this.state.errorText}</p>
        <p>To Do List</p>
        <input
          className="boxInput"
          type="text"
          onChange={event => this.changeHandler(event)}
          placeholder="give me a task"
          value={this.state.inputText}
        />
        <button
          className="button"
          type="submit"
          onClick={this.onSubmit}
          disabled={isActive}
        >
          add
        </button>
        <div className="list">
          {this.state.list.map((savedInput, index) => {
            return (
              <p key={index} onclick={() => this.removeHandler(index)}>
                {savedInput}
              </p>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
