import React from 'react';
import '../styles/TaskList.css';
function TaskList({ tasks, completeTask, deleteTask, setTaskToEdit }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p> 
          <p>Due Date: {task.dueDate}</p>
          <p>Priority: {task.priority}</p>
          
          <button onClick={() => completeTask(task.id)}>
            {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
          <button onClick={() => setTaskToEdit(task)}>Edit</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
