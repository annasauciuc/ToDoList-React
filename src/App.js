import React, { Component } from "react";

import ToDoItem from "./components/ToDoItem/ToDoItem";

class ToDo extends Component {
  constructor(props) {
    super(props);
    //  this.createNewToDoItem = this.createNewToDoItem.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = {
      active: false,
      list: [],
      todo: ""
    };
  }

  getToDos = () => {
    const { todo } = this.state;
    fetch("http://localhost:3000/tasks")
      .then(response => response.json())
      .then(data => {
        console.log("data", data);
        this.setState({ list: data });
      })
      .catch(error => console.log("error :", error));
  };

  componentDidMount = () => {
    this.getToDos();
  };

  createNewItem = () => {
    const { todo } = this.state;

    fetch("http://localhost:3000/tasks", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      // mode: "no-cors",
      body: JSON.stringify({ name: todo })
    })
      .then(response => this.getToDos())
      .catch(error => console.log("error :", error));
  };

  handleKeyPress = e => {
    if (e.target.value !== "") {
      if (e.key === "Enter") {
        this.createNewToDoItem();
      }
    }
  };

  handleInput = e => {
    this.setState({
      todo: e.target.value
    });
  };
  toggleClass(index) {
    this.setState({
      active: !this.state.active
    });
  }
  deleteItem = id => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(response => this.getToDos());
  };

  // deleteItem = indexToDelete => {

  //   this.setState(({ list }) => ({
  //     list: list.filter((toDo, index) => index !== indexToDelete)
  //   }));
  // };

  render() {
    const { active, done, id } = this.state;
    return (
      <React.Fragment>
        <div className="ToDo">
          <h1>
            To-Do List{" "}
            <i
              className="ToDo-Add"
              onClick={this.createNewItem}
              className="fa fa-plus"
            />
          </h1>

          {this.state.list.map((item, key) => {
            //    console.log(item);
            return (
              <ToDoItem
                active={active}
                id={item._id}
                done={done}
                toggleClass={this.toggleClass.bind(this, key)}
                key={key}
                item={item.name}
                deleteItem={() => this.deleteItem(item._id)}
              />
            );
          })}
        </div>

        <div>
          <input
            placeholder="Add New Todo"
            type="text"
            value={this.state.todo}
            onChange={e => this.handleInput(e)}
            onKeyPress={this.handleKeyPress}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ToDo;
