import { Todo } from '../types/todo';

export const storage = {
  getTodos: (): Todo[] => {
    try {
      const todos = localStorage.getItem('todos');
      if (!todos) return [];
      
      const parsedTodos = JSON.parse(todos);
      return parsedTodos.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
    } catch (e) {
      return [];
    }
  },

  setTodos: (todos: Todo[]): void => {
    localStorage.setItem('todos', JSON.stringify(todos));
  },

  getDarkMode: (): boolean => {
    return localStorage.getItem('darkMode') === 'true';
  },

  setDarkMode: (isDark: boolean): void => {
    localStorage.setItem('darkMode', isDark.toString());
  }
}; 