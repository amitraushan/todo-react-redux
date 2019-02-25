import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./todo.css";
import {
  addToDo,
  setFilter,
  toggleToDo,
  removeTodo,
  clearCompleted,
  toggleAll
} from "../store/action";
import { SHOW_COMPLETED, SHOW_ACTIVE, SHOW_ALL } from "../store/constant";

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.addToTable = this.addToTable.bind(this);
    this.showAll = this.showAll.bind(this);
    this.showActive = this.showActive.bind(this);
    this.showCompleted = this.showCompleted.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
  }

  addToTable(e) {
    if (e.keyCode === 13 && e.target.value) {
      let obj = {
        value: e.target.value,
        completed: false,
        id: Math.random()
      };
      this.props.addToDo(obj);
      e.target.value = "";
    }
  }

  removeItem(index) {
    this.props.removeTodo(index);
  }

  toggleIndividualTodo(item) {
    this.props.toggleToDo({ ...item });
  }

  toggleAll(checked) {
    console.log("toggle All", checked);
    this.props.toggleAll(checked);
  }

  showAll() {
    this.props.setFilter(SHOW_ALL);
  }

  showActive() {
    this.props.setFilter(SHOW_ACTIVE);
  }

  showCompleted() {
    this.props.setFilter(SHOW_COMPLETED);
  }

  clearCompleted() {
    this.props.clearCompleted();
    this.props.setFilter(SHOW_ALL);
  }

  componentDidMount() {
    console.log("rendered");
  }

  render() {
    const isToggleAllChecked =
      this.props.originalList.length ===
      this.props.todos.filter(elem => elem.completed).length;
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
                checked={isToggleAllChecked}
                onChange={() => this.toggleAll(isToggleAllChecked)}
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
                      onChange={() => this.toggleIndividualTodo(item)}
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
                      onClick={() => this.removeItem(item)}
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
              {this.props.originalList.filter(todo => todo.completed).length >
              0 ? (
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
  setFilter: PropTypes.func,
  toggleToDo: PropTypes.func,
  clearCompleted: PropTypes.func,
  removeTodo: PropTypes.func,
  toggleAll: PropTypes.func,
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
/*Connects redux state to props of react component */
const mapStateToProps = state => {
  return {
    originalList: state.todos,
    todos: getVisibleTodos(state.todos, state.filter),
    activeFilter: state.filter
  };
};
/* connects redux actions to react props */
const mapDispatchToProps = dispatch => ({
  addToDo: data => dispatch(addToDo(data)),
  setFilter: filter => dispatch(setFilter(filter)),
  toggleToDo: todo => dispatch(toggleToDo(todo)),
  removeTodo: index => dispatch(removeTodo(index)),
  clearCompleted: () => dispatch(clearCompleted()),
  toggleAll: checked => dispatch(toggleAll(checked))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDo);
