import React from 'react';
import '../styles/TaskItem.css';

function TaskItem({ task, toggleComplete, editTask, deleteTask }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <h3>
        {task.title}
        {task.priority && <span> - {task.priority}</span>}
      </h3>
      <p className="task-description">{task.description}</p>
      <p className="task-due-date">Due: {task.dueDate}</p>

      <div className="task-item-buttons">
        <button className="edit-btn" onClick={() => editTask(task.id)}>
          Edit
        </button>
        <button
          className="complete-btn"
          onClick={() => toggleComplete(task.id)}
        >
          {task.completed ? 'Mark Incomplete' : 'Complete'}
        </button>
        <button className="delete-btn" onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
