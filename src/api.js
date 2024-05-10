// api.js
const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchTodos = async () => {
  try {
    const response = await fetch(`${BASE_URL}/todos`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    const todos = await response.json();
    return todos;
  } catch (error) {
    console.error(error);
    return [];
  }
};
