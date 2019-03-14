import React, { Component } from "react";

import "./ToDoItem.css";

class ToDoItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {active, item, id} = this.props;

    return (
      <React.Fragment>
        <div className="ToDoItem">
          <ul>
            <li
              id={id}
              onClick={key => this.props.toggleClass(key)}
              className={active ? "done" : "undone"}
            >
              <span>
                <i onClick={this.props.deleteItem} className="fa fa-trash" />
              </span>
              {item}
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default ToDoItem;
