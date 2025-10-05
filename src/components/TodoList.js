import React from 'react';
import { useTodo } from '../context/TodoContext';
import TodoItem from './TodoItem';
import { MdPlaylistAdd } from 'react-icons/md';
import './TodoList.css';

const TodoList = () => {
  const { getFilteredTodos } = useTodo();
  const filteredTodos = getFilteredTodos();

  if (filteredTodos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <MdPlaylistAdd />
        </div>
        <h3>No tasks found</h3>
        <p>Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;