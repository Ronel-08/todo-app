import React from 'react';
import { useTodo } from '../context/TodoContext';
import { MdDashboard } from 'react-icons/md';
import { BiTask } from 'react-icons/bi';
import { FaCheckCircle } from 'react-icons/fa';
import { TbTrendingUp } from 'react-icons/tb';
import './Stats.css';

const Stats = () => {
  const { todos } = useTodo();
  
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-icon">
          <MdDashboard />
        </div>
        <div className="stat-info">
          <div className="stat-value">{totalTasks}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">
          <BiTask />
        </div>
        <div className="stat-info">
          <div className="stat-value">{activeTasks}</div>
          <div className="stat-label">Active</div>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">
          <FaCheckCircle />
        </div>
        <div className="stat-info">
          <div className="stat-value">{completedTasks}</div>
          <div className="stat-label">Completed</div>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">
          <TbTrendingUp />
        </div>
        <div className="stat-info">
          <div className="stat-value">{completionRate}%</div>
          <div className="stat-label">Completion</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;