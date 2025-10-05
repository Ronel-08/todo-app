import React, { createContext, useState, useContext, useEffect } from 'react';

const TodoContext = createContext();

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    const newTodo = {
      id: Date.now(),
      text: todo.text,
      completed: false,
      priority: todo.priority || 'medium',
      category: todo.category || 'general',
      dueDate: todo.dueDate || null,
      createdAt: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const editTodo = (id, updatedTodo) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    ));
  };

  const getFilteredTodos = () => {
    return todos.filter(todo => {
      const statusMatch = filter === 'all' || 
        (filter === 'active' && !todo.completed) ||
        (filter === 'completed' && todo.completed);
      
      const searchMatch = todo.text.toLowerCase().includes(searchQuery.toLowerCase());
      const categoryMatch = categoryFilter === 'all' || todo.category === categoryFilter;
      const priorityMatch = priorityFilter === 'all' || todo.priority === priorityFilter;
      
      return statusMatch && searchMatch && categoryMatch && priorityMatch;
    });
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const value = {
    todos,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    priorityFilter,
    setPriorityFilter,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    getFilteredTodos,
    clearCompleted,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};