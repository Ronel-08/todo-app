import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';
import { MdEdit, MdDelete, MdWork, MdPerson, MdShoppingCart, MdFitnessCenter, MdLabel, MdCalendarToday } from 'react-icons/md';
import { FaCheckCircle, FaSave, FaTimes } from 'react-icons/fa';
import './TodoItem.css';

const TodoItem = ({ todo }) => {
  const { toggleTodo, deleteTodo, editTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editCategory, setEditCategory] = useState(todo.category);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');

  const handleEdit = () => {
    if (editText.trim()) {
      editTodo(todo.id, {
        text: editText.trim(),
        priority: editPriority,
        category: editCategory,
        dueDate: editDueDate || null,
      });
      setIsEditing(false);
    }
  };

  const getPriorityColor = () => {
    switch (todo.priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getCategoryIcon = () => {
    switch (todo.category) {
      case 'work': return <MdWork />;
      case 'personal': return <MdPerson />;
      case 'shopping': return <MdShoppingCart />;
      case 'health': return <MdFitnessCenter />;
      default: return <MdLabel />;
    }
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="edit-input"
          autoFocus
        />
        <div className="edit-options">
          <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
            <option value="general">General</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
            <option value="health">Health</option>
          </select>
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
          />
        </div>
        <div className="edit-actions">
          <button onClick={handleEdit} className="save-btn">
            <FaSave /> Save
          </button>
          <button onClick={() => setIsEditing(false)} className="cancel-btn">
            <FaTimes /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="todo-left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="todo-checkbox"
        />
        <div className="todo-content">
          <div className="todo-text">{todo.text}</div>
          <div className="todo-meta">
            <span className="category-badge">
              {getCategoryIcon()} {todo.category}
            </span>
            <span 
              className="priority-badge"
              style={{ backgroundColor: getPriorityColor() }}
            >
              {todo.priority}
            </span>
            {todo.dueDate && (
              <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
                <MdCalendarToday /> {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="todo-actions">
        <button onClick={() => setIsEditing(true)} className="edit-btn" title="Edit">
          <MdEdit />
        </button>
        <button onClick={() => deleteTodo(todo.id)} className="delete-btn" title="Delete">
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;