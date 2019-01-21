import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./todo.css";
import { addToDo, setFilter } from "../store/action";
import { SHOW_COMPLETED, SHOW_ACTIVE, SHOW_ALL } from "../store/constant";

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.addToTable = this.addToTable.bind(this);
    this.showAll = this.showAll.bind(this);
    this.showActive = this.showActive.bind(this);
    this.showCompleted = this.showCompleted.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.state = {
      // footerFlag: 1,
      toggleAll: false,
      // activeBtn: "all",
      // taskList: [],
      toBeDone: [],
      completed: []
    };
  }

  addToTable(e) {
    if (e.keyCode === 13 && e.target.value) {
      let obj = { value: e.target.value, completed: false };
      this.props.addToDo(obj);
      e.target.value = "";
    }
  }

  removeItem(index) {
    console.log(index);
  }

  toggleTaskStatus(item, index) {
    console.log(item);
  }

  changeToggleAllStatus() {
    console.log("change toggle Status");
  }

  toggleAll() {
    console.log("toggle All");
  }

  showAll() {
    console.log("showAll");
    this.props.setFilter(SHOW_ALL);
  }

  showActive() {
    console.log("showActive");
    this.props.setFilter(SHOW_ACTIVE);
  }

  showCompleted() {
    console.log("showCompleted");
    this.props.setFilter(SHOW_COMPLETED);
  }

  clearCompleted() {
    console.log("clear completed");
  }

  componentDidMount() {
    console.log("rendered");
  }

  render() {
    console.log(this.state);
    return (
      <section className="App-page">
        <h1>todos</h1>
        <div className="todo-app" react-id="table-0">
          <header>
            <input
              className="new-todo"
              placeholder="What needs to be done ?"
              onKeyDown={this.addToTable}
            />
          </header>
          {this.props.todos.length ? (
            <section className="main">
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                checked={this.state.toggleAll}
                onChange={this.toggleAll}
              />
              <label htmlFor="toggle-all" />
              <ul className="todo-list">
                {this.props.todos.map((item, index) => (
                  <li key={index} className="view">
                    <input
                      type="checkbox"
                      id={`task-${index}`}
                      className="toggle"
                      checked={item.completed}
                      onChange={() => this.toggleTaskStatus(item, index)}
                    />
                    <label
                      htmlFor={`task-${index}`}
                      className={`${
                        item.completed ? `completed` : "not-completed"
                      } task-label`}
                    >
                      <span className="label-name">{item.value}</span>
                    </label>
                    <button
                      className="destroy"
                      onClick={() => this.removeItem(index)}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            ""
          )}
          {this.props.originalList.length ? (
            <footer className="footer">
              <div className="items-left">
                {this.props.originalList.filter(todo => !todo.completed).length}{" "}
                items left
              </div>
              <button
                className={`${
                  this.props.activeFilter === SHOW_ALL ? `active-class` : ""
                } footer-btn`}
                onClick={this.showAll}
              >
                All
              </button>
              <button
                className={`${
                  this.props.activeFilter === SHOW_ACTIVE ? `active-class` : ""
                } footer-btn`}
                onClick={this.showActive}
              >
                Active
              </button>
              <button
                className={`${
                  this.props.activeFilter === SHOW_COMPLETED
                    ? `active-class`
                    : ""
                } footer-btn`}
                onClick={this.showCompleted}
              >
                Completed
              </button>
              {this.state.completed.length !== 0 ? (
                <button
                  className="clear-completed"
                  onClick={this.clearCompleted}
                >
                  Clear completed
                </button>
              ) : (
                ""
              )}
            </footer>
          ) : (
            ""
          )}
        </div>
      </section>
    );
  }
}

ToDo.propTypes = {
  addToDo: PropTypes.func,
  todos: PropTypes.array,
  activeFilter: PropTypes.string,
  originalList: PropTypes.array
};
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
    default:
      return todos;
  }
};
const mapStateToProps = state => {
  return {
    originalList: state.todos,
    todos: getVisibleTodos(state.todos, state.filter),
    activeFilter: state.filter
  };
};
const mapDispatchToProps = dispatch => ({
  addToDo: data => dispatch(addToDo(data)),
  setFilter: filter => dispatch(setFilter(filter))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDo);
