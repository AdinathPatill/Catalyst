// actions.js

export const FETCH_TODOS = 'FETCH_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export const fetchTodos = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const todos = await response.json();
      dispatch({ type: FETCH_TODOS, payload: todos });
    } catch (error) {
      console.log(error, "error in actionss============================");
      // Dispatch an action to handle the error, like showing an error message
    }
  };
};

// Add the toggleTodo action creator
export const toggleTodo = (id) => {
  return {
    type: TOGGLE_TODO,
    payload: id
  };
};

// Add the deleteTodo action creator
export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    payload: id
  };
};