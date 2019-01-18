// import { combineReducers } from "redux";
import { ADD_TODO, TOGGLE_TODO, SHOW_ALL, SET_FILTER } from "./constant";

const initialState = {
  filter: SHOW_ALL,
  todos: []
};
const todos = (state = initialState, action) => {
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
        todos: state.todos.map((elem, index) => {
          if (index === action.index) {
            return Object.assign({}, elem, {
              completed: !elem.completed
            });
          }
          return elem;
        })
      });
    default:
      return state;
  }
};
export default todos;
