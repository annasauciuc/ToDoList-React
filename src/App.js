import React, { Component } from "react";

import ToDoItem from "./components/ToDoItem/ToDoItem";

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.createNewToDoItem = this.createNewToDoItem.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = {
      active: false,
      list: [],
      todo: "",
 
    };
  }
  createNewToDoItem = () => {
    this.setState(({ list, todo,id }) => ({
      list: [...list, { todo ,id}],
      todo: "",
      active: false
    }));
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

  
  deleteItem = indexToDelete => {
    this.setState(({ list }) => ({
      list: list.filter((toDo, index) => index !== indexToDelete)
    }));
  };

  render() {
    const { active, done ,id} = this.state;
    return (
      <React.Fragment>
        <div className="ToDo">
          <h1>
            To-Do List{" "}
            <i
              className="ToDo-Add"
              onClick={this.createNewToDoItem}
              className="fa fa-plus"
            />
          </h1>

          {this.state.list.map((item, key) => {
            return (
              <ToDoItem
                active={active}
                id={id}
                done={done}
                toggleClass={this.toggleClass.bind(this, key)}
                key={key}
                item={item.todo}
                deleteItem={this.deleteItem.bind(this, key)}
              />
            );
          })}
        </div>

        <div>
          <input
            placeholder="Add New Todo"
            type="text"
            value={this.state.todo}
            onChange={this.handleInput}
            onKeyPress={this.handleKeyPress}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ToDo;
