'use client';

import { useState, useEffect } from 'react';
import { Todo, FilterType } from '../types/todo';
import TodoItem from './TodoItem';
import FilterButton from './FilterButton';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { storage } from '../utils/storage';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load initial data
  useEffect(() => {
    setTodos(storage.getTodos());
    const darkMode = storage.getDarkMode();
    setIsDarkMode(darkMode);
    updateDarkMode(darkMode);
  }, []);

  // Persist todos
  useEffect(() => {
    if (todos.length > 0) {
      storage.setTodos(todos);
    }
  }, [todos]);

  // Persist dark mode
  useEffect(() => {
    storage.setDarkMode(isDarkMode);
    updateDarkMode(isDarkMode);
  }, [isDarkMode]);

  const updateDarkMode = (isDark: boolean) => {
    document.documentElement.classList.toggle('dark', isDark);
  };

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTodos(prevTodos => [...prevTodos, todo]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id: string, newText: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const itemsLeft = todos.filter(todo => !todo.completed).length;
  const filters: FilterType[] = ['all', 'active', 'completed'];

  return (
    <>
      <div className="bg-hero" />
      <div className="relative min-h-screen px-4 sm:px-6">
        <div className="max-w-xl mx-auto pt-8 sm:pt-16">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-[0.3em] text-white">TODO</h1>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <MoonIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>

          <div className="space-y-4">
            <form onSubmit={addTodo}>
              <div className="todo-container p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="checkbox-container">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-gray-200 dark:border-gray-600 rounded-full" />
                  </div>
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Create a new todo..."
                    className="flex-1 p-2 sm:p-1 todo-input focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 text-sm sm:text-base"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newTodo.trim()}
                  className="w-full sm:w-auto px-4 py-2 bg-gradient-to-br from-blue-400 to-purple-500 text-white rounded-lg 
                    transition-opacity disabled:opacity-50 hover:opacity-90 text-sm sm:text-base"
                >
                  Add Todo
                </button>
              </div>
            </form>

            <div className="todo-container overflow-hidden">
              {filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onUpdate={updateTodo}
                />
              ))}

              {todos.length > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 px-4 py-3 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                  <span>{itemsLeft} items left</span>
                  <div className="flex gap-2">
                    {filters.map(filterType => (
                      <FilterButton
                        key={filterType}
                        filter={filterType}
                        currentFilter={filter}
                        onClick={setFilter}
                      />
                    ))}
                  </div>
                  <button
                    onClick={clearCompleted}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  >
                    Clear Completed
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 