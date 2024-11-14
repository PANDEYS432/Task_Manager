import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    if (tasks.length) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (task) => setTasks((prevTasks) => [...prevTasks, task]);

  const editTask = (id, updatedTask) => {
    const updatedTasks = tasks.map((task) => (task.id === id ? updatedTask : task));
    setTasks(updatedTasks);
    setTaskToEdit(null);
  };

  const completeTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const today = new Date().toISOString().split('T')[0];
  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((task) => (priorityFilter === 'All' ? true : task.priority === priorityFilter))
    .filter((task) => {
      if (statusFilter === 'All') return true;
      if (statusFilter === 'Completed') return task.completed;
      return !task.completed;
    });

  const upcomingTasks = filteredTasks.filter((task) => task.dueDate >= today && !task.completed);
  const overdueTasks = filteredTasks.filter((task) => task.dueDate < today && !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} editTask={editTask} taskToEdit={taskToEdit} />

      <div className="filter-controls">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>

     
      <div className="task-categories">
        <div className="task-category">
          <h2>Upcoming Tasks</h2>
          <TaskList tasks={upcomingTasks} completeTask={completeTask} deleteTask={deleteTask} setTaskToEdit={setTaskToEdit} />
        </div>
        
        <div className="task-category">
          <h2>Overdue Tasks</h2>
          <TaskList tasks={overdueTasks} completeTask={completeTask} deleteTask={deleteTask} setTaskToEdit={setTaskToEdit} />
        </div>
        
        <div className="task-category">
          <h2>Completed Tasks</h2>
          <TaskList tasks={completedTasks} completeTask={completeTask} deleteTask={deleteTask} setTaskToEdit={setTaskToEdit} />
        </div>
      </div>
    </div>
  );
}

export default App;
