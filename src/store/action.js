import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_FILTER,
  REMOVE_TODO,
  CLEAR_COMPLETED,
  TOGGLE_ALL
} from "./constant";
export const addToDo = data => ({ type: ADD_TODO, data });
export const toggleToDo = task => ({ type: TOGGLE_TODO, task });
export const setFilter = filter => ({ type: SET_FILTER, filter });
export const removeTodo = index => ({ type: REMOVE_TODO, index });
export const clearCompleted = () => ({ type: CLEAR_COMPLETED });
export const toggleAll = checked => ({ type: TOGGLE_ALL, checked });
