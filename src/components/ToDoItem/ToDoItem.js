import React, { Component } from "react";

import "./ToDoItem.css";

class ToDoItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { active, item,deleteLi, deleteItem, id } = this.props;
    console.log('id :', id);
  
    return (
      <React.Fragment>
        <div className="ToDoItem">
          <ul>
            <li
              id={id}
            //  onClick={e => deleteLi(e)}
              className={active ? "done" : "undone"}
            >
              <span>
                <i onClick={()=>deleteItem(id)} className="fa fa-trash" />
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
