import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { TodoProvider } from './context/TodoContext';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import FilterBar from './components/FilterBar';
import TodoList from './components/TodoList';
import Stats from './components/Stats';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <div className="App">
          <Header />
          <div className="container">
            <Stats />
            <TodoInput />
            <FilterBar />
            <TodoList />
          </div>
        </div>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;