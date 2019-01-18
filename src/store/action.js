import { ADD_TODO, TOGGLE_TODO, SET_FILTER } from "./constant";
export const addToDo = data => ({ type: ADD_TODO, data });
export const toggleToDo = task => ({ type: TOGGLE_TODO, task });
export const setFilter = filter => ({ type: SET_FILTER, filter });
