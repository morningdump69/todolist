import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    list: [],
    inputText: "",
    errorText: "Please type something into the input box"
  };

  componentDidMount = async () => {
    const response = await fetch("http://localhost:3009/data");
    const data = await response.json();
    console.log(data);
    this.setState({ list: data.data });
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
    storeInput.push({ task: this.state.inputText });
    this.setState({ list: storeInput, inputText: "" });

    fetch("http://localhost:3009/taskAdd", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        task: this.state.inputText
      })
    });
  };

  removeHandler = (index, task) => {
    let temp = this.state.list;
    temp.splice(index, 1);
    this.setState({ list: temp });

    fetch("http://localhost:3009/delete", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        task: task
      })
    });
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
          add!
        </button>
        <div className="list">
          {this.state.list.map((savedInput, index) => {
            return (
              <div className="box">
                <p
                  key={index}
                  onClick={() => this.removeHandler(index, savedInput.task)}
                >
                  {savedInput.task}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
