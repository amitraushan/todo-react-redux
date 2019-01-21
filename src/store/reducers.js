// import { combineReducers } from "redux";
import {
  ADD_TODO,
  TOGGLE_TODO,
  SHOW_ALL,
  SET_FILTER,
  REMOVE_TODO,
  CLEAR_COMPLETED,
  TOGGLE_ALL
} from "./constant";

const initialState = {
  filter: SHOW_ALL,
  todos: []
};
const todos = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case SET_FILTER:
      return Object.assign({}, state, {
        filter: action.filter
      });
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            value: action.data.value,
            completed: false
          }
        ]
      };
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: state.todos.map((todo, index) => {
          if (index === action.task.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            });
          }
          return todo;
        })
      });
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo, index) => action.index !== index)
      };
    case CLEAR_COMPLETED:
      return {
        ...state.completed,
        todos: state.todos.filter(todo => !todo.completed)
      };
    case TOGGLE_ALL:
      return {
        ...state,
        todos: state.todos.map(todo => {
          return { ...todo, completed: !action.checked };
        })
      };
    default:
      return state;
  }
};
export default todos;
