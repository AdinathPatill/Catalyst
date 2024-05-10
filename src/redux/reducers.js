// reducers.js
import { FETCH_TODOS, ADD_TODO, TOGGLE_TODO, DELETE_TODO } from './actions';

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_TODOS:
      return { ...state, todos: action.payload, loading: false };
    // Add cases for other actions (ADD_TODO, TOGGLE_TODO, DELETE_TODO) if needed
    default:
      return state;
  }
}